import fs from 'fs';
import imagekit from '../config/imageKit.js';
import Blog from '../models/Blog.js';
// upload blog images on imageKit.

const addBlog = async (req, res) =>{
    try{
        // destructure request body
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
        // to get blog thumbnail image
        const imageFile = req.file;

        // check if all required fields are present 
        if(!title || !description || !category || !isPublished){
            return res.json({sucess:false, message: "Missing Required Fields"});
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

        await Blog.create({title, subTitle, description, category, isPublished, image}); // await ur blog model
        res.json({success: true, message: "Blog Added Successfully"});
    }   
    catch(error){
        res.json({success: false, message: error.message});
    }
}
export default addBlog;