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
import { info } from '../../Logger/logger';

const logger = require('../../Logger/logger');



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
    const {username, name,email, password} = req.body;
    logger.log('info',username);
    const newUser = new User({
        username: username,
        name : name,
        email : email,
        password : password});
    // const pokemon = {
    //     name: 'Ditto',
    //     imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
    // }
    //const pokemon = await fetchFromPokemonAPI();
    const dbUser = await createUser(newUser);

    res.status(HTTP_CREATED) 
        .header('Location', `/api/user/${dbUser._id}`)
        .json(dbUser);
    
    
        

});

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

