const express = require('express');
const pathRoute = express();

const auth = require('../middleware/auth');

const pathController = require('../controllers/pathController');
// const auth = require('../middleware/auth');

const bodyParser = require('body-parser');
pathRoute.use(bodyParser.urlencoded({extended: false}));
pathRoute.use(bodyParser.json());
// courseRoute.use(cors);

const multer = require('multer');
const path = require('path');

pathRoute.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(__dirname, '../public/uploads'));
    },
    filename: function (req, file, cb) { 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({ storage: storage });

const cors = require('cors');
pathRoute.use(cors({
    origin : 'http://localhost:3000',
}));

pathRoute.get('/getPath', pathController.getPath);

pathRoute.post('/addPath', pathController.addPath);

pathRoute.post('/updatePath', pathController.updatePath);


pathRoute.post('/deletePath', pathController.deletePath);


pathRoute.get('/getAllPaths',auth, pathController.getPaths);



module.exports = pathRoute;
