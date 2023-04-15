import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../componrnts/navs/NavStudent";
import axios from "axios";
import { isAuthenticated, setPathId } from "../sessions/auth";
import { getLocalStorage } from "../localSrorage/localStorage";
import { setLocalStorage } from "../localSrorage/localStorage";
import FileBase64 from "react-file-base64";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    files: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fetchStudentData = () => {
    if (!isAuthenticated() || isAuthenticated().userType !== "student") {
      navigate("/login");
    }
    const user = getLocalStorage("user");
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      files: [],
    });
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const validate = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(formData.email)) {
      setError("Email is invalid");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      const user = getLocalStorage("user");
      if (user.name === formData.name && user.email === formData.email) {
        // setError("Please update your profile before submitting");
        alert("Please update your profile before submitting");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/putStudentProfile",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
        };
        setLocalStorage("user", updatedUser);
        // setSuccess(true);
        alert("Profile Updated Successfully");
      } else {
        setError("Failed to update student data");
      }
    } catch (error) {
      setError(error.message);
      console.log("Api 2 is not called");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files) => {
    setFormData({ ...formData, files });
  };

  return (
    <>
      <NavBar />
      <div className="body">
        <div className="container">
          <h1 style={{ color: "#16df70" }}>Student Profile</h1>
          <div className="profile-image">
            <div className="image-container">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="profile-picture"
              />
              <div className="edit-button">
                <button type="button">
                  <i className="fa fa-pencil"></i>
                </button>
              </div>
              <FileBase64
                multiple={true}
                onDone={({ base64 }) => setFormData}
              />
            </div>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="App">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  Profile updated successfully
                </div>
              )}
              <label htmlFor="name"></label>
              <input
                type="text"
                className="input"
                id="name"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="email"></label>
              <input
                type="email"
                className="input"
                id="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <p>
                <a style={{ color: "rgb(22,223,112)" }} href="/change-password">
                  Change Password
                </a>
              </p>
              <button type="submit" className="button">
                Update Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
export default StudentProfile;
