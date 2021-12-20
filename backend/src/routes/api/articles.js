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
/**
 * @swagger
 * definitions:
 *   Poster:
 *     required:
 *       - author
 *       - title
 *       - description
 *       - url
 *       - urlToImage
 *       - content
 *     properties:
 *       author:
 *         type: string
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       urlToImage:
 *         type: string
 *       content:
 *         type: string
 */


/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Articles management system
 */


/**
 * @swagger
 * /api/articles/post:
 *   post:
 *     description: post a new article
 *     tags: [Articles]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: author
 *         description: give the author of new article
 *         in: formData
 *         required: true
 *         type: string
 *       - name: title
 *         description: give new article a title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: give a short description for article
 *         in: formData
 *         required: true
 *         type: string
 *       - name: url
 *         description: url link of article
 *         in: formData
 *         required: false
 *         type: string
 *       - name: urlToImage
 *         description: url link to images
 *         in: formData
 *         required: false
 *         type: string
 *       - name: content
 *         description: main content of article
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: post
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Poster'
 */
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
/**
 * @swagger
 * definitions:
 *   Paginating:
 *     required:
 *       - page
 *     properties:
 *       page:
 *         type: string
 */
/**
 * @swagger
 * /api/articles/articlelist:
 *   post:
 *     description: logout user
 *     tags: [Articles]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: give the page number
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: give article listing
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Paginating'
 */
router.post('/articlelist',paginatedResults(Article), async (req, res) => {
    res.json(res.paginatedResults);
});

// Retrieve one article saved
/**
 * @swagger
 * definitions:
 *   Finder:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/articles/find:
 *   post:
 *     description: find a article exist
 *     tags: [Articles]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the id of the article
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: found
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Finder'
 */
router.post('/find', async (req, res) => {
    const {id} = req.body;
    res.json(await retrieveArticle(id));
});

// Delete one article
/**
 * @swagger
 * definitions:
 *   Deletor:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/articles/:
 *   delete:
 *     description: delete a article
 *     tags: [Articles]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the id of the article
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: deleted
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Deletor'
 */
router.delete('/', auth, async (req, res) => {
    const {id} = req.body;
    await deleteArticle(id);
    res.sendStatus(HTTP_NO_CONTENT);
});



// Update one article
/**
 * @swagger
 * definitions:
 *   Updater:
 *     required:
 *       - id
 *       - author
 *       - newTitle
 *       - newDescription
 *       - newUrl
 *       - newUrlToImage
 *       - newContent
 *     properties:
 *       id:
 *         type: string
 *       author:
 *         type: string
 *       newTitle:
 *         type: string
 *       newDescription:
 *         type: string
 *       newUrl:
 *         type: string
 *       newUrlToImage:
 *         type: string
 *       newContent:
 *         type: string
 */
/**
 * @swagger
 * /api/articles/update:
 *   post:
 *     description: update a new article
 *     tags: [Articles]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: fine the article in db first
 *         in: formData
 *         required: true
 *         type: string
 *       - name: author
 *         description: give the author of new article
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newTitle
 *         description: give new article a title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newDescription
 *         description: give a short description for article
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newUrl
 *         description: url link of article
 *         in: formData
 *         required: false
 *         type: string
 *       - name: newUrlToImage
 *         description: url link to images
 *         in: formData
 *         required: false
 *         type: string
 *       - name: newContent
 *         description: main content of article
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: post
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Updater'
 */
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


function paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.body.page);
    //   const limit = parseInt(req.query.limit)

      const limit=20
      const startIndex = (page - 1) * limit
      const endIndex = page * limit
  
      const results = {}
  
      if (endIndex < await model.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
      }
      
      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        }
      }
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        // console.log(results.results)
        res.paginatedResults = results
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
  }

export default router;