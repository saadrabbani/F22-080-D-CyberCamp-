const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
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

const uploadPdf = async (req, res) => {
  console.log(req.file);
  try {
    const fileBuffer = fs.readFileSync(req.file.path);

    const client = await MongoClient.connect('mongodb+srv://cybercamp:cybercamp@cybercamp.eqpeakh.mongodb.net');
    const db = client.db('test');
    const collection = db.collection('pdfs');

    const result = await collection.insertOne({
      filename: req.file.originalname,
      data: fileBuffer,
    });
    console.log(result);

    client.close();

    res.status(200).json({
      success: true,
      message: 'PDF file uploaded successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

module.exports = {
  uploadPdf,
};
