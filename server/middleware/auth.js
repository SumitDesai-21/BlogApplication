// authentication middleware
import jwt from "jsonwebtoken";

const auth = (req, res, next) =>{
    // Extract token from Authorization header
    const token = req.headers.authorization;

    try{
        if(!token){
            return res.json({success:false, message: "No token provided"});
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user info to request for use in controllers
        req.user = decoded;
        // if successfully verified execute next function
        next(); // continue to controller.
    }
    catch(error){
        res.json({success:false, message: "Invalid token"});
    }
}

export default auth;
