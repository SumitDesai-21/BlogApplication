// function that'll allow user to login for our application.
// create login API
import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comments.js';

const adminLogin = async(req, res) =>{
    try{
        // from request body we'll get email & password.
        // if email id & password matches then we'll allow user to login.
        // also provide authentication token


        // destructure request body
        const {email, password} = req.body;

        if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: 'Invalid credentials'});
        }

        // else if matched generate JWT token
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({success: true, token});
    }
    catch(error){
       res.json({success: false, message: error.message});
    }
}

// get blogs admin
// A controller function using which user can see all blog posts
export const getAllBlogsAdmin = async(req, res) =>{
    try{
        const blogs = await Blog.find({}).sort({createdAt: -1}); //sort in descending order.
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
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5); 
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
        await Comment.deleteMany({blog: id});

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
export default adminLogin;