import React from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';


import "bootstrap/dist/css/bootstrap.min.css";



import Home from './pages/home';
import SignUp from './pages/signup';
import Login from './pages/login';
import Courses from './pages/courses';
import Teacher from './pages/teacher';
import StudentDashboard from './pages/studentDashBoard';
import AddCourse from './pages/teacherPages/addCourse';
import Progress from './pages/progress';
import Paths from './pages/paths';
import PathCourse from './pages/path_Courses';
import CoursePage from './pages/coursePage';
import Logout from './pages/logout';
import EditCourse from './pages/teacherPages/editCourse';

import Admin from './pages/admin';
import AddPath from './pages/adminPages/addPath';
import DeletePath from './pages/adminPages/deletePath';
import UpdatePath from './pages/adminPages/updatePath';
import AddLectures from './pages/teacherPages/addLectures';
import TeacherCourses from './pages/teacherPages/teacherCourses';
import PendingCourses from './pages/adminPages/pendingCourses';
import { useState } from 'react';
import AuthContext from './context/authContext';
import StudentProfile from './pages/studentProfile';
import TeacherProfile from './pages/teacherProfile';
import LaunchEC2Instance from './pages/awsLaunchInstance';
import Quizes from './pages/quizes';
import QuizCreator from './pages/createQuiz';
import ReadingMaterial from './pages/teacherPages/readingMaterial';

// import `./App.css`
// import app.css 
import './App.css';

const App = () => {
    
const [authToken, setAuthToken] = useState("");
    return (
    <AuthContext.Provider value={{ authToken , setAuthToken }}>
        <Router>
        {/* <Navbar /> */}
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/student' element={<StudentDashboard />} />
                <Route path='/teacher' element={<Teacher />} />
                <Route path='/addCourse' element={<AddCourse />} />
                <Route path='/progress' element={<Progress />} />
                <Route path='/paths' element={<Paths />} />
                <Route path='/pathsCourses' element={<PathCourse />} />
                <Route path='/coursePage' element={<CoursePage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/addPath' element={<AddPath />} />
                <Route path='/addLectures' element={<AddLectures />} />
                <Route path='/teacherCourses' element={<TeacherCourses />} />
                <Route path='/editCourse' element={<EditCourse />} />
                <Route path='/deletePath' element={<DeletePath />} />
                <Route path='/studentProfile' element={<StudentProfile />} />
                <Route path='/teacherProfile' element={<TeacherProfile />} />
                <Route path='/updatePath' element={<UpdatePath />} />
                <Route path='/launchEC2Instance' element={<LaunchEC2Instance />} />
                    <Route path='/pendingCourses' element={<PendingCourses />} />
                    <Route path='/quiz' element={<Quizes />} />
                    <Route path='/createQuiz' element={<QuizCreator />} />
                    <Route path='/readingMaterial' element={<ReadingMaterial />} />
            </Routes>
        </Router>
    </AuthContext.Provider>
);
}
  
export default App;