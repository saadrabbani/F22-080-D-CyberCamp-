const express = require('express');
const pdfController = require('../controllers/readingMaterialController');
const readingMaterialRoute = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });
readingMaterialRoute.post('/uploadReadingMaterial', upload.single('file'), pdfController.uploadPdf);

module.exports = readingMaterialRoute;
