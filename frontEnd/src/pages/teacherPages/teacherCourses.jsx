import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../localSrorage/localStorage";
import TeacherNavBar from "../../componrnts/navs/NavTeacher";
import EditCourse from "./editCourse";
import { useNavigate } from "react-router-dom";

function TeacherCourses({ teacherId }) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  let teacherID = getLocalStorage("user")._id;

  const navigate = useNavigate();
  const handleEditCourse = (ID) => {
    setLocalStorage("courseID", ID);
    console.log("ID", ID);
    navigate("/editCourse", { state: ID });
  };

  //localhost:8000/api/getTeacherCourses
  useEffect(() => {
    // console.log("teacherID", teacherID);
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getTeacherCourses/${teacherID}`
        );
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [teacherID]);

  return (
    // <div className="page">
    <>
      <TeacherNavBar />
      <div className="body">
        <div className="m-5">
          <h2>Courses by Teacher</h2>
        </div>

        {/* <Accordion>
        {courses.map((course) => (
          <Accordion.Item eventKey={course._id}>
            <Accordion.Header className="bg-transparent">
              {course.title}
            </Accordion.Header>
            <Accordion.Body>
              <EditCourse course={course} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion> */}
        {courses.map((course) => (
          <div className="cardDisplay">
            {/* {course.subscriberOnly && ( */}
            <div
              className="card"
              style={{
                width: "30rem",

                border: "2px solid #16df70",
              }}
            >
              <div className="card-body">
                <div>
                  <h2 className="card-title">Title:{course.title}</h2>
                  <h5>{}</h5>
                </div>
                <h6 className="card-subtitle ">
                  {course.subscriberOnly ? "Subscriber Only" : "Public"}
                </h6>
                <p className="card-text">
                  {course.description.substring(0, 100)}
                </p>
                {/* <a
                  href=""
                  onClick={() => <EditCourse course={course} />}
                  className="card-link"
                >
                  Edit
                </a> */}
                <button
                  className="btn btn-outline-danger"
                  // onClick={handleEditCourse(course)}
                  onClick={() => handleEditCourse(course._id)}
                  style={{
                    width: "20%",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            {/*  )} */}
          </div>
        ))}
      </div>
    </>
  );
}

export default TeacherCourses;
