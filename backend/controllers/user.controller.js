// Model Database
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";


import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";


export const getUserProfile = async (req, res) => {
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select('-password');
        if(!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const postCount = await Post.countDocuments({ user: user._id });

        res.status(200).json({user, postCount});

    }catch (err) {
        console.log('Error in getUserProfile: ', err.message)
        res.status(500).json({error: err.message});
    }

}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "Kamu tidak bisa lah meng-follow diri kamu sendiri!" });
        }

        if(!userToModify || !currentUser) {
            return res.status(404).json({error: 'User tidak ditemukan, nih'});
        }

        const isFollowing = currentUser.following.includes(id);

        if(isFollowing){
            // Unfollow user
            await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}})
            res.status(200).json({ message: 'Berhasil meng-unfollow (parahh)' });
        }else{
            // Follow user
            await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}})
            await User.findByIdAndUpdate(req.user._id, {$push: {following: id}})
            // Send notification to the user
            const newNotification = new Notification({
                type: 'follow',
                from: req.user._id,
                to: userToModify._id,
            })

            await newNotification.save();

            res.status(200).json({ message: 'Berhasil meng-follow' });
        }

    }catch (err) {
        console.log('Error in followUnFollowUser: ', err.message)
        res.status(500).json({error: err.message});
    }
}


export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const usersFollowedByMe = await User.findById(userId).select('following');

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                },
            },
            {
                $sample: {
                    size: 10
                }
            },
        ])

        const filteredUsers = users.filter((user) => !usersFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0, 4);

        suggestedUsers.forEach(user => {user.password = undefined});

        res.status(200).json(suggestedUsers);

    } catch (err) {
        console.log('Error in getSuggestedUsers: ', err.message)
        res.status(500).json({error: err.message});
    }
}


export const updateUser = async (req, res) => {
    const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;
    
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: 'User tidak ditemukan, nih'});

        if(email){
            const isEmailTaken = await User.findOne({
                email,
                _id: {$ne: userId},
            }); 
            if(isEmailTaken) return res.status(400).json({error: 'Email sudah dipakai, heyy!!'});

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) return res.status(400).json({error: 'Alamat email kamu yang benar dong!!'});
        }

        if(username){
            const isUsernameTaken = await User.findOne({
                username,
                _id: {$ne: userId},
            });
            if(isUsernameTaken) return res.status(400).json({error: 'Username itu udah dipakai'});
        }

        if((!currentPassword && newPassword) || (!newPassword && currentPassword)) {
            return res.status(400).json({error: 'Isilah password lama dan password barunya, heyy!!'});

        }

        if(currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch) return res.status(400).json({ error: 'Password lama kamu salah, nih. HMMM!!'})
            if(newPassword.length < 6) {
                return res.status(400).json({error: 'Password kamu minimal harus 6 karakter ya!!'});
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if(profileImg && profileImg !== user.profileImg) {
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadedResponse.secure_url;
        }

        if(coverImg && coverImg !== user.coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(coverImg);
            coverImg = uploadedResponse.secure_url
        }

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        await user.save();
        user.password = undefined
        res.status(200).json({user});

    } catch (err) {
        console.log('Error in updateUser: ', err.message)
        res.status(500).json({error: err.message});
    }
}
