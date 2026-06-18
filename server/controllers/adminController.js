// function that'll allow user to login for our application.
// create login API
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comments.js';

// Register new admin user
const adminRegister = async(req, res) =>{
    try{
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.json({success: false, message: 'All fields required'});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.json({success: false, message: 'Email already registered'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();

        res.json({success: true, message: 'Registration successful. Please login.'});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

// Login admin user from database
const adminLogin = async(req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({success: false, message: 'Email and password required'});
        }

        const user = await User.findOne({email});
        
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.json({success: false, message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.json({success: true, token, user: {id: user._id, name: user.name, email: user.email}});
    }
    catch(error){
       res.json({success: false, message: error.message});
    }
}

// get blogs admin
// A controller function using which user can see all blog posts
export const getAllBlogsAdmin = async(req, res) =>{
    try{
        const blogs = await Blog.find({}).populate('author', 'name email').sort({createdAt: -1}); //sort in descending order.
        res.json({success:true, blogs}); 
    } 
    catch(error){
        res.json({success:false, message: error.message});
    }
}

// A controller function so see all comments(approved or not approved)
export const getAllComments = async(req, res) =>{
    try{
        const comments = await Comment.find({}).populate('blog').sort({createdAt: -1});
        res.json({success:true, comments});
    }       
    catch(error){
        res.json({success:false, message: error.message});
    }
}

// blog data components & drafts
export const getDashBoard = async(req, res)=>{
    try{
        // find recent blogs
        const recentBlogs = await Blog.find({}).populate('author', 'name email').sort({createdAt: -1}).limit(5);
        // get 5 recent blogs // in decreasing order of there timestamps
        const blogs = await Blog.countDocuments(); // counts total number of blogs
        // count only approved comments for dashboard display
        const comments = await Comment.countDocuments({ isApproved: true });
        const drafts = await Blog.countDocuments({isPublished: false}); 


        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }

        res.json({success: true, dashboardData}); // as response show dashboard data
    }
    catch(error){
        res.json({success:false, message: error.message});        
    }
}


// Admin can delete/approve comment.

export const deleteCommentById = async (req, res)=>{
    try{
        const {id} = req.body; // access comment id from req body
        await Comment.findByIdAndDelete(id);
        // delete all comments associated with blog
        // await Comment.deleteMany({blog: id});

        res.json({success:true, message: "Comment Deleted Successfully"});
    }   
    catch(error){
        res.json({success:false, message: error.message});
    }
}

// Approved / not approve logic

export const ApproveCommentById = async (req, res)=>{
    try {
        const {id} = req.body; // fetch id from request body
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message: "Comment Approved Successfully."});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}
export { adminLogin, adminRegister };
export default adminLogin;
