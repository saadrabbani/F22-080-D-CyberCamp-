import React from "react";
import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../sessions/cookies";
import { isAuthenticated, setPathId } from "../sessions/auth";
import StudentNavBar from "../componrnts/navs/NavStudent";

import Footer from "../componrnts/footer/footer";

const Paths = () => {
  const [paths, setPaths] = useState([]);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleExploreClick = (pathId) => {
    setPathId(pathId);
    navigate(`/courses`);
  };

  const getAllPaths = async () => {
    try {
      if (!isAuthenticated() || isAuthenticated().userType !== "student") {
        navigate("/login");
      }
      const authToken = getCookie("token");
      console.log("calling getAllPaths with token: ", authToken);
      const response = await axios
        .get(axios.defaults.baseURL + "/getAllPaths", {
          headers: {
            // Authorization
            Authorization: authToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          setPaths(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      setIsError("Api is not being executed ");
      console.log(error.message);
      // navigate("/login");
    }
  };

  // http://localhost:8000
  // NOTE:  calling the function

  useEffect(() => {
    getAllPaths();
  }, []);

  return (
    <>
      <StudentNavBar />
      <div className="body">
        <div className="centered text-white">
          <h1>Paths</h1>
        </div>
        <div className="grid-container">
          {paths.map((path) => (
            <div key={path._id}>
              {/* <div className="accordion" id="accordionExample"> */}
              <div
                className="card "
                style={{
                  width: "30rem",
                }}
              >
                <div className="card-Container">
                  <h4 className="card-header " style={{ color: "#16df70" }}>
                    {path.pathName}
                  </h4>
                  <p className="card-text">
                    {path.description.length > 250
                      ? path.description.substring(0, 250) + "..."
                      : path.description}
                  </p>
                  <button
                    className="button"
                    onClick={() => handleExploreClick(path._id)}
                  >
                    Explore
                  </button>
                </div>
              </div>
              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Paths;
