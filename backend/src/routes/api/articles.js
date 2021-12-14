import express from 'express';
import {
    createArticle,
    retrieveAllArticle,
    updateArticle,
    deleteArticle,
    deleteAllArticle
} from '../../pokemon-data/article-dao';
import auth from '../../middleware/auth';



const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;


const router = express.Router();

//create user post article
router.post('/newarticle', auth, async (req, res) => {
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
router.get('/', auth, async (req, res) => {
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

//===================================================
/*creating auth before posting
import auth from '../../middleware/auth.js';
router.post('/',auth,createArticle); */
//===================================================



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

