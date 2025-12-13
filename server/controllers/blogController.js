import fs from 'fs';
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comments.js';
// upload blog images on imageKit.

const addBlog = async (req, res) =>{
    try{
        // destructure request body
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        // to get blog thumbnail image
        const imageFile = req.file;

        // check if all required fields are present 
        if(!title || !description || !category || !isPublished){
            return res.json({success:false, message: "Missing Required Fields"});
        }

        if(!imageFile){
            return res.json({success:false, message: "Image file is required"});
        }

        // to store image on cloudestorage we'll use imageKit 
        // imageKit => Image & video API
        // to upload image first convert it into base-64 image
        const fileBuffer = fs.readFileSync(imageFile.path);
        const base64File = fileBuffer.toString('base64');
        
        const response = await imagekit.files.upload({
            file: base64File,
            fileName: imageFile.originalname,
            folder: "/blog" // all blog images would be uploaded to blogs folder.
        })

        // optimization through imageKit URL Transformation.
        // Construct the optimized URL manually
        const transformationString = "tr=q-auto,f-webp,w-1280";
        const optimizedImageURL = `${process.env.IMAGEKIT_URL_ENDPOINT}/${response.filePath}?${transformationString}`;

        const image = optimizedImageURL; // image url
        // we've all the data (blog data: title, subtitle, description, image etc)
        // now we'll store this data into MONGODB

        // image will be uploaded in .webp format a modern file type to support all browsers.

        await Blog.create({title, subTitle, description, category, isPublished, image}); // await ur blog model
        res.json({success: true, message: "Blog Added Successfully"});
    }   
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const getAllBlogs = async(req, res) =>{
    try{
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const getBlogByID = async (req, res)=>{
    try{
        // get the blog id from parameter
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        
        if(!blogId){
            return res.json({success:false, message: "Blog Not Found"});
        }
        res.json({success: true, blog});
    }   
    catch(error){
        res.json({success: false, message: error.message});
    }
}

// controller function to delete any blog
export const deleteBlogByID = async (req, res)=>{
    try{
        // get the blog id from parameter
        const { id } = req.body();
        await Blog.findByIdAndDelete(id);
        res.json({success: true, message: "Blog Deleted Successfully"});
    }   
    catch(error){
        res.json({success: false, message: error.message});
    }
}

// controller to publish or unpublish.
export const togglePublish = async(req, res)=>{
    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished; // true to false & vice versa
        await blog.save();
        res.json({success: true, message: "Blog status updated."});
    }
    catch(error){
        res.json({success: false, message: error.message});
    }
}

export const addComment = async (req, res) =>{
    try{
        const {blog, name, content} = req.body;
        await Comment.create({blog, name, content});

        res.json({success:true, message: "Comment Added For Review."});
    }
    catch(error){
        res.json({success:false, message: error.message});
    }
}
// API for blog comments.
export const getBlogComments = async (req, res) =>{
    try{
        // access blog ID from request body.
        const { blogId } = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});

        res.json({success:true, comments});
    }
    catch(error){
        res.json({success:false, message: error.message});
    }
}

export default addBlog;
