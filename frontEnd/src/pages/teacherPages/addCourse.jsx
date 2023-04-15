import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/api";

import { getCookie } from "../../sessions/cookies";
import { isAuthenticated } from "../../sessions/auth";
import TeacherNavBar from "../../componrnts/navs/NavTeacher";
import { setLocalStorage } from "../../localSrorage/localStorage";
const AddCourse = () => {
  const navigate = useNavigate();
  const [paths, setPaths] = useState([]);
  const [isError, setIsError] = useState("");

  const teacher = isAuthenticated();
  const [formData, setFormData] = useState({
    title: "",
    description: "",

    subscriberOnly: "",
    creatorName: teacher.name,
    creatorId: teacher._id,
    pathId: null,
  });

  // paths
  // using Async Await
  const getAllPaths = async () => {
    try {
      if (!teacher || teacher.userType !== "teacher") {
        navigate("/login");
      }
      const authToken = getCookie("token");
      const response = await axios.get(
        "http://localhost:8000/api/getAllPaths",
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      if (response.status === 200) {
        setIsError("");
        setPaths(response.data);
        console.log(response.data);
        // response.data.map((path) => console.log(path._id));
        // navigate("/student");
      } else {
        setIsError(response.data);
        console.log("Error in seding Token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPaths();
  }, []);

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addCourse",
        formData
      );
      if (response.status === 200) {
        setIsError("");
        // console.log(response.data._id);
        setLocalStorage("courseID", response.data._id);
        navigate("/addLectures/", { courseId: response.data._id });
      } else {
        setIsError(response.data);
        console.log("Error in seding Token");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <TeacherNavBar />
      <div className="body">
        <h1 style={{ color: "#16df70" }}>Add Course</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <input
            type="text"
            className="input "
            id="title"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
            style={{
              width: "80%",
              height: "40px",
            }}
          />
          <div className="form-group">
            {/* <label htmlFor="description">Description</label> */}
            <textarea
              type="text"
              className="input height: 100px;"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "80%",
                height: "130px",
                border: "1px solid #16df70",
              }}
              placeholder="Description"
            />
          </div>

          <div className="form-group">
            <select
              className="input"
              id="subscriberOnly"
              name="subscriberOnly"
              placeholder="Subscriber Only"
              value={formData.subscriberOnly}
              onChange={handleChange}
              style={{
                width: "80%",
                height: "60px",
              }}
            >
              <option> only for SUBSCRIBERS ?</option>
              <option value="true">yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-group">
            <select
              className="input"
              id="pathId"
              name="pathId"
              value={formData.pathId}
              onChange={handleChange}
              required
              style={{
                width: "80%",
                height: "60px",
              }}
            >
              <option>Select The Path</option>
              {paths.map((path) => (
                <option value={path._id}>{path.pathName}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
