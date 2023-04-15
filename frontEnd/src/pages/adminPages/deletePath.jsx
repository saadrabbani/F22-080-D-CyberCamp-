import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";
import { useState, useContext } from "react";
import { SetAuthentication, isAuthenticated } from "../../sessions/auth";
import AdminNavBar from "../../componrnts/navs/NavAdmin";
// create coookies for login
// axios.defaults.withCredentials = true;
const DeletePath = () => {
  // const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pathName: "",
    description: "",
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
        .post("http://localhost:8000/api/deletePath", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            alert("Path Deleted Successfully");
            navigate("/admin");
          }
          if (response.status === 300) {
            alert("Path Name doesn't Exist");
          }
        })
        .catch((err) => {
          alert("Path Name doesn't Exist");
          console.log(err);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="p-3 mb-2 bg-dark text-white">
        <div className="container">
          <div className=" d-flex justify-content-center">
            <div className="col-lg">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1> Delete Path</h1>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-lg">
              <br />
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-group  ">
                  <label htmlFor="email">Path Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="pathName"
                    placeholder="Enter Path Name"
                    name="pathName"
                    value={formData.pathName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Description</label>
                  <textarea
                    type="description"
                    className="form-control"
                    id="description"
                    placeholder="Path Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <br />
                <div className=" d-flex justify-content-center">
                  <div className="col-lg">
                    <button type="submit" className="btn btn-outline-danger ">
                      Delete Path
                    </button>
                  </div>
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
        <br />
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

export default DeletePath;
