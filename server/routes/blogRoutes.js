import express from 'express'
import { addBlog } from '../controllers/blogController';
import upload from '../middleware/multer';
import auth from '../middleware/auth';

// create express router
const blogRouter = express.Router();
blogRouter.post("/add", upload.single('image'), auth, addBlog);

// add middleware
// to parse the image we'll use the multer package.
export default blogRouter;
