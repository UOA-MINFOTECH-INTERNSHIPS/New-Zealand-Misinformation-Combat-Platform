import mongoose from 'mongoose';
import { Result } from '../pokemon-data/resultschema';
const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Images
 *   description: mission management and display
 */
/**
 * @swagger
 * definitions:
 *   uploader:
 *     required:
 *       - resultID
 *       - file
 *     properties:
 *       resultID:
 *         type: string
 *       file:
 *         type: string
 *         format: binary
 */
/**
 * @swagger
 * /file/upload:
 *   post:
 *     description: upload images file and associate with one result
 *     tags: [Images]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: resultID
 *         description: give the result's id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: file
 *         description: give the file need to upload
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: file       
 *     responses:
 *       200:
 *         description: upload success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/uploader'
 */
router.post('/upload', upload.array("file",12), async (req, res) => {
    const {resultID} = req.body;
    if (!req.files||req.files.length==0) return res.send("you must select a file.");
    const imgUrl=[];
    const exsitResult = await Result.findById(resultID);

    for(let i=0;i<req.files.length;i++){
        imgUrl.push(`${req.files[i].filename}`);
        exsitResult.imagesArray.push(`${req.files[i].id}`);
        
    }
    
    exsitResult.save();
    

    return res.send([imgUrl,exsitResult]);
});



let gfs, gridfsBucket;

const Grid = require("gridfs-stream");
const conn = mongoose.connection;
conn.once("open", function () {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: 'photos'});
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

router.get('/:filename', async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStreamByName(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

// router.delete('/file', async (req, res) => {
//     const {filename}=req.body;
//     try {
//         await gfs.files.deleteOne({ filename: filename });
//         res.send("success");
//     } catch (error) {
//         console.log(error);
//         res.send("An error occured.");
//     }
// });

module.exports = router;