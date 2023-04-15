const Enrollment = require  ('../models/enrollmentModel');


// get all enrollments

 const createEnrollment = async (req, res) => {
    
    const enrollment = await Enrollment.findOne({ studentId: studentId, courseId: courseId }); 
    if (enrollment) {
        return res.status(400).json({ message: 'Enrollment already exists' });
    }
    const newEnrollment = new Enrollment({
        studentId: req.body.studentId,
        courseId: req.body.courseId,
        // progress:  req.body.progress
    });
    newEnrollment.save()

        .then(enrollment => res.json(enrollment))
        .catch(err => console.log(err));
};

// get progress of a student in a course

 const getProgress = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const courseId = req.params.courseId;
        const enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
        if (enrollment) {
            res.json(enrollment);
        }
        else {
            res.status(400).json({ message: 'Enrollment not found' });
        }

    }
    catch (err) {
        res.status(400).json({ message: 'Enrollment not found' });
    }

}
// get enrollments of a student

 const getEnrollments = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const enrollments = await Enrollment.find({ student: studentId });
        res.json(enrollments);
    }
    catch (err) {
        res.status(400).json({ message: 'Enrollments not found' });
    }
}





 const getEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (enrollment) {
            res.json(enrollment);
        }
        else {
            res.status(400).json({ message: 'Enrollment not found' });
        }
    }
    catch (err) {
        res.status(400).json({ message: 'Enrollment not found' });
    }
}

// get courses id that student is enrolled in

 const getEnrolledCourses = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const enrollments = await Enrollment.find({ student: studentId });
        const courses = [];
        for (let i = 0; i < enrollments.length; i++) {
            const course = await Course.findById(enrollments
            [i].courseId);
            courses.push(course);
        }
        res.json(courses);
    }   
    catch (err) {
        res.status(400).json({ message: 'Courses not found' });
    }
}


// get students id that are enrolled in a course

 const getEnrolledStudents = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const enrollments = await Enrollment.find
            ({ course: courseId });
        const students = [];
        for (let i = 0; i < enrollments.length; i++) {
            const student = await Student.findById(enrollments
            [i].studentId);
            students.push(student);
        }
        res.json(students);
    }
    catch (err) {
        res.status(400).json({ message: 'Students not found' });
    }
}

module.exports = {
    createEnrollment,
    getEnrollment,
    getEnrollments,
    getEnrolledCourses,
    getEnrolledStudents,
    getProgress
}


// update enrollment


 