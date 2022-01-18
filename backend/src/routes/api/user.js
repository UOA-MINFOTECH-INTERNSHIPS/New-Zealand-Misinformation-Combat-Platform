/**
 * This is a simple RESTful API for dealing with pokemon.
 */

import express from 'express';
import {
    createUser,
    retrieveUserList,
    retrieveUser,
    updateUser,
    deleteUser,
    deleteAllUser,
    upgradeUser
} from '../../pokemon-data/user-dao';
import axios from 'axios';
import { User } from '../../pokemon-data/userschema';
import { Article } from '../../pokemon-data/articleschema';
import { retrieveArticle } from '../../pokemon-data/article-dao';


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();



// const bodyParser = require('body')
const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();



// register new user
/**
 * @swagger
 * definitions:
 *   Register:
 *     required:
 *       - username
 *       - name
 *       - email
 *       - password
 *       - confirmPassword
 *     properties:
 *       username:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       confirmPassword:
 *         type: string
 */


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management system
 */


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     description: register a new user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: give new user a username, must be unique
 *         in: formData
 *         required: true
 *         type: string
 *       - name: name
 *         description: give new user a name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: input the email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: confirmPassword
 *         description: confirm the password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: register
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Register'
 */
router.post('/register', async (req, res) => {
    const {username, name,email, password, confirmPassword, userType, category} = req.body;

    if (!username || !name || !email || !password || !confirmPassword)
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

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    
    
      
    const newUser = {
      username: username,
      name : name,
      email : email,
      password : passwordHash,
      arrayOfUserMission:[],
      arrayOfVoted:[],
      arrayOfLiked:[],
      userType:'normal',
      category:null,
      arrayOfChecked:[]
    };


    if(userType=="fact checker"){
      newUser.userType="fact checker";
      newUser.category=category;
    }

    



    
    // const pokemon = {
    //     name: 'Ditto',
    //     imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
    // }
    //const pokemon = await fetchFromPokemonAPI();
    const dbUser = await createUser(newUser);

    const token = jwt.sign(
        {
          user: dbUser._id,
        },
        process.env.JWT_SECRET
      );
      console.log(token)

    

    res.status(HTTP_CREATED) 
        // .header('Location', `/api/user/${dbUser._id}`)
        
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(dbUser)
        .send();
    

});

// login
/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */



/**
 * @swagger
 * /api/user/login:
 *   post:
 *     description: Login to the application
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: the username of user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Login'
 */
router.post('/login', async (req, res) => {
    try{
        const {username, password}=req.body;

        if (!username||!password) return res.status(400).json({errorMessage: "Please enter all required fields."});
        
        const existingUser = await User.findOne({ username });
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
              user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        //send token in cookie
        res
            .cookie("token", token, {
                httpOnly: true
        })
        .json(existingUser)
        .send();

    }catch(err){
        
        console.error(err);
        res.status(500).send();
        
    }
});

//log out
/**
   * @swagger
   * /api/user/logout:
   *   get:
   *     description: logout user
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: logout
   */
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


/**
   * @swagger
   * /api/user/loggedIn:
   *   get:
   *     description: check if logged in
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: true if logged in
   */
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

// Delete all user
router.delete('/', async (req, res) => {
    await deleteAllUser();
    res.sendStatus(HTTP_NO_CONTENT);
});


/**
 * @swagger
 * definitions:
 *   Upgrade:
 *     required:
 *       - id
 *       - category
 *     properties:
 *       id:
 *         type: string
 *       category:
 *         type: string
 */



/**
 * @swagger
 * /api/user/upgrade:
 *   post:
 *     description: upgrade normal user to fact checker
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the exsiting user's id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: the fact checker's category
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: upgrade
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Upgrade'
 */
//upgrade user to fact checker
router.post('/upgrade',async (req, res) => {
    const {id,category}=req.body;
    const newFactCheker = await upgradeUser(id,category);
    res.json(newFactCheker);
});

//add posted article to user 
/**
 * @swagger
 * definitions:
 *   postedArticleAdder:
 *     required:
 *       - username
 *       - id
 *     properties:
 *       username:
 *         type: string
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/user/addToPostList:
 *   post:
 *     description: add a article id to user's myarticles
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: give a username to find the user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: id
 *         description: give a article id to link the article to user
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: article added
 *         schema:
 *           type: object
 *           $ref: '#/definitions/postedArticleAdder'
 */
router.post('/addToPostList',async (req, res) =>{
  const {username,id}=req.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser)
      return res.status(400).json({
        errorMessage: "An account with this username does not exists.",
      });
  const existingArticle = await retrieveArticle(id);
  if (!existingArticle)
      return res.status(400).json({
        errorMessage: "Does not exsit this article id",
      });
  await existingUser.arrayOfPosted.push(id);
  await existingUser.save();
  res.json(existingUser);
});

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     description: retrieve all users in db
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: all users got
 */
 router.get('/all', async (req, res) => {
  try{
      res.json(await retrieveUserList());
  }catch(err){
      console.error(err);
      res.status(500).send();
  }
});

export default router;


