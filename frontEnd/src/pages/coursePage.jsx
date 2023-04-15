// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { getLocalStorage } from "../localSrorage/localStorage";
import StudentNavBar from "../componrnts/navs/NavStudent";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../sessions/cookies";
import { isAuthenticated } from "../sessions/auth";
import VideoPlayer from "./Video/videoPlayer";
import Footer from "../componrnts/footer/footer";
import LaunchEC2Instance from "./awsLaunchInstance";
const CoursePage = () => {
  const src =
    "http://141.145.196.28:8000/eLearnSecurity%20_%20My%20Certifications%20-%20Google%20Chrome%202022-12-15%2020-28-56.mp4";
  const [course, setCourse] = useState("");
  const courseID = getLocalStorage("courseID");
  const navigate = useNavigate();

  const getCourse = async () => {
    try {
      const authToken = getCookie("token");
      if (!isAuthenticated() || isAuthenticated().userType !== "student") {
        navigate("/login");
      }

      const response = await axios.get(
        `http://localhost:8000/api/findCourseById/${courseID}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      console.log(response.data);
      setCourse(response.data);
    } catch (error) {
      alert("Api is not being executed ");
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <>
      <StudentNavBar />
      <div className="page">
        <div className="container">
          {!course ? (
            <div>
              <h1>No Course Details</h1>
            </div>
          ) : (
            <div className="row">
              <div className="">
                <h1 style={{ color: "#16df70" }}>{course.title}</h1>
                <p>{course.description}</p>
              </div>
              {/* <VideoPlayer videoId="6437f6e01cf92a0d2b4fa72a" /> */}
              <video controls width="100%">
                <source src={src} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video>

              <div className="">
                <ul>
                  {course.lectures.map((lecture) => {
                    return (
                      <a>
                        <li>{lecture.title}</li>
                      </a>
                    );
                  })}
                </ul>
              </div>
              {/* <h1>{course.pathId}</h1> */}
            </div>
          )}
        </div>
        <button
          className="button"
          onClick={() => navigate("/launchEC2Instance")}
        >
          Go to Labs
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;
