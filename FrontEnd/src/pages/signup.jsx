import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Courses from "./courses";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

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
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match");
    //   // print this error msg in the form

    //   return (
    //     <div className="p-3 mb-2 bg-dark text-white">
    //       <p>{error}</p>
    //     </div>
    //   );
    // }
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
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-3 mb-2 bg-dark text-white">
        <div className="container bg-red ">
          <br />
          <br />
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <div className="col-lg ">
              <h1>This is Sign Up Page</h1>
            </div>
          </div>
          <br />
          <br />
          <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className=" form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className=" form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div> */}
              {/* <div className="form-group">
        <label htmlFor="image">Choose a file</label>
        <input
          type="file"
          className="form-control-file"
          id="image"
          name="image"
          onChange={handleChange}
          required
        />
      </div> */}
              <div className=" form-group">
                <label htmlFor="userType">i am a </label>
                <select
                  className="form-control"
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

              <br />
              <br />
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <a href="/login">
                  <button
                    type="button"
                    className="btn btn-primary d-flex bg-transparent border-0 text-white ml-2 hover:text-red hover:bg-red-500"
                  >
                    Login
                  </button>
                </a>
                {/* <Nav.Link href="/login">Login</Nav.Link> */}
              </div>
            </form>
          </div>
        </div>

        <br />
        <br />
        <br />

        <br />
        <br />
        <br />

        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default SignUp;
