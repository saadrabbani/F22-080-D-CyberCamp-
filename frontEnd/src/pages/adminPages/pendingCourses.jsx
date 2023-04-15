import React from "react";
// useEffect
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "../../sessions/cookies";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PendingCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [paths, setPaths] = React.useState([]);
  const handleApprove = async (courseID) => {
    // console.log(courseID);
    try {
      axios
        .put(`http://localhost:8000/api/approveCourse/${courseID}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("course Approved");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getPendingCourses = async () => {
    try {
      axios
        .get("http://localhost:8000/api/getPendingCourses", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // if response i 200 and list is empty
          //   if (res.status === 200 && res.data.length === 0) {
          //     alert("No Pending Courses");
          //     setLoading(false);
          //     navigate("/admin");
          //   }
          console.log(res.data);
          setCourses(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const getPaths = async () => {
    const authToken = getCookie("token");
    try {
      axios
        .get("http://localhost:8000/api/getAllPaths", {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        })

        .then((res) => {
          console.log(res.data);
          setPaths(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPendingCourses();
    getPaths();
  }, []);

  return (
    <>
      <div className="body">
        <div className="button">
          <h1 style={{ color: "#16df70" }}>Pending Courses</h1>
        </div>
        {courses.length === 0 ? (
          <h1
            style={{
              color: "yellow",
            }}
          >
            There are no Pending Courses...
          </h1>
        ) : (
          courses.map((course) => {
            return (
              <div className="accordion" id="accordionExample">
                <div className="">
                  <div className="">
                    <div
                      className="card"
                      style={{
                        width: "40rem",
                        margin: "10px",
                      }}
                    >
                      <div className="card-header">
                        <h1>{course.title}</h1>
                      </div>
                      <p>
                        {course.description.length > 300
                          ? course.description.substring(0, 300) + "..."
                          : course.description}
                      </p>
                      <p1
                        style={{
                          color: "red",
                        }}
                      >
                        By: {course.creatorName}
                      </p1>
                      <p1
                        style={{
                          color: "yellow",
                        }}
                      >
                        Path:{" "}
                        {paths.map((path) => {
                          if (path._id === course.pathId) {
                            return path.pathName;
                          }
                        })}
                      </p1>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleApprove(course._id)}
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default PendingCourses;
