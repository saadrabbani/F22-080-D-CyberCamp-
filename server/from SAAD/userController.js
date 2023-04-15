const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
const randomstring = require('randomstring');



const resetMail = async (name, email,token) => {
    try{
        const transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 587,
            secure : true,
            auth : {
                user:config.emailUser,
                pass:config.emailPassword
            }
        });
        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: 'Reset Password',
            html: `<h1>Hi ${name}</h1> 
            <p>Click on the link below to reset your password</p>
            <a href="http://localhost:3000/resetPassword/${token}">Reset Password</a>`
        };
        const info = await transporter.sendMail(mailOptions,function(err,info){
            if(err){
                console.log(err);
            }
            else{
                console.log('Email sent: ' + info.response);
            }
        });

    }
    catch (err){
        res.status(500).json({error: err});
    }
};


const createToken = async (id) => {
    try{
        const token = await jwt.sign({id}, config.secret_jwt, {
            // expiresIn: '1h'
        });
        return token;
    }
    catch(err){
        res.status(500).json({error: err});
    }
};




const calchash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

// Register User

const registerUser = async (req, res) => {
    const hash = await calchash(req.body.password);
    // console.log(req.body);
    User.findOne ({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'});
        }
        else if (req.password !== req.confirmPassword) {
            return res.status(400).json({password: 'Password does not match'});
        }
            
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                // image: req.file.filename,
                userType: req.body.userType
            });
            // console.log(newUser);

            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));


        }
    });
};



// Login User
const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(req.body);


    const userData = await User.findOne ({email: email});
    if (userData) {
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
            const token = await createToken(userData._id);
            // update token in user 

        
            const userResult = {
                _id: userData._id,
                name: userData.name,
                email: userData.email,
                image: userData.image,
                userType: userData.userType,


                token: token
                // token
            }
            // update user details in db
            const updatedUser = await User.findByIdAndUpdate(userData._id, userResult, { new: true }); 
            

            res.send({ token: token, user: updatedUser });
        
        }    else {
            res.status(400).json({password: 'Password incorrect'});
        }
    }
    else {
        res.status(400).json({email: ' User not found'});
    }



};

// update password
     
const updatePassword = async (req, res) => {
    try{
        const user_id = req.body.id;
        const password = req.body.password;

        // find one by id
        const user = await User.findById(user_id);
        
        if (user) {
            const hash = await calchash(password);
            user.password = hash;
            const updatedUser = await user.save();
            res.json(updatedUser);
        }
        else{
            res.status(404).json({message: 'User_id not found'});
        }

    }
    catch(err){
        res.status(500).json({error: err.message });
    }

};


const forgetPassword = async (req, res) => {
    try{
        
        const email = req.body.email;

        const user = await User.findOne ({ email: email });
        if(user){
            const randomtoken = randomstring.generate();
            const tokeninsert =  await User.updateOne({email: email}, {token : randomtoken});
            const sendReset = await resetMail(user.name, user.email, randomtoken);
            console.log(sendReset)
            res.json({message: 'Please check your email to reset your password'});



        }
        else{
            res.status(404).json({message: 'This email does not exist'});
        }

    }
    catch(err){
        res.status(500).json({error: err.message });
    }
};

const getTeacherIds = async (req, res) => {
    try {
        const teachers = await User.find({ userType: 'teacher' });
        const teacherIds = teachers.map(teacher => teacher._id);
        res.json(teacherIds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStudentProfile = async (req, res) => {
    try {
      const student = await Student.findById(req.user.id).select("-password");
      if (!student) {
        return res.status(400).json({ error: "Student not found" });
      }
      res.status(200).json(student);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };


  //Find Student by req.user.email
  //if user is found then update the student profile according to the req.body { name and email}
//   const putStudentProfile = async (req, res) => {
//     try {
//         console.log(req.body);
//       // Find the student by their email (which is stored in the req.user object)
//       const student = await User.findOne({ email: req.user.email });
  
//       // If the student is found, update their profile with the new name and email from the req.body
//       if (student) {
//         student.name = req.body.name;
//         student.email = req.body.email;
//         // Save the updated student object
//         await student.save();
  
//         // Send a success response with the updated student object
//         res.status(200).json({
//           message: 'Student profile updated successfully',
//           student: student
//         });
//       } else {
//         // If the student is not found, send a 404 response with an error message
//         res.status(404).json({ message: 'Student not found' });
//       }
//     } catch (error) {
//       // If an error occurs, send a 500 response with the error message
//       res.status(500).json({ message: error.message });
//     }
//   };





const putStudentProfile = async (req, res) => {
    
    try {

    console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOO");
      console.log(req.body);
      console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOO");
      // Find the user by their email (which is stored in the req.user object)
      const user = await User.findOne({ email: req.body.email });
        // If the user is found, update their profile with the new name and email from the req.body
      if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
  
        // Save the updated user object
        await user.save();
  
        // Send a success response with the updated user object
        res.status(200).json({
          message: 'User profile updated successfully',
          user: user
        });
      } else {
        // If the user is not found, send a 404 response with an error message
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      // If an error occurs, send a 500 response with the error message
      res.status(500).json({ message: error.message });
    }
  };
  



module.exports = {
    registerUser,
    loginUser,
    updatePassword,
    forgetPassword,
    getTeacherIds,
    getStudentProfile,
    putStudentProfile
};

// i am getting 404 on login what to do?

