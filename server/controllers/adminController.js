// function that'll allow user to login for our application.
// create login API
import jwt from 'jsonwebtoken'

const adminLogin = async(req, res) =>{
    try{
        // from request body we'll get email & password.
        // if email id & password matches then we'll allow user to login.
        // also provide authentication token


        // destructure request body
        const {email, password} = req.body;

        if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: 'Invalid credentials'});
        }

        // else if matched generate JWT token
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({success: true, token});
    }
    catch(error){
       res.json({success: false, message: error.message});
    }
}

export default adminLogin;