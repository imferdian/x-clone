import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
    try{
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: 'User tidak ditemukan'});

        if(!text && !img){
            return res.status(404).json({error: 'Kalau mau ngepost setidaknya ada text atau gambarlah, oyy!!'});
        }

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img,
        })

        await newPost.save();
        res.status(201).json(newPost);

    }catch (err) {
        console.log('Error in createPost controller: ', err);
        res.status(500).json({error: err.message })
    }
}

export const deletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ error: 'Post tidak ditemukan'});
        }

        if(post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({error: 'Kamu tidak memiliki wewenang untuk menghapus post ini!!'});
        }

        if(post.img){
            const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Yeay, berhasil menghapus post'})

    }catch (err) {
        console.log('Error in deletePost controller: ', err);
        res.status(500).json({error: err.message })
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            return res.status(400).json( { error: 'Text komennya mana??' } );
        }

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({error: 'Post tidak ditemukan'});
        }

        const comment = {
            user: userId,
            text,
        }

        post.comments.push(comment);
        await post.save();

        res.status(200).json(post)
    }catch (err) {
        console.log('Error in commentOnPost controller: ', err);
        res.status(500).json({error: err.message })
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const {id:postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error: 'Post tidak ditemukan'});
        }

        const userLikedPost = post.likes.includes(userId);
        if(userLikedPost){
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}})
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } })
            res.status(200).json({message: 'Berhasil tidak menyukai post'});
        }else{
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } })
            await post.save();

            const notification = new Notification({
                type: 'like',
                from: userId,
                to: post.user
            })
            await notification.save();

            res.status(200).json({message: 'Berhasil menyukai post'});

        }

    }catch (err) {
        console.log('Error in likeUnlikePost controller: ', err);
        res.status(500).json({error: err.message })
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: 'user',
            select: '-password -email'
        }).populate({
            path: 'comments.user',
            select: '-password -email'
        })

        if(posts.length === 0){
            return res.status(200).json([])
        }

        res.status(200).json(posts);

    }catch(err){
        console.log('Error in getAllPosts controller: ', err);
        res.status(500).json({error: err.message});
    }
}

export const getLikedPosts = async (req, res) => {
    const { id:userId } = req.params;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: 'User tidak ditemukan, nih'});

        const likedPosts = await Post.find({_id: {$in: user.likedPosts}}).sort({createdAt: -1})
            .populate({
                path: 'user',
                select: '-password -email'
            })
            .populate({
                path: 'comments.user',
                select: '-password -email'
            })

            res.status(200).json(likedPosts);

    }catch (err) {
        console.log('Error in getLikedPosts controller: ', err);
        res.status(500).json({error: err.message});
    }
}

export const getFollowingPosts = async (req, res) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: 'User tidak ditemukan, nih'});

        const following = user.following;

        const feedPosts = await Post.find({user: {$in: following}}).sort({createdAt: -1})
            .populate({
                path: 'user',
                select: '-password -email',
            }).populate({
                path: 'comments.user',
                select: '-password -email'
            })

            res.status(200).json(feedPosts);

    }catch (err) {
        console.log('Error in getLikedPosts controller: ', err);
        res.status(500).json({error: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const { username } = req.params;
        const user = await User.findOne({ username });
        if(!user) return res.status(404).json({error: 'User tidak ditemukan, nih'});

        const userPosts = await Post.find({user: user._id}).sort({createdAt: -1})
            .populate({
                path: 'user',
                select: '-password -email',
            }).populate({
                path: 'comments.user',
                select: '-password -email'
            })

            res.status(200).json(userPosts);

    }catch (err) {
        console.log('Error in getLikedPosts controller: ', err);
        res.status(500).json({error: err.message});
    }
}