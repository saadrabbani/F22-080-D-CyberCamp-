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
const fs = require('fs');

courseRoute.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null,path.join(__dirname, '../public/uploads/videos'));
    },


});

const upload = multer({ storage: storage });

const cors = require('cors');
courseRoute.use(cors({
    credentials: true,
    origin : 'http://localhost:3000',
}));


courseRoute.post('/addCourse', courseController.addCourse);
courseRoute.put('/updateCourse/:id', courseController.updateCourse);
courseRoute.put ('/approveCourse/:id', courseController.approveCourse);

courseRoute.get('/getCourse/:id', courseController.getCourse);
courseRoute.get('/findCourseByPathId', courseController.findCourseByPathId);
courseRoute.get('/getAllCourses',auth, courseController.getAllCourses);
// findCourseById
courseRoute.get('/findCourseById/:id', courseController.findCourseById);
courseRoute.get('/getPendingCourses', courseController.getPendingCourses);
courseRoute.get('/getTeacherCourses/:id', courseController.getTeacherCourses);
// addCourseLectures
courseRoute.post('/addCourseLectures/:id', courseController.addCourseLectures);
// addReadingMaterials
courseRoute.post('/addReadingMaterials/:id', courseController.addReadingMaterials);


module.exports = courseRoute;
