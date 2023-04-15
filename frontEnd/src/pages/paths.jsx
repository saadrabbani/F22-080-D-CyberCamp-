import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../sessions/cookies";
import { isAuthenticated, setPathId } from "../sessions/auth";
import StudentNavBar from "../componrnts/navs/NavStudent";

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
      <div className="p-3 mb-2 bg-dark text-white">
        <div className="col-lg">
          <br />
          <br />
          <h1> All Paths </h1>
          {isError !== "" && <h2>{isError}</h2>}
          {/* {isError !== "" && <h2> Shamshad</h2>} */}
        </div>
        <div ClassName="container">
          <div className="row g-2 align-items-center ">
            {paths.map((path) => (
              <div key={path._id}>
                {/* //   <div className="row d-flex"> */}
                <div
                  className="card bg-transparent border m-2 bh-blurred "
                  style={{ width: "18rem" }}
                >
                  <div className="card-body ">
                    <h5 className="card-title">{path.pathName}</h5>
                    <p className="card-text">{path.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleExploreClick(path._id)}
                    >
                      Explore
                    </button>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Paths;
