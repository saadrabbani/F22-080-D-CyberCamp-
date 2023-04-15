import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Courses from "./courses";
import { useNavigate } from "react-router-dom";
import NavBar from "../componrnts/navs/navbar_nav";

import Footer from "../componrnts/footer/footer";

import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // image: "",
    userType: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );
      if (response.status === 200) {
        navigate("/login");

        // Redirect to login page or show a success message
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.log(error);
    } catch (error) {
      setError(error.message);
      // console.log(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="body">
        <div className="container">
          <h1 style={{ color: "#16df70" }}>SignUp</h1>

          <form onSubmit={handleSubmit} className="">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div>
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
            </div>
            <div>
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
            <div>
              <label htmlFor="userType"></label>
              <select
                className="input"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <div>
              <button type="submit" className="button ">
                SignUp
              </button>
            </div>
          </form>
          <p className="">
            Have an account?{" "}
            <a href="/login" style={{ color: "#16df70" }}>
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
