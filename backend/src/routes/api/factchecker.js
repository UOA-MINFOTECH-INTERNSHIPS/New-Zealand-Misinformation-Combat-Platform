import express from 'express';
import {
    createFactChecker,
    retrieveCheckerList,
    retrieveChecker,
    updateChecker,
    deleteChecker,
    deleteAllChecker
} from '../../pokemon-data/factchecker-dao';
import { FactChecker } from '../../pokemon-data/factcheckerschema';

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const HTTP_OK = 200; 
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const router = express.Router();

router.post('/register', async (req, res) => {
    const {username, name,email, password, confirmPassword, category} = req.body;

    if (!username || !name || !email || !password || !confirmPassword || !category)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of at least 6 characters.",
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice.",
      });

    const existingFactChecker = await FactChecker.findOne({ username });
    if (existingFactChecker)
      return res.status(400).json({

        errorMessage: "An account with this email already exists.",
      });
    

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);



    const newFactChecker = {
        username: username,
        name : name,
        email : email,
        password : passwordHash,
        category : category,
        arrayOfID : []
    };
    
    const dbFactChecker = await createFactChecker(newFactChecker);

    const token = jwt.sign(
        {
          factchecker: dbFactChecker._id,
        },
        process.env.JWT_SECRET
      );
      console.log(token)

    

    res.status(HTTP_CREATED)         
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(dbFactChecker)
        .send();
});


// login
router.post('/login', async (req, res) => {
    try{
        const {username, password}=req.body;

        if (!username||!password) return res.status(400).json({errorMessage: "Please enter all required fields."});
        
        const existingFactChecker = await FactChecker.findOne({ username });
        if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong username." });

        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.password
          );

        if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong password." });
        
        // sign the token
        const token = jwt.sign(
            {
              user: existingFactChecker._id,
            },
            process.env.JWT_SECRET
        );

        //send token in cookie
        res
            .cookie("token", token, {
                httpOnly: true
        })
        // .json(existingUser)
        .send();

    }catch(err){
        
        console.error(err);
        res.status(500).send();
        
    }
});


//log out
router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
});

router.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);
    } catch (err) {
      res.json(false);
    }
});


export default router;