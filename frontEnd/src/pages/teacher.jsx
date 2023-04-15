import React from "react";
import AddCourse from "./teacherPages/addCourse";
import TeacherNavBar from "../componrnts/navs/NavTeacher";
import { useNavigate } from "react-router-dom";

import VideoUploader from "./teacherPages/uploadVideo";
const Teacher = () => {
  // const teacherID = getLocalStorage("user")._id;

  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate("/addCourse");
  };
  const handleMyCoursesClick = () => {
    // window.location.href = "/teacherCourses";
    navigate("/teacherCourses");
  };
  return (
    <>
      <TeacherNavBar />
      <div className="body">
        <div className="centered text-white">
          <h1>Teacher Dahboard</h1>
        </div>
        <div className=" d-flex justify-content-center">
          <button className="button" onClick={() => handleExploreClick()}>
            Add New Course
          </button>
          {/* <button className="button">Add New Course</button> */}
        </div>
        <div className="d-flex justify-content-center">
          {/* <AddCourse /> */}
          <button className="button" onClick={() => handleMyCoursesClick()}>
            My Courses
          </button>
        </div>
        {/* <VideoUploader /> */}
      </div>
    </>
  );
};

export default Teacher;
