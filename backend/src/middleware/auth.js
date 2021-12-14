//this file is mainly use to ensure a user authorization to perform a task
/* the basic flow is
user click like button => auth middleware(next) if auth allows user to preceed
then user can call the like function*/
import jwt from 'jsonwebtoken';
require('dotenv').config()

export default function auth (req, res, next) {
    try{
        const token = req.cookies.token;
        //console.log(req.cookies.token);

        if (!token) return res.status(401).json({errorMessage: "Unauthorized"});
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;

        next();
        
    }catch (error) {
        console.log(error);
        res.status(401).json({errorMessage: "Unauthorized"});
    }
}

