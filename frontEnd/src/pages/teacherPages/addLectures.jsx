import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/api";
import { getLocalStorage } from "../../localSrorage/localStorage";

import { isAuthenticated } from "../../sessions/auth";
import TeacherNavBar from "../../componrnts/navs/NavTeacher";
import UploadVideo from "../VideoUpload/UploadVideo";

const AddLectures = (props) => {
  // const courseId = window.location.pathname.split("/")[2];
  const courseId = getLocalStorage("courseID");
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [isError, setIsError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const teacher = isAuthenticated();
  const [formData, setFormData] = useState({});

  const handleUpload = (event) => {
    event.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", video);
    console.log(formData);

    axios
      .post("http://localhost:8000/api/uploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      })
      .then((response) => {
        console.log(response);
        alert("Video uploaded successfully!");
        setTitle("");
        setDescription("");
        setVideo(null);
        setUploading(false);
        //   append response.data.videoID to lectures
        setLectures([...lectures, response.data.videoID]);

        // console.log("on Component", response.data);
        // console.log("Setting Props");
        // props.setVideo(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error uploading video!");
        setUploading(false);
      });
  };

  useEffect(() => {
    // getAllPaths();
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
    } catch (error) {
      setError(error.message);
    }
  };
  const addLecture = (e) => {
    e.preventDefault();
    setLectures([...lectures, { lectureName: "" }]);
  };
  const removeLecture = (index) => {
    const list = [...lectures];
    list.splice(index, 1);
    setLectures(list);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...lectures];
    list[index][name] = value;
    setLectures(list);
  };

  return (
    <>
      <TeacherNavBar />

      <div className="body">
        <UploadVideo />
        {/* <h1 style={{ color: "#16df70" }}>Add Lectures</h1>
         <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="form-group">
            {lectures.map((lecture) => (
              <div className="form-group">
                <div>
                  <input
                    className="input"
                    placeholder="Title"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    className="input"
                    placeholder="Description"
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    placeholder="Video"
                    className="input"
                    id="video"
                    accept="video/mp4"
                    onChange={(event) => setVideo(event.target.files[0])}
                  />
                </div>
                <button
                  onClick={handleUpload}
                  className="button"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            ))}
          </div>
          <div>
            <button className="button" onClick={addLecture}>
              addLecture
            </button>
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form> */}
      </div>
    </>
  );
};

export default AddLectures;
