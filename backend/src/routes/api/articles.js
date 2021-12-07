import express from 'express';
import {
    createArticle,
    retrieveArticle20,
    retrieveArticle,
    updateArticle,
    deleteArticle,
    deleteAllArticle
} from '../../pokemon-data/article-dao';
import axios from 'axios';



const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();

// API needed here,maybe 20 each time
// async function fetchFromPokemonAPI() {
//     const randomPokemonNum = Math.floor(Math.random() * 898) + 1;
//     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNum}`);
//     const data = response.data;
//     return {
//         name: data.species.name.toUpperCase().substring(0, 1) + data.species.name.substring(1),
//         imageUrl: data.sprites.front_default,
//     };
// }

// save like article from api
router.post('/likearticle', async (req, res) => {
    
    // const pokemon = {
    //     name: 'Ditto',
    //     imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
    // }
    //const article = await fetchFromPokemonAPI();
    //const dbArticle = await createArticle(article);

    res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);
    
        

});

//create user post article
router.post('/newarticle', async (req, res) => {
    const dbArticle = await createArticle();

    res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);
})

// Retrieve all articles saved
router.get('/', async (req, res) => {
    res.json(await retrieveArticleList());
});

// Delete all articles
router.delete('/', async (req, res) => {
    await deleteAllArticle();
    res.sendStatus(HTTP_NO_CONTENT);
});

// Delete one article
router.delete('/', async (req, res) => {
    await deleteArticle();
    res.sendStatus(HTTP_NO_CONTENT);
});

// Update one article
router.post('/update', async (req, res) => {
    await deleteArticle();
    const dbArticle = await updateArticle();
    res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);
});

export default router;

