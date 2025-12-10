import mongoose from "mongoose"; // mongoose ODM  
// to create mongoose schema
const blogSchema = new mongoose.Schema({
    // properties for Blog schema
    title: {type: String, required: true},
    subTitle: {type: String},
    description: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    isPublished: {type: Boolean, required: true},
}, {timestamps: true}); // timestamps added so that it'll automatically add time data in blog

// now lets create model
const Blog = mongoose.model('blog', blogSchema);

export default Blog; // created blog model
// we can store data in the data base using blog model