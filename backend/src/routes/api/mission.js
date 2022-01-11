import express from 'express';
import {
    createMission,
    retrieveMission,
    updateMission,
    deleteMission,
    voteMission,
    unvoteMission,
    deleteAllMission
} from '../../pokemon-data/missiondao';
import auth from '../../middleware/auth';
import { Mission } from '../../pokemon-data/missionschema';

const HTTP_OK = 200; 
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Missions
 *   description: mission management and display
 */
/**
 * @swagger
 * definitions:
 *   Poster:
 *     required:
 *       - url
 *       - title
 *       - author
 *       - image
 *       - backgroundInfo
 *       - question
 *       - keywords
 *     properties:
 *       url:
 *         type: string
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       image:
 *         type: string
 *       backgroundInfo:
 *         type: string
 *       question:
 *         type: string
 *       keywords:
 *         type: string array
 */
/**
 * @swagger
 * /api/mission/post:
 *   post:
 *     description: post a new mission
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: url
 *         description: give the url of new mission
 *         required: true
 *         type: string
 *       - name: title
 *         description: give new mission a title
 *         required: true
 *         type: string
 *       - name: author
 *         description: set author to username
 *         required: true
 *         type: string
 *       - name: image
 *         description: give image if available
 *         required: false
 *         type: string
 *       - name: backgroundInfo
 *         description: set background information
 *         required: ture
 *         type: string
 *       - name: question
 *         description: user's question
 *         required: true
 *         type: string
 *       - name: keywords
 *         description: keywords of the mission (can input an array)
 *         required: true
 *         type: string array
 *     responses:
 *       200:
 *         description: post success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Poster'
 */

router.post('/post', async (req, res) => {
    try {
        const {url, title,author, image, backgroundInfo,question,keywords} = req.body;
        const newMission = {
            url: url,
            title : title,
            author: author,
            image: image,
            backgroundInfo : backgroundInfo,
            question : question,
            status : false,
            support : 0, 
            keywords : keywords
        };
    
        const dbMission = await createMission(newMission);
    
        res.status(HTTP_CREATED) 
            .json(dbMission);
    }catch(err){
        console.error(err);
        res.status(500).send();
    }
});


/**
 * @swagger
 * definitions:
 *   voter:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/mission/vote:
 *   post:
 *     description: vote for a mission (increase its support value)
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the mission id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: vote success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/voter'
 */
router.post('/vote', async (req, res) => {
    const {id} = req.body;
    res.json(await voteMission(id));
});

/**
 * @swagger
 * definitions:
 *   unvoter:
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: string
 */
/**
 * @swagger
 * /api/mission/unvote:
 *   post:
 *     description: unvote for a mission (decrease its support value)
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the mission id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: unvote success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/unvoter'
 */
router.post('/unvote', async (req, res) => {
    const {id} = req.body;
    res.json(await unvoteMission(id));
});

/**
 * @swagger
 * /api/mission/missionNum:
 *   get:
 *     description: retrieve total number of missions in db
 *     tags: [Missions]
 *     responses:
 *       200:
 *         description: number of missions counted
 */
router.get('/missionNum',async (req, res) =>{
    const missionNum = await Mission.count();
    res.json(missionNum);
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
 * /api/mission/missionlist:
 *   post:
 *     description: display mission list
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: give the page number
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: mission list display success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Paginating'
 */
router.post('/missionlist',paginatedResults(Mission), async (req, res) => {
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
        results.results = await model.find().limit(limit).skip(startIndex).exec()
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
 *   updater:
 *     required:
 *       - id
 *       - url
 *       - title
 *       - image
 *       - backgroundInfo
 *       - question
 *       - keywords
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       title:
 *         type: string
 *       image:
 *         type: string
 *       backgroundInfo:
 *         type: string
 *       question:
 *         type: string
 *       keywords:
 *         type: string array
 */
/**
 * @swagger
 * /api/mission/update:
 *   post:
 *     description: allow user to modify their missions
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the mission id
 *         required: true
 *         type: string
 *       - name: url
 *         description: give the new url
 *         required: true
 *         type: string
 *       - name: title
 *         description: give the new title
 *         required: true
 *         type: string
 *       - name: image
 *         description: give the new image if available
 *         required: false
 *         type: string
 *       - name: backgroundInfo
 *         description: give the new backgroundInfo
 *         required: true
 *         type: string
 *       - name: question
 *         description: give the new question
 *         required: true
 *         type: string
 *       - name: keywords
 *         description: give the new keywords (can input an array)
 *         required: true
 *         type: string array
 *     responses:
 *       200:
 *         description: mission update success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/updater'
 */
router.post('/update', auth, async (req, res) => {
    const {id, url, title, image, backgroundInfo,question,keywords} = req.body;
    const newMission=new Mission({
        url: url,
        title : title,
        author: '',
        image: image,
        backgroundInfo : backgroundInfo,
        question : question,
        status : false,
        support : null, 
        keywords : keywords
    });
    const dbMission = await updateMission(id,newMission);
    res.status(HTTP_CREATED) 
        .json(dbMission);
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
 * /api/mission/delete:
 *   delete:
 *     description: delete a specific mission
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the mission id
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
    await deleteMission(id);
    res.sendStatus(HTTP_NO_CONTENT);
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
 * /api/mission/find:
 *   post:
 *     description: find a specific mission by id
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: give the mission id
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: mission found
 *         schema:
 *           type: object
 *           $ref: '#/definitions/finder'
 */
router.post('/find', async (req, res) => {
    const {id} = req.body;
    res.json(await retrieveMission(id));
});
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
 * /api/mission/deleteAll:
 *   delete:
 *     description: can be used to delete all missions in database (for developers only! use carefully)
 *     tags: [Missions]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: confirmation
 *         description: enter 'delete all missions' as input to confirm this action
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: all missions clear
 */
router.delete('/deleteAll', async (req, res) => {
    const {confirmation} = req.body;
    if(confirmation=='delete all missions')
        res.json(await deleteAllMission());
});

export default router;