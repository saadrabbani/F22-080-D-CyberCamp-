
const Videos = require('../models/videoModel');
const mongoose = require("mongoose");
const uploadVideo = (req, res, next) => {
  
  const video = new Videos({
    title: req.body.title,
    description: req.body.description,
    file_name: req.file.filename,
  });
  console.log(video);

  video
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Video uploaded successfully!',
        // send the video ID back to the client
        videoID: result._id,
        // console.log(result._id);
        // video: result,
      });
    })
    .catch((err) => {
      
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// const uploadVideo = async (req, res, next) => {
//   try {
//     // Get file information from request object
//     const { filename, mimetype, size } = req.file;

//     // Save file ID to MongoDB database
//     const db = client.db('test');
//     const collection = db.collection('videos');
//     const result = await collection.insertOne({ filename, mimetype, size, fileId: req.file.id });

//     // Send response with file ID
//     res.json({ id: result.insertedId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to upload video' });
//   }
// };


const { MongoClient, ObjectId } = require('mongodb');
const Grid = require('gridfs-stream');

const url = 'mongodb+srv://cybercamp:cybercamp@cybercamp.eqpeakh.mongodb.net';
const dbName = 'videos';
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const getVideo = async (req, res) => {
  // const { id } = req.params;
  // const id = mongoose.Types.ObjectId(req.params.id);
  // const id = req.params.id;
  // console.log(id);

  try {
    const client = await mongoClient.connect();
    const db = client.db(dbName);
    const gfs = Grid(db, MongoClient);
    // console.log(gfs);

    const videos = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id)});
    // const video = await gfs.files.findOne({ _id: id } ) ;
    // const video = await Videos.findById(id);
    // const videos = await gfs.files.find().toArray();
    console.log("videos", videos);
    if (!videos) {
      return res.status(404).send('Video not found');
    }

    const readStream = gfs.createReadStream({ _id: videos._id });
    readStream.pipe(res);

    res.set('Content-Type', 'video/mp4');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteVideo = async (req, res) => {
  try {
    const client = await mongoClient.connect();
    const db = client.db(dbName);
    const gfs = Grid(db, MongoClient);

    const video = await gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });
    if (!video) {
      return res.status(405).send('Video not found');
    }

    await gfs.files.remove({ _id: video._id, root: 'videos' });
    res.send('Video deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


module.exports = {
  uploadVideo,
  getVideo,
  deleteVideo,
};
