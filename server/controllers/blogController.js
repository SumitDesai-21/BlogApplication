import fs from 'fs';
import imagekit from '../config/imageKit.js';
// upload blog images on imageKit.

export const addBlog = async (req, res) =>{
    try{
        // destructure request body
        const {title, subTitle, description, category, isPublised} = JSON.parse(req.body.blog);
        // to get blog thumbnail image
        const imageFile = req.file;

        // check if all required fields are present 
        if(!title || !description || !category || !isPublised){
            return res.json({sucess:false, message: "Missing Required Fields"});
        }

        // to store image on cloudestorage we'll use imageKit 
        // imageKit => Image & video API
        // to upload image first convert it into base-64 image
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blog" // all blog images would be uploaded to blogs folder.
        })
    }   
    catch(error){

    }
}