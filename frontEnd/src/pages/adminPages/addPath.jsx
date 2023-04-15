import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "../../api/api";
import { useState, useContext } from "react";
// import { SetAuthentication, isAuthenticated } from "../../sessions/auth";
import AdminNavBar from "../../componrnts/navs/NavAdmin";
// create coookies for login
// axios.defaults.withCredentials = true;
const AddPath = () => {
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
        .post("http://localhost:8000/api/addPath", formData, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            alert("Path Addes Successfully");
            navigate("/admin");
          }
          if (response.status === 300) {
            alert("Path aleady Exist");
          }
        })
        .catch((err) => {
          alert("Server Error Occured");
          console.log(err);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="body">
        <form>
          <div className="form-group">
            <label htmlFor="pathName">Path Name</label>
            <input
              type="text"
              className="form-control"
              id="pathName"
              name="pathName"
              value={formData.pathName}
              onChange={handleChange}
              placeholder="Enter Path Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPath;
