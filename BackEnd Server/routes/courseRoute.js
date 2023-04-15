const express = require('express');
const courseRoute = express();

const courseController = require('../controllers/courseController');
const auth = require('../middleware/auth');

const bodyParser = require('body-parser');
courseRoute.use(bodyParser.urlencoded({extended: false}));
courseRoute.use(bodyParser.json());
// courseRoute.use(cors);

const multer = require('multer');
const path = require('path');

courseRoute.use(express.static(path.join(__dirname, 'public')));

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
courseRoute.use(cors({
    credentials: true,
    origin : 'http://localhost:3000',
}));

courseRoute.get('/getCourse', courseController.getCourse);
courseRoute.post('/addCourse', courseController.addCourse);
courseRoute.post('/updateCourse', courseController.updateCourse);
courseRoute.get('/findCourseByPathId', courseController.findCourseByPathId);




courseRoute.get('/getAllCourses',auth, courseController.getAllCourses);



module.exports = courseRoute;
