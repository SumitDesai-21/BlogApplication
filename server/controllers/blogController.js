import fs from 'fs';
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
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

        // optimization through imageKit URL Transformation.
        const optimizedImageURL = imagekit.url({
            path: response.filePath,

            // transformation to reduce size & format that every web browser could support. 
            transformation: [
                {quality: 'auto'}, // Auto compression
                {format: 'webp'}, // convert to modern format
                {width: '1280'} // width resize
            ]
        });

        const image = optimizedImageURL; // image url
        // we've all the data (blog data: title, subtitle, description, image etc)
        // now we'll store this data into MONGODB

        await Blog.create({title, subTitle, description, category, image, isPublished}); // await ur blog model
        res.json({success: true, message: "Blog Added Successfully"});
    }   
    catch(error){
        res.json({success: false, message: error.message});
    }
}