const Course = require('../models/courseModel');
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
// import { useParams } from "react-router-dom";

// add course
const addCourse = async (req, res) => {
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        lectures: req.body.lectures,
        readingMaterials: req.body.readingMaterials,
        assignments: req.body.assignments,
        quizzes: req.body.quizzes,
        creatorId: req.body.creatorId,
        creatorName: req.body.creatorName,
        pathId: req.body.pathId,

    });
    course.save()
        .then(course => res.json(course))
        .catch(err => console.log(err));
}

const getCourse = async (req, res) => {
    // const user = await User.findById(user_id);
    try{
        const courseID = req.body.id;
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
        course.name = req.body.name;
        course.description = req.body.description;
        course.duration = req.body.duration;
        course.lectures = req.body.lectures;
        course.readingMaterials = req.body.readingMaterials;
        course.price = req.body.price;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    }
}

// find coure by path id
const findCourseByPathId = async (req, res) => {
    // const pathId = req.body.pathId;
    const pathId = req.params.pathId;
    console.log (pathId);
    try {
        const courses = await Course.find({ path: ObjectId(pathId) });
        // console.log(courses);
        res.json(courses);


    }
    catch (err) {
        res.status(400).json({ message: 'Courses not found' });
    }
}


module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    getAllCourses,
    findCourseByPathId
}

