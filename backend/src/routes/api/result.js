import express from 'express';
import {
    createResult,
    retrieveResult,
    retrieveAllResult,
    updateResult,
    deleteResult,
    likeResult,
    unlikeResult,
    deleteAllResult,
    sortAllResult
} from '../../pokemon-data/resultdao';
import {
    retrieveMission,
    updateMission,
} from '../../pokemon-data/missiondao';
import auth from '../../middleware/auth';
import { Mission } from '../../pokemon-data/missionschema';
import { Result } from '../../pokemon-data/resultschema';
import { User } from '../../pokemon-data/userschema';

const HTTP_OK = 200; 
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Results
 *   description: result management and display
 */
/**
 * @swagger
 * definitions:
 *   Poster:
 *     required:
 *       - username
 *       - missionID
 *       - analysis
 *       - conclusion
 *       - verdict
 *       - reference
 *     properties:
 *       username:
 *         type: string
 *       missionID:
 *         type: string
 *       analysis:
 *         type: string
 *       conclusion:
 *         type: string
 *       verdict:
 *         type: string
 *       reference:
 *         type: string
 */
/**
 * @swagger
 * /api/result/post:
 *   post:
 *     description: post a new result based on an exsiting mission
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: give the username of loggedin user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: missionID
 *         description: give the mission ID that fact checker going to work on
 *         in: formData
 *         required: true
 *         type: string
 *       - name: analysis
 *         description: give analysis part of new result
 *         in: formData 
 *         required: true
 *         type: string
 *       - name: conclusion
 *         description: give a short conclusion for new result
 *         in: formData
 *         required: true
 *         type: string
 *       - name: verdict
 *         description: give verdict (true, false, partly true)
 *         in: formData
 *         required: true
 *         type: string
 *       - name: reference
 *         description: give references if available
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: post success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Poster'
 */
router.post('/post',auth, async (req, res) => {
    // console.log(req.body);
    try {
        const {username, missionID, analysis,conclusion, verdict, reference} = req.body;
        if (!analysis || !conclusion || !verdict || !reference )
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        const exsitingMission = await retrieveMission(missionID);
        const existingResult = await Result.findOne({ missionID });
        if(existingResult)
            return res.status(400).json({
                errorMessage: "A result with this mission is already exsit",
            });
        if (exsitingMission){
            const newResult = {
                missionID : missionID,
                url: exsitingMission.url,
                title : exsitingMission.title,
                author: username,
                image: exsitingMission.image,
                backgroundInfo : exsitingMission.backgroundInfo,
                question : exsitingMission.question,
                keywords : exsitingMission.keywords,
                analysis : analysis,
                conclusion : conclusion,
                verdict : verdict,
                reference : reference,
                likeNum : 0,
                imagesArray : []
            };
            
            const dbResult = await createResult(newResult);
            exsitingMission.status = true;
            await exsitingMission.save();
            const exsitUser = await User.findOne({username});

            exsitUser.arrayOfChecked.push(dbResult._id);
            await exsitUser.save();
            
            res.status(HTTP_CREATED) 
                .json([dbResult,exsitUser]);
        }
        
    
        
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * definitions:
 *   updater_result:
 *     required:
 *       - id
 *       - analysis
 *       - conclusion
 *       - verdict
 *       - reference
 *     properties:
 *       id:
 *         type: string
 *       analysis:
 *         type: string
 *       conclusion:
 *         type: string
 *       verdict:
 *         type: string
 *       reference:
 *         type: string
 */
/**
 * @swagger
 * /api/result/update:
 *   post:
 *     description: allow fact checker to modify their result
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the id of exsiting result
 *         in: formData
 *         required: true
 *         type: string
 *       - name: analysis
 *         description: give new analysis part of result 
 *         in: formData
 *         required: true
 *         type: string
 *       - name: conclusion
 *         description: give new conclusion for result
 *         in: formData
 *         required: true
 *         type: string
 *       - name: verdict
 *         description: update verdict (true, false, partly true)
 *         in: formData
 *         required: true
 *         type: string
 *       - name: reference
 *         description: give new references if available
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: result update success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/updater_result'
 */
router.post('/update', auth, async (req, res) => {
    const {id, analysis, conclusion, verdict, reference} = req.body;
    if (!analysis || !conclusion || !verdict || !reference )
        return res
            .status(400)
            .json({ errorMessage: "Please enter all required fields." });
    const newResult=new Result({
        missionID : '',
        url: '',
        title : '',
        author: '',
        image: '',
        backgroundInfo : '',
        question : '',
        keywords : [],
        analysis : analysis,
        conclusion : conclusion,
        verdict : verdict,
        reference : reference
    });
    const dbResult = await updateResult(id,newResult);
    res.status(HTTP_CREATED) 
        .json(dbResult);
});

/**
 * @swagger
 * definitions:
 *   deleter:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/result/delete:
 *   delete:
 *     description: delete a specific result by ID
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the result id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: delete success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/deleter'
 */
router.delete('/delete', auth, async (req, res) => {
    const {id} = req.body;
    const exsitResult = await Result.findOne({id});

    if(!exsitResult){
        return res.status(400).json({
            errorMessage: "Does not exsit this result id",
        });
    }
    const exsitingUser = await User.findOne({arrayOfChecked : id});

    if(!exsitingUser){
        return res.status(400).json({
            errorMessage: "Database error, Cannot find the fact checker of this result",
        });
    }
    await exsitingUser.arrayOfChecked.pull(id);
    await exsitingUser.save();

    const deletedFrom=[];
    const users = await User.find({arrayOfLiked : id});

    for(let i =0; i < users.length; i++){
        const likedUser = await User.findOne({username : users[i].username});
        await likedUser.arrayOfLiked.pull(id);
        await likedUser.save();
        await deletedFrom.push(likedUser.username);
    }
    
    await deleteResult(id);

    res.json([exsitingUser,deletedFrom]);
});

/**
 * @swagger
 * definitions:
 *   liker:
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
 * /api/result/like:
 *   post:
 *     description: like a result (the result will link to users who like it)
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: give the username of logged in user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: id
 *         description: give the result id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: like success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/liker'
 */
router.post('/like', async (req, res) => {
    const {username, id} = req.body;
    res.json(await likeResult(username, id));
});


/**
 * @swagger
 * definitions:
 *   unliker:
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
 * /api/result/unlike:
 *   post:
 *     description: unlike a result (the result will disconnect to users who like it)
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: give the username of logged in user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: id
 *         description: give the result id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: unlike success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/liker'
 */
router.post('/unlike', async (req, res) => {
    const {username, id} = req.body;
    res.json(await unlikeResult(username, id));
});

/**
 * @swagger
 * definitions:
 *   finder:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/result/find:
 *   post:
 *     description: find a specific result by id
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the result id
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: result found
 *         schema:
 *           type: object
 *           $ref: '#/definitions/finder'
 */
router.post('/find', async (req, res) => {
    const {id} = req.body;
    res.json(await retrieveResult(id));
});

/**
 * @swagger
 * /api/result/resultNum:
 *   get:
 *     description: retrieve total number of results in db
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: number of results counted
 */
router.get('/resultNum',async (req, res) =>{
    const resultNum = await Result.count();
    res.json(resultNum);
})

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
 * /api/result/resultlist:
 *   post:
 *     description: display result list
 *     tags: [Results]
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
 *         description: result list display success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Paginating'
 */
router.post('/resultlist',paginatedResults(Result), async (req, res) => {
    res.json(res.paginatedResults);
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
        results.results = await model.find().sort({likeNum: -1}).limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
}

/**
 * @swagger
 * definitions:
 *   delete_all:
 *     required:
 *       - confirmation
 *     properties:
 *       confirmation:
 *         type: string
 */
/**
 * @swagger
 * /api/result/deleteAll:
 *   delete:
 *     description: can be used to delete all results in database (for developers only! use carefully)
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: confirmation
 *         description: enter 'delete all results' as input to confirm this action
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: all results clear
 */
router.delete('/deleteAll', async (req, res) => {
    const {confirmation} = req.body;
    if(confirmation=='delete all results')
        res.json(await deleteAllResult());
});

/**
 * @swagger
 * /api/result/all:
 *   get:
 *     description: retrieve all results in db
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: all results got
 */
 router.get('/all', async (req, res) => {
    try{
        res.json(await retrieveAllResult());
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /api/result/sort_all:
 *   get:
 *     description: retrieve all SORTED results in db
 *     tags: [Results]
 *     responses:
 *       200:
 *         description: all results got
 */
 router.get('/sort_all', async (req, res) => {
    try{
        res.json(await sortAllResult());
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /api/result/find_results:
 *   post:
 *     description: searched results pagination
 *     tags: [Results]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idArray
 *         description: give an array of result id
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: string
 *         example: ['str1', 'str2', 'str3']
 *       - name: page
 *         description: give the page number you want
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: give the list of results user searched
 *         schema:
 *           type: array
 */
 router.post('/find_results', async (req, res) => {
    const {idArray, page} = req.body;
    const results=[];
    for (let i=0; i<idArray.length; i++){
        const exsitResult = await Result.findOne({_id : idArray[i]})
        if(!exsitResult){
            return res.status(400).json({
                errorMessage: `The number ${i+1} id in array does not exsit`,
            });
        }
        results.push(exsitResult);
    }
    const slicedArray = results.slice((page-1)*20, page*20);
    res.json(slicedArray);
    
});
export default router;