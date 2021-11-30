/**
 * This is a simple RESTful API for dealing with pokemon.
 */

import express from 'express';
import {
    createPokemon,
    retrievePokemonList,
    deleteAllPokemon
} from '../../pokemon-data/pokemon-dao';
import axios from 'axios';



const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();

async function fetchFromPokemonAPI() {
    const randomPokemonNum = Math.floor(Math.random() * 898) + 1;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNum}`);
    const data = response.data;
    return {
        name: data.species.name.toUpperCase().substring(0, 1) + data.species.name.substring(1),
        imageUrl: data.sprites.front_default,
    };
}

// Create new random pokemon
router.post('/newCatch', async (req, res) => {
    
   
    // const pokemon = {
    //     name: 'Ditto',
    //     imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
    // }
    const pokemon = await fetchFromPokemonAPI();

    const dbPokemon = await createPokemon(pokemon);

    res.status(HTTP_CREATED) 
        .header('Location', `/api/pokemon/${dbPokemon._id}`)
        .json(dbPokemon);
    
        

});

// Retrieve all pokemon
router.get('/', async (req, res) => {
    res.json(await retrievePokemonList());
});

// Delete all pokemon
router.delete('/', async (req, res) => {
    await deleteAllPokemon();
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;

