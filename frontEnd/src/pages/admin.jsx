import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import { SetAuthentication, isAuthenticated } from "../sessions/auth";
import AdminNavBar from "../componrnts/navs/NavAdmin";

const Admin = () => {
  const navigate = useNavigate();
  const handleAddPath = () => {
    navigate("/addPath");
  };
  const handlePendingCourses = () => {
    navigate("/pendingCourses");
  };

  return (
    <>
      <AdminNavBar />
      <div className="body">
        <button className="btn btn-primary" onClick={handleAddPath}>
          Add Path
        </button>
        <br />
        <button className="btn btn-secondary" onClick={handlePendingCourses}>
          Pending Courses
        </button>
      </div>
    </>
  );
};

export default Admin;
