
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
  
  module.exports = auth;

