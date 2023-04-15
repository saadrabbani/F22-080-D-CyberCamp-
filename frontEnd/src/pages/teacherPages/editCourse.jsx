import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/api";

import { getCookie } from "../../sessions/cookies";
import { isAuthenticated } from "../../sessions/auth";
import TeacherNavBar from "../../componrnts/navs/NavTeacher";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../localSrorage/localStorage";
import UploadVideo from "../VideoUpload/UploadVideo";

const EditCourse = (props) => {
  const courseID = getLocalStorage("courseID");
  const navigate = useNavigate();
  const [editLecture, setEditLectures] = useState(false);

  const [error, setError] = useState("");
  const [editable, setEditable] = useState(true);

  const teacher = isAuthenticated();
  const [formData, setFormData] = useState("");
  const [lectures, setLectures] = useState({
    title: "",
    description: "",
    video: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setEditable(false);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/updateCourse/${courseID}`,
        formData
      );
      if (response.status === 200) {
        console.log("Course Updated", response.data);
        setFormData(response.data);
        setEditable(true);
        setLocalStorage("courseID", response.data._id);
      } else {
        console.log("Error status fron API", response.status);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const getCourse = async (e) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getCourse/${courseID}`
      );
      console.log("response", response.data);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddLecture = () => {
    navigate("/addLectures");
  };
  const handleDelete = (index) => {
    console.log("index", index);
    const newItems = [...formData.lectures];
    const videoID = newItems[index].video;
    try {
      axios.delete(
        `http://localhost:8000/api/deleteVideo/${videoID}/${courseID}`
      );
    } catch (error) {
      console.log(error);
    }

    newItems.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      lectures: newItems,
    }));
  };
  // const handleEditLecture = () => {
  //   lectures.title = getLocalStorage("videoTitle");
  //   lectures.description = getLocalStorage("videoDescription");
  //   lectures.video = getLocalStorage("videoID");
  //   console.log("lectures", lectures);
  //   if (lectures.title && lectures.description && lectures.video) {
  //     const newItems = [...formData.lectures];
  //     newItems.push(lectures);
  //     setFormData((prev) => ({
  //       ...prev,
  //       lectures: newItems,
  //     }));

  //     // setLocalStorage("videoTitle", "");
  //     // setLocalStorage("videoDescription", "");
  //     // setLocalStorage("videoID", "");
  //   }

  //   console.log("formData", formData);
  // };

  const handleEditLecture = () => {
    setEditLectures(true);
    console.log("editLecture", editLecture);
  };
  const saveLectures = () => {
    setEditLectures(false);
    handleSubmit();
    console.log("editLecture", editLecture);
  };
  const handleAddReadingMaterial = () => {
    navigate("/readingMaterial");
  };

  useEffect(() => {
    getCourse();
    // handleEditLecture();
    // handleSubmit();
    // setLectures(formData.lectures);

    console.log("courseID", courseID);
  }, [courseID]);

  return (
    <>
      <TeacherNavBar />
      {/* <ListWithDeleteButton /> */}
      <div className="page">
        <div
          className="cardActive "
          style={
            {
              // width: "30rem",
            }
          }
        >
          <div className="card-header">
            Title:
            <input
              type="text"
              disabled={editable}
              className="EditableInput"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <p className="">
              Description:
              <textarea
                type="text"
                disabled={editable}
                className="EditableInput"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  height: "200px",
                  fontSize: "16px",
                  textAlign: "left",
                }}
              />
            </p>
            {/* <h5 className="card-title" style={{ color: "yellow" }}> */}
            {/* {formData.subscriberOnly ? "Subscriber Only" : "Free"} */}
            <p>
              Subscriber Only:
              <select
                disabled={editable}
                className="EditableInput"
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
                <option value="true">yes</option>
                <option value="false">No</option>
              </select>
            </p>
            {/* </h5> */}
            <a
              className="btn btn-outline-danger"
              onClick={handleEdit}
              style={{ display: editable ? "" : "none" }}
            >
              Edit
            </a>
            {!editable ? (
              <a className="m-3 btn btn-success" onClick={handleSubmit}>
                Save
              </a>
            ) : null}
          </div>
          <div className="card-footer text-muted"></div>
        </div>
        <div style={{}}>
          <h2>Lectures</h2>
          {formData.lectures ? (
            <ul>
              {formData.lectures.map((lecture, index) => (
                <li key={index}>
                  {/* {lecture.title} {lecture.description}
                  <button onClick={() => handleDelete(index)}>Delete</button> */}
                  <div class="accordion">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          {lecture.title}
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <div className="row">
                            <div className="column1">
                              <strong>Description:</strong>
                              <br />
                              {lecture.description}
                            </div>
                            <div className="column2">
                              {" "}
                              {/* {
                                <button
                                  className="btn btn-success"
                                  style={{
                                    backgroundColor: "#164321",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                  }}
                                >
                                  edit
                                </button>
                              } */}
                              {"      "}
                              {editLecture ? (
                                <button
                                  className="btn btn-danger"
                                  style={{
                                    // make it to right of div
                                    // position: "absolute",
                                    // right: "0",
                                    color: "white",
                                  }}
                                  onClick={() => handleDelete(index)}
                                >
                                  delete
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <button
            className="btn btn-danger"
            onClick={handleAddLecture}
            style={{
              margin: "5px",
              display: editLecture ? "none" : "",
            }}
          >
            Add Lecture
          </button>

          <button
            className="btn btn-warning"
            onClick={handleEditLecture}
            style={{
              margin: "5px",
              display: editLecture ? "none" : "",
            }}
          >
            Edit Lecture
          </button>
        </div>
        {
          <button
            className="btn btn-success"
            onClick={() => {
              saveLectures();
            }}
            style={{
              margin: "5px",
              display: editLecture ? "" : "none",
            }}
          >
            Save
          </button>
        }
        <div>
          <h2> Reading Material</h2>
          <button
            className="btn btn-primary"
            onClick={handleAddReadingMaterial}
            style={{
              margin: "5px",
              display: editLecture ? "none" : "",
            }}
          >
            Add Reading Matrial
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
