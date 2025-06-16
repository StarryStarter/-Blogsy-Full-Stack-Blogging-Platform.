import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

const router = express.Router();

// POST /api/user/signup
export const userSignup= async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Create token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ success: true, message: 'User created', token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const userLogin= async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        // ✅ Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
      }
};


export const getAllBlogsUser = async (req, res) => {
    try {
        
        const userId = req.user._id;
        const blogs = await Blog.find({$or: [{ createdBy: userId },{ createdBy: userId.toString() }]}).sort({ createdAt: -1 });        
        
        

        res.json({ success: true, blogs });
    } catch (error) {
        
        res.status(500).json({ success: false, message: error.message });
      }
  };


export const getUserDashboard = async (req, res) => {
    try {
        const userId = req.user._id; // 🔥 correct key
        

        const blogs = await Blog.find({ $or: [{ createdBy: userId }, { createdBy: userId.toString() }] }).sort({ createdAt: -1 });

        const comments = await Comment.find({
            blog: { $in: blogs.map(b => b._id) },
            isApproved: true
        });
        

        const dashboardData = {
            blogs: blogs.length,
            drafts: blogs.filter(b => !b.isPublished).length,
            comments: comments.length,
            recentBlogs: blogs.slice(-5).reverse()
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};



export const getAllCommentsUser = async (req, res) => {
    try {
        const userId = req.user._id;

        // Step 1: Get blog IDs created by the user
        // const userBlogs = await Blog.find({ createdBy: userId }, '_id');


        const userBlogs = await Blog.find({ $or: [{ createdBy: userId }, { createdBy: userId.toString() }] }).sort({ createdAt: -1 });



        const blogIds = userBlogs.map(blog => blog._id);
        
        
    
        const comments = await Comment.find({ blog: blogIds }).populate("blog").sort({ createdAt: -1 })

            
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
  
  



export default router;
