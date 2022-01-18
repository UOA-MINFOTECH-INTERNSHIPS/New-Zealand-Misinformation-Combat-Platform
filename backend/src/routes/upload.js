import mongoose from 'mongoose';
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
 *       - file
 *     properties:
 *       file:
 *         type: string
 *         format: binary
 */
/**
 * @swagger
 * /file/upload:
 *   post:
 *     description: upload a image file
 *     tags: [Images]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: file
 *         description: give the file need to upload
 *         in: formData
 *         required: true
 *         type: file       
 *     responses:
 *       200:
 *         description: upload success
 *         schema:
 *           type: object
 *           $ref: '#/definitions/uploader'
 */
router.post('/upload', upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `${req.file.filename}`;
    return res.send(imgUrl);
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
        console.log(req.params.filename);
        const file = await gfs.files.findOne({ filename: req.params.filename });
        console.log(file);
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