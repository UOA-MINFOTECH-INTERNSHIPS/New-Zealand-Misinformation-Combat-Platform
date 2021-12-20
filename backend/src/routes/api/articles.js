import express from 'express';
import {
    createArticle,
    retrieveAllArticle,
    retrieveArticle20,
    updateArticle,
    deleteArticle,
    retrieveArticle,
    deleteAllArticle
} from '../../pokemon-data/article-dao';
import auth from '../../middleware/auth';
import axios from 'axios';
import { Article } from '../../pokemon-data/articleschema';



const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();

//create user post article
router.post('/newarticle', async (req, res) => {
    try{
        const {author, title, description, url, urlToImage, publishAt, content, like} = req.body;
        const newArticle = {
            author: author,
            title: title,
            description : description,
            url : url,
            urlToImage : urlToImage,
            publishAt : publishAt, 
            content : content,
            like : like
        };
    
        const dbArticle = await createArticle(newArticle);
    
        res.status(HTTP_CREATED) 
            .header('Location', `/api/articles/${dbArticle._id}`)
            .json(dbArticle);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


// Retrieve all articles saved
router.get('/all', auth, async (req, res) => {
    try{
        res.json(await retrieveAllArticle());
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
    
});


// save like article from api
router.post('/likearticle', async (req, res) => {
    res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);
});

// Retrieve all articles saved
router.get('/', async (req, res) => {
    res.json(await retrieveArticle20());
});

// Retrieve one article saved
router.get('/find', async (req, res) => {
   // const {id} = req.body;
    var  id = req.query.id;
    res.json(await retrieveArticle(id));
});

// Delete one article
router.delete('/',  async (req, res) => {
    const {id} = req.body;
    await deleteArticle(id);
    res.sendStatus(HTTP_NO_CONTENT);
});



// Update one article
router.put('/update',  async (req, res) => {
    const {bdid,author,title,description,url,urlToImage,content} = req.body;
    console.log(req.body);
    const newArticle=new Article({
        author: author,
        title: title,
        description:description,
        url:url,
        urlToImage:urlToImage,
        publishAt:Date.now(),
        content:content
    });
    const dbArticle = await updateArticle(bdid,newArticle);
    res.status(HTTP_CREATED) 
        .header('Location', `/api/articles/${dbArticle._id}`)
        .json(dbArticle);
});


export default router;