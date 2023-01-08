import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../api/api";

import { getCookie } from "../sessions/cookies";
import { isAuthenticated } from "../sessions/auth";
import TeacherNavBar from "../componrnts/navs/NavTeacher";

const AddCourse = () => {
  const navigate = useNavigate();

  const teacher = isAuthenticated();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    // Lectures is a array of links
    lectures: [],
    // readingMaterials is a array of files
    readingMaterials: [],
    // assignments is a array of files
    assignments: [],
    // quizzes is a array of links
    quizzes: [],
    subscriberOnly: "",
    creatorName: teacher.name,
    creatorId: teacher._id,
    status: "Pending_Approval",
    pathId: "",
  });

  const [paths, setPaths] = useState([]);
  const [isError, setIsError] = useState("");

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
        // navigate("/student");
      } else {
        setIsError(response.data);
        console.log("Error in seding Token");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addLecture = () => {
    setFormData({
      ...formData,
      lectures: [...formData.lectures, ""],
    });
  };

  const addReadingMaterial = () => {
    setFormData({
      ...formData,
      readingMaterials: [...formData.readingMaterials, ""],
    });
  };

  const addAssignment = () => {
    setFormData({
      ...formData,
      assignments: [...formData.assignments, ""],
    });
  };

  const addQuiz = () => {
    setFormData({
      ...formData,
      quizzes: [...formData.quizzes, ""],
    });
  };

  const handleLectureChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...formData.lectures];
    list[index] = value;
    setFormData({
      ...formData,
      lectures: list,
    });
  };

  useEffect(() => {
    getAllPaths();
  }, []);

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
        navigate("/teacher");
      } else {
        setIsError(response.data);
        console.log("Error in seding Token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TeacherNavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center">Add Course</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  className="form-control"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lectures">Lectures</label>
                {formData.lectures.map((lecture, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`lecture-${index}`}
                    value={lecture}
                    onChange={(e) => handleLectureChange(e, index)}
                  />
                ))}
                <button type="button" onClick={addLecture}>
                  Add Lecture
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="readingMaterials">Reading Materials</label>
                <input
                  type="text"
                  className="form-control"
                  id="readingMaterials"
                  name="readingMaterials"
                  value={formData.readingMaterials}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignments">Assignments</label>
                <input
                  type="text"
                  className="form-control"
                  id="assignments"
                  name="assignments"
                  value={formData.assignments}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quizzes">Quizzes</label>
                <input
                  type="text"
                  className="form-control"
                  id="quizzes"
                  name="quizzes"
                  value={formData.quizzes}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subscriberOnly">Subscriber Only</label>
                <select
                  className="form-control"
                  id="subscriberOnly"
                  name="subscriberOnly"
                  value={formData.subscriberOnly}
                  onChange={handleChange}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              {/* <div className="form-group">
              <label htmlFor="creatorName">Creator Name</label>
              <input
                type="text"
                className="form-control"
                id="creatorName"
                name="creatorName"
                value={formData.creatorName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="creatorId">Creator Id</label>
              <input
                type="text"
                className="form-control"
                id="creatorId"
                name="creatorId"
                value={formData.creatorId}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div> */}
              <div className="form-group">
                <label htmlFor="pathId">Path Id</label>
                <select
                  type="text"
                  bg-dark
                  className="form-control"
                  id="pathId"
                  name="pathId"
                  value={formData.pathId}
                  onChange={handleChange}
                >
                  <option value="">Select Path</option>
                  {paths.map((path) => (
                    <option key={path._id} value={path._id} text-black>
                      {path.title}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
