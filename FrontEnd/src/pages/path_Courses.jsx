import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/api";

import { useNavigate } from "react-router-dom";

const PathCourse = () => {
  const { pathId } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(
          axios.defaults.baseURL + '/findCourseByPathId/${pathId}'
        );
        if (response.status === 200) {
          setCourses(response.data);
        } else {
          console.log("Error in seding Token");
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [pathId]);

  return (
    <div>
      <h1>Courses for Path ID: {pathId}</h1>
      {courses.map((course) => (
        <div key={course._id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PathCourse;
