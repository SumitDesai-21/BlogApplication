// authentication middleware
import jwt from "jsonwebtoken";

const auth = (req, res, next) =>{
    // next will excecute our next function.
    const token = req.headers.authorization;

    try{
        if(!token){
            return res.json({success:false, message: "No token provided"});
        }
        jwt.verify(token, process.env.JWT_SECRET);
        // if successfully verified excecute next function
        next();
    }
    catch(error){
        res.json({success:false, message: "Invalid token"});
    }
    
}
export default auth;
