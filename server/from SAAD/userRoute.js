const express = require('express');
const userRoute = express();
const fs = require('fs');

const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const bodyParser = require('body-parser');
userRoute.use(bodyParser.urlencoded({extended: false}));
userRoute.use(bodyParser.json());


const cookieParser = require("cookie-parser");
userRoute.use(cookieParser());


const multer = require('multer');
const path = require('path');

userRoute.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null,path.join(__dirname, '../public/uploads'));
    // },
    // filename: function (req, file, cb) { 
    //     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    // }
    
    

});

const upload = multer({storage: storage});

const cors = require('cors');
userRoute.use(cors({
    credentials: true,
    origin : 'http://localhost:3000',
}));


userRoute.post('/register', upload.single('image'), userController.registerUser);
userRoute.post('/login', userController.loginUser);
userRoute.post('/updatePassword',auth, userController.updatePassword);
userRoute.post('/forgetPassword', userController.forgetPassword);
userRoute.post('/teacherIDs', userController.getTeacherIds);
//studentProfile
userRoute.post('/putStudentProfile', userController.putStudentProfile);
userRoute.get('/getStudentProfile',auth, userController.getStudentProfile);
// getTeacherIds

userRoute.get('/test',auth, function(req,res){
    
    res.status(200).json({message: 'User Verified'})
});


module.exports = userRoute;
