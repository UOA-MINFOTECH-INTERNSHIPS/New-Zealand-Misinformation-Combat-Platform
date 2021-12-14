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
import { Article } from '../../pokemon-data/articleschema';



const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();
const auth = require("../../middleware/auth");

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
// router.post('/likeArticle', async (req, res) => {
    
//     // const pokemon = {
//     //     name: 'Ditto',
//     //     imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
//     // }
//     //const article = await fetchFromPokemonAPI();
//     //const dbArticle = await createArticle(article);

//     res.status(HTTP_CREATED) 
//         .header('Location', `/api/articles/${dbArticle._id}`)
//         .json(dbArticle);
    
        

// });

//create user post article
router.post('/post', async (req, res) => {
    try {
        const {author, title,description, url, urlToImage,content} = req.body;
    
        const newArticle = {
            author : author, 
            title : title,
            description  :description, 
            url : url, 
            urlToImage : urlToImage,
            publishAt : Date.now(),
            content : content
        };
    
        const dbArticle = await createArticle(newArticle);
    
        res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);

      } catch (err) {
        console.error(err);
        res.status(500).send();
      }


    
})

// Retrieve all articles saved
router.get('/', async (req, res) => {
    res.json(await retrieveArticle20());
});


// Delete one article
router.delete('/', auth, async (req, res) => {
    const {id} = req.body;
    await deleteArticle(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

// Update one article
router.post('/update', auth, async (req, res) => {
    const {id,author,newTitle,newDescription,newUrl,newUrlToImage,newContent} = req.body;
    const newArticle=new Article({
        author: author,
        title: newTitle,
        description:newDescription,
        url:newUrl,
        urlToImage:newUrlToImage,
        publishAt:Date.now(),
        content:newContent
    });
    const dbArticle = await updateArticle(id,newArticle);
    res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);
});

export default router;