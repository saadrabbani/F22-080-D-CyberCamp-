const express = require('express');
const videoRoute = express.Router();
const videoController = require('../controllers/videoController');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
// const path = require('path');



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'videos');
//       cb(null, path.join(__dirname, '../public/uploads/videos'));
  
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     },
//   });
  
//   const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//       if (file.mimetype === 'video/mp4') {
//         cb(null, true);
//       } else {
//         cb(null, false);
//       }
//     },
//   });
const storage = new GridFsStorage({
  url: 'mongodb+srv://cybercamp:cybercamp@cybercamp.eqpeakh.mongodb.net/?retryWrites=true&w=majority',
  // 'mongodb://localhost:27017/fyp_CC
  // url: 'mongodb://localhost:27017/fyp_CC',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["video/mp4"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-video-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "videos",
      filename: `${Date.now()}-video-${file.originalname}`
    };
  }
});

const upload = multer({ storage });


videoRoute.post('/uploadVideo', upload.single('video'), videoController.uploadVideo);
videoRoute.get('/video/:id', videoController.getVideo);
// delete
videoRoute.delete('/deleteVideo/:id', videoController.deleteVideo);
module.exports = videoRoute;

// const path = require('path');
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Video = require('../models/videoModel');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = path.join(process.cwd(), 'public', 'uploads', 'videos');
//     cb(null, path.join(__dirname, '../public/uploads/videos'));

//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype === 'video/mp4') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
// });

// router.post('/upload', upload.single('video'), function (req, res, next) {
//   const video = new Video({
//     title: req.body.title,
//     description: req.body.description,
//     file_name: req.file.filename,
//     file_path: req.file.path,
//   });

//   video
//     .save()
//     .then((result) => {
//       res.status(201).json({
//         message: 'Video uploaded successfully!',
//         video: result,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// module.exports = router;
