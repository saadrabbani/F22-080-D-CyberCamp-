const Course = require('../models/courseModel');
const mongoose = require("mongoose");
// const { ObjectId } = require("mongodb");
// import { useParams } from "react-router-dom";

// add course
const addCourse = async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        subscriberOnly : req.body.subscriberOnly,
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        pathId: req.body.pathId,

    });
    // console.log(course);
    course.save()
        .then(course => res.json(course))
        .catch(err => console.log(err));
}

const getCourse = async (req, res) => {
    // const user = await User.findById(user_id);
    try{
        const courseID = req.params.id;
        const course = await Course.findById(courseID);
        if (course) {
            res.json(course);
        }
        else {
            res.status(400).json({message: 'Course not found'});
        }
    }
    catch(err){
        res.status(400).json({message: 'Course not found'});
    }
}
// get all courses
const getAllCourses = async (req, res) => {
    try {
        // console.log(req.headers)
        const courses = await Course.find({});
        res.json(courses);
    }
    catch(err){
        res.status(400).json({message: 'Courses not found'});
    }

}




// update course
const updateCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        course.title = req.body.title;
        course.description = req.body.description;
        course.duration = req.body.duration;
        course.lectures = req.body.lectures;
        course.subscriberOnly = req.body.subscriberOnly,
        course.readingMaterials = req.body.readingMaterials;
        course.price = req.body.price;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    }
}
const addCourseLectures = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        // make a new course object nad append it to the array
        const newLecture = {
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            video: req.body.video,
        }
        course.lectures.push(newLecture);

        const updatedCourse = await course.save();
        res.json(updatedCourse);
        // console.log("Course found");
        // console.log(req.body);

    }
    // const updatedCourse = await course.save();
    // res.json(updatedCourse);
    
}
const addReadingMaterials = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        // make a new course object nad append it to the array
        const newReadingMaterial = {
            title: req.body.title,
            file: req.body.file,
        }
        course.readingMaterials.push(newReadingMaterial);

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    }
}

const findCourseById = async (req, res) => {
    // const courseId = mongoose.Types.ObjectId(req.query.courseId); // convert courseId to ObjectId
    const courseId = req.params.id;
    try {
        // const course = await Course.findById(courseId).exec(); // find course with matching courseId
        const course = await Course.findById(courseId).exec(); // find course with matching courseId
        res.json(course); // return the course as JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" }); // return a 500 status code and error message on error
    }
};






// find coure by path id
const findCourseByPathId = async (req, res) => {
    const pathId = mongoose.Types.ObjectId(req.query.pathId); // convert pathId to ObjectId
    try {
      const courses = await Course.find({ pathId }).exec(); // find all courses with matching pathId
      res.json(courses); // return the courses as JSON response
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" }); // return a 500 status code and error message on error
    }
};
// send  all  the courses which has status pending
const getPendingCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: 'Pending' });
        res.json(courses);
    }
    catch (err) {
        res.status(400).json({ message: 'Courses not found' });
    }
}

// send courses of a specific teacher
const getTeacherCourses = async (req, res) => {
    const teacherID = req.params.id;
    console.log("Teacher ID receid from client",teacherID);
    try {
        const courses = await Course.find({ creatorId: teacherID });
        console.log("Courses of teacher",courses);
        res.json(courses);
    }
    catch (err) {
        res.status(400).json({ message: 'Courses not found' });
    }
}
const approveCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        course.status = "Approved";
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    }
}



module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    getAllCourses,
    findCourseByPathId,
    getPendingCourses,
    getTeacherCourses,
    addCourseLectures,
    approveCourse,
    findCourseById,
    addReadingMaterials,
}

