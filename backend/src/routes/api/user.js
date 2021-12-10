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


// const bodyParser = require('body')
const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();

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
        errorMessage: "An account with this username already exists.",
      });
    
    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
        username: username,
        name : name,
        email : email,
        password : passwordHash};

    const dbUser = await createUser(newUser);

    const token = jwt.sign(
      {
        user: dbUser._id,
      },
      process.env.JWT_SECRET
    );

  // send the token in a HTTP-only cookie
  res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    }).send();
  
  console.log(token);

    res.status(HTTP_CREATED) 
        .header('Location', `/api/user/${dbUser._id}`)
        .json(dbUser);
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // validate
    console.log(username);
    console.log(password);

    if (!username || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/logout', (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).send();
})

// Retrieve all user
router.get('/', async (req, res) => {
    res.json(await retrieveUserList());
});

// Delete all user
router.delete('/', async (req, res) => {
    await deleteAllUser();
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;

