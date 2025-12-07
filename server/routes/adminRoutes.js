import express from 'express'
import adminLogin from '../controllers/adminController.js';

const adminRouter = express.Router();


// adminLogin Controller (path, callback)
adminRouter.post("/login", adminLogin);

export default adminRouter;