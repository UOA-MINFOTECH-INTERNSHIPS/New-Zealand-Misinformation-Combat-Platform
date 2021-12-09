import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from './pokemon-data/userschema';

export const signin = async (req, res) => {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});

        if(!existingUser) return res.status(404).json({message: "user does not exist"});
        
        //use to compare password with the hashed password bcrypt need to be used
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid password"});
        
        //'test' is the secret key that we use for token generally store in .env file
        const token = jwt.sign({username: existingUser.username, id: existingUser._id}, 'test', {expiresIn:'1h'});
        
        res.status(200).json ({result: existingUser, token});
    }catch (error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

export const signup = async (req, res) => {
    const {username, name, email, password, confirmPassword} = req.body;
    try{
        const existingUser = await User.findOne({username});

        if(existingUser) return res.status(400).json({message: "user already exist"});
        
        if (password !== confirmPassword) return res.status(400).json({message: "Password does not match"});
        //need to hash the password before store in the database
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({username, name, email, password: hashedPassword});
        const token = jwt.sign({username: result.username, id: result._id}, 'test', {expiresIn:"1h"});
        res.status(200).json ({result, token});
    }catch (error){
        res.status(500).json({message: 'Something went wrong'});
    }
}