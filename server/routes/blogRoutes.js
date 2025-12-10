import express from 'express'

import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import addBlog, { deleteBlogByID, getAllBlogs, getBlogByID, togglePublish } from '../controllers/blogController.js';

// create express router
const blogRouter = express.Router();
// API endpoints
blogRouter.post("/add", upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogs); // get all blogs 
blogRouter.get('/:blogId', getBlogByID);    
blogRouter.post('/delete',auth, deleteBlogByID);    
blogRouter.post('/toggle-publish',auth, togglePublish);


// add middleware
// to parse the image we'll use the multer package.
export default blogRouter;
