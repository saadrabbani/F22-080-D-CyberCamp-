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
import AddCourse from './pages/addCourse';
import Progress from './pages/progress';
import Paths from './pages/paths';
import PathCourse from './pages/path_Courses';
import CoursePage from './pages/coursePage';
import Logout from './pages/logout';




import { useState } from 'react';
import AuthContext from './context/authContext';

function App() {
    
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
                    
            </Routes>
        </Router>
    </AuthContext.Provider>
);
}
  
export default App;