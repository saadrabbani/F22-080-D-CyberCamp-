import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { SetAuthentication, isAuthenticated } from "../sessions/auth";
import NavBar from "../componrnts/navs/navbar_nav";
// create coookies for login
// axios.defaults.withCredentials = true;
const Login = () => {
  // const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [response, setResponse] = useState([]);
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
      // if (response.status === 200) {
      //   setError("");
      //   // navigate("/paths");
      // } else {
      //   setError(response.data);
      // }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-3 mb-2 bg-dark text-white">
        <div className="container bg-red">
          <div className="d-flex justify-content-center">
            <div className="col-lg">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1>This is Login Page</h1>
              <br />
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-group  ">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div> */}
                <br />
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary ">
                    Submit
                  </button>
                  <ul className="nav">
                    <li className="nav-item">
                      <a className="nav-link active" href="/signup">
                        Sign Up
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Login;
