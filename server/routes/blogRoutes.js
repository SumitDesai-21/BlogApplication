import express from 'express'

import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
import addBlog from '../controllers/blogController.js';

// create express router
const blogRouter = express.Router();
blogRouter.post("/add", upload.single('image'), auth, addBlog);

// add middleware
// to parse the image we'll use the multer package.
export default blogRouter;
