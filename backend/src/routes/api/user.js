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
     deleteAllUser
 } from '../../pokemon-data/user-dao';
 import axios from 'axios';
 import { User } from '../../pokemon-data/userschema';
 
 
 const bcrypt = require("bcryptjs");
 const jwt = require("jsonwebtoken");
 require('dotenv').config();
 
 
 
 // const bodyParser = require('body')
 const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
 const HTTP_CREATED = 201;
 const HTTP_NOT_FOUND = 404;
 const HTTP_NO_CONTENT = 204;
 
 
 const router = express.Router();
 
 // async function fetchFromPokemonAPI() {
 //     const randomPokemonNum = Math.floor(Math.random() * 898) + 1;
 //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNum}`);
 //     const data = response.data;
 //     return {
 //         name: data.species.name.toUpperCase().substring(0, 1) + data.species.name.substring(1),
 //         imageUrl: data.sprites.front_default,
 //     };
 // }
 
 // Create new random pokemon
 router.post('/register', async (req, res) => {
     const {username, name,email, password, confirmPassword} = req.body;
 
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
         password : passwordHash};
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
 
 // Delete all user
 router.delete('/', async (req, res) => {
     await deleteAllUser();
     res.sendStatus(HTTP_NO_CONTENT);
 });
 
 export default router;

