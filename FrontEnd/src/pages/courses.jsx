import { useState, useEffect } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../sessions/cookies";
import { isAuthenticated, getPathId } from "../sessions/auth";
import { setLocalStorage } from "../localSrorage/localStorage";

import StudentNavBar from "../componrnts/navs/NavStudent";

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
      setLocalStorage("course", course);
      navigate(`/coursePage/`);
    }
  };

  // console.log("Path Id : ", pathId);
  // paths
  // using Async Await
  const getAllCourses = async () => {
    try {
      const pathId = getPathId();
      const authToken = getCookie("token");
      if (!isAuthenticated() || isAuthenticated().userType !== "student") {
        // const authToken = Cookies.get("loginToken");
        // console.log("Auth Token : ", authToken);
        // const loginToken = response.headers["loginToken"];
        // console.log("Login Token : ", loginToken);
      }

      const response = await axios
        // .get("http://localhost:8000/api/getAllCourses", {
        .get(
          "http://localhost:8000/api/findCourseByPathId",
          {
            params: {
              pathId: pathId,
            },
          },
          {
            // findCourseByPathId/${pathId
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
            },
          },
          [
            {
              pathId: pathId,
            },
          ]
        )
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
      <div className="p-3 mb-2 bg-dark text-white">
        <div className="col-lg">
          <br />
          <br />
          <h1> All courses </h1>
          {isError !== "" && <h2>{isError}</h2>}
          {/* {isError !== "" && <h2> Shamshad</h2>} */}
        </div>
        <div ClassName="container">
          <div className="row g-2 align-items-center ">
            {/* {courses.map((courses) => (
              // check if coursePathId is equal to pathId

              //   <div className="row d-flex">
              <div
                className="card bg-transparent border m-2 bh-blurred "
                style={{ width: "18rem" }}
              >
                <div className="card-body ">
                  <h2 className="card-title">{courses.title}</h2>
                  <p className="card-text">{courses.description}</p>
                  <p className="card-text">{courses.duration}</p>
                  <p className="card-text">{courses.creatorName}</p>
                  <p className="card-text">{courses.pathId}</p>
                  <a href="#" className="btn btn-primary">
                    Explore
                  </a>
                </div>
              </div>
            ))} */}
            {courses.map((course) => (
              // check if coursePathId is equal to pathId

              //   <div className="row d-flex">+
              <div
                className="card bg-transparent border m-2 bh-blurred "
                style={{ width: "18rem" }}
              >
                <div className="card-body ">
                  <h2 className="card-title">{course.title}</h2>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">{course.duration}</p>
                  <p className="card-text">{course.creatorName}</p>
                  <p className="card-text">{course.pathId}</p>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => handleExploreClick(course)}
                  >
                    go to Course
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
