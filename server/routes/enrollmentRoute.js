const express = require('express');
const enrollmentRoute = express();

const auth = require('../middleware/auth');


const enrollemntController = require('../controllers/enrollmentController');
const bodyParser = require('body-parser');
enrollmentRoute.use(bodyParser.urlencoded({extended: false}));
enrollmentRoute.use(bodyParser.json());


const cors = require('cors');
enrollmentRoute.use(cors({
    origin : 'http://localhost:3000',
}));

enrollmentRoute.get('/getEnrollments', enrollemntController.getEnrollments);

enrollmentRoute.post('/createEnrollment', enrollemntController.createEnrollment);




module.exports = enrollmentRoute;
