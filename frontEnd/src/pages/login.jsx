import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { SetAuthentication, isAuthenticated } from "../sessions/auth";
import NavBar from "../componrnts/navs/navbar_nav";
import UploadVideo from "./VideoUpload/UploadVideo";

import Footer from "../componrnts/footer/footer";
// import AddVideoPage from "./test/test";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios
        .post("http://localhost:8000/api/login", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          SetAuthentication(response.data.token, response.data.user);
          if (isAuthenticated() && isAuthenticated().userType === "student") {
            navigate("/paths");
          } else if (
            isAuthenticated() &&
            isAuthenticated().userType === "admin"
          ) {
            navigate("/admin");
          } else if (
            isAuthenticated() &&
            isAuthenticated().userType === "teacher"
          ) {
            navigate("/teacher");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="body">
        <h1 style={{ color: "#16df70" }}>Login</h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="exampleInputPassword1"></label>
            <input
              type="password"
              className="input"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="button ">
            Login
          </button>
        </form>
        <p className="">
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#16df70" }}>
            Signup
          </a>
        </p>
      </div>
      {/* render UploadVideo here */}
      {/* <UploadVideo /> */}
      {/* <AddVideoPage /> */}
      <Footer />
    </>
  );
};

export default Login;
