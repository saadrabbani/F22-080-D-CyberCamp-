import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../sessions/cookies";
import { isAuthenticated, getPathId } from "../sessions/auth";
import { setLocalStorage } from "../localSrorage/localStorage";

import StudentNavBar from "../componrnts/navs/NavStudent";

import Footer from "../componrnts/footer/footer";

const Courses = () => {
  const [courses, setcourses] = useState([]);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  const handleExploreClick = (course) => {
    // return <CoursePage course={course} />;
    // check if user is subscriber or not and then navigate to coursePage
    if (isAuthenticated().subscriber === false) {
      alert("Pleasr subscribe to enjoy the course");
    } else {
      console.log(isAuthenticated().subscriber);
      setLocalStorage("courseID", course._id);
      navigate("/coursePage");
    }
  };

  // console.log("Path Id : ", pathId);
  // paths
  // using Async Await
  const getAllCourses = async () => {
    try {
      const Pid = getPathId();
      console.log("Path Id : ", Pid);
      const authToken = getCookie("token");
      if (!isAuthenticated() || isAuthenticated().userType !== "student") {
        navigate("/login");
      }

      const response = await axios
        // http://localhost:8000/api/findCourseByPathId
        .get("http://localhost:8000/api/findCourseByPathId", {
          params: {
            pathId: Pid,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          setcourses(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setIsError("Api is not being executed ");
      // console.log(error.message);
      // navigate("/login");
    }
  };
  // http://localhost:8000
  // NOTE:  calling the function

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <StudentNavBar />
      <div className="body">
        <div className="centered text-white">
          <h1> All courses </h1>
          {isError !== "" && <h2>{isError}</h2>}
          {/* {isError !== "" && <h2> Shamshad</h2>} */}
        </div>
        <div>
          {courses.length === 0 && (
            <h2 style={{ color: "red" }}> No course in this PATH </h2>
          )}
        </div>
        <div className="grid-container">
          {courses.map((course) => (
            <div className="card" style={{ width: "40rem" }}>
              <div className="card-Container">
                <h2 className="card-title" style={{ color: "" }}>
                  {course.title}
                </h2>
                <p className="card-text overflow-text">{course.description}</p>
                {/* <p className="card-text">{course.duration}</p> */}
                <p className="card-text">by : {course.creatorName}</p>
                {/* <p className="card-text">{course.pathId}</p> */}
                <button
                  href="#"
                  className="button"
                  onClick={() => handleExploreClick(course)}
                >
                  go to Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
