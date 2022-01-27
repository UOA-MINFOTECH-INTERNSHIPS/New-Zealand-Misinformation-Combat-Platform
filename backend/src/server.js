import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { Result } from './pokemon-data/resultschema';
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const cookieParser = require("cookie-parser");
const cors = require("cors");



// Setup Express
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// Setup body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Setup JSON converter
app.use(express.json());

// Setup our routes.
import routes from './routes';
app.use('/', routes);


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Hello World',
      version: '1.0.0',
    }
  },
  apis: ['./src/routes/api/*.js','./src/routes/upload.js','./src/server.js']
};
// console.log(swaggerOptions)
const swaggerDocs = swaggerJsdoc(swaggerOptions);
console.log(swaggerDocs)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../public')));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');

    // Make all files in that folder public
    app.use(express.static(path.join(__dirname, '../../frontend/build')));

    // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
    });

}



// Start the DB running. Then, once it's connected, start the server.
require('dotenv').config()
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true ,useUnifiedTopology: true, })
    .then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));

const logger = require('./Logger/logger');
logger.log('info','catch');
logger.log('error','error3');



//upload images

let gfs, gridfsBucket;

const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
const conn = mongoose.connection;
conn.once("open", function () {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: 'photos'});
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});
app.use("/file", upload);

/**
 * @swagger
 * definitions:
 *   image_finder:
 *     required:
 *       - filename
 *     properties:
 *       file:
 *         type: string
 */
/**
 * @swagger
 * /file/find:
 *   post:
 *     description: find a image file in db
 *     tags: [Images]
 *     produces:
 *       - image/png
 *       - image/jpg
 *       - image/jpeg
 *     parameters:
 *       - name: imageID
 *         description: give the image's ID to find image
 *         in: formData
 *         required: true
 *         type: string       
 *     responses:
 *       200:
 *         description: image found
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
app.post("/file/find", async (req, res) => {
  const {imageID}=req.body;
  const ID=mongoose.Types.ObjectId(imageID);
  try {
        const file = await gfs.files.findOne({_id : ID });
        const readStream = gridfsBucket.openDownloadStreamByName(file.filename);
        readStream.pipe(res);
      
      res.setHeader('Content-Type', 'image/png');
      
      
  } catch (error) {
      res.send("not found");
  }
});


/**
 * @swagger
 * definitions:
 *   image_finder:
 *     required:
 *       - filename
 *     properties:
 *       file:
 *         type: string
 */
/**
 * @swagger
 * /file/delete:
 *   delete:
 *     description: delete a image file in db
 *     tags: [Images]
 *     produces:
 *       - image/png
 *       - image/jpg
 *       - image/jpeg
 *     parameters:
 *       - name: imageID
 *         description: give the image's id to delete image
 *         in: formData
 *         required: true
 *         type: string       
 *     responses:
 *       200:
 *         description: image deleted
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 */
app.delete("/file/delete", async (req, res) => {
  const {imageID}=req.body;
  const ID=mongoose.Types.ObjectId(imageID);
  try {
      await gfs.files.deleteOne({ _id: ID });
      res.send("success");
  } catch (error) {
      console.log(error);
      res.send("An error occured.");
  }
});

