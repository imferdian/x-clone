import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateTokenAndCookie} from "../lib/utils/generateTokenAndCookie.js";

export const register = async (req, res) => {
    try {
        const {fullName, username, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({error: 'Invalid email address'});
        }

        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(400).json({error: 'Email already exists'});
        }

        if(password.length < 6){
            return res.status(400).json({error: 'Password must be at least 6 characters'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashPassword,
        })

        if(newUser) {
            await newUser.save();
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }else {
            res.status(400).json({
                error: 'Invalid user data',
            })
        }

    }catch(err) {
        console.log('Error in register controller', err.message)
        res.status(500).send({
            success: false,
            error: 'internal server error',
            message: err.message,
        })
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username})
        const isPasswordValid = await bcrypt.compare(password, user?.password || '');

        if(!user || !isPasswordValid) {
            return res.status(400).json({
                success: false,
                error: 'Invalid username or password'
            });
        }

        generateTokenAndCookie(user._id, res);

        res.status(200).json({
            success: true,
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })

    }catch(err){
        console.log('Error in register controller', err.message)
        res.status(500).send({
            success: false,
            error: 'internal server error',
            message: err.message,
        })
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        })
    }catch(err){
        console.log('Error in logout controller', err.message)
        res.status(500).send({
            success: false,
            error: 'Internal server error',
            message: err.message,
        })
    }
}

export const getMe = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user)
    }catch(err){
        console.log('Error in getMe controller', err.message)
        res.status(500).send({
            success: false,
            error: 'Internal server error',
            message: err.message,
        })
    }

}