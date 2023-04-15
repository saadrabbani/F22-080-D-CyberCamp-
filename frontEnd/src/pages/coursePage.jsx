import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLocalStorage } from "../localSrorage/localStorage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import StudentNavBar from "../componrnts/navs/NavStudent";

const CoursePage = () => {
  const course = getLocalStorage("course");
  console.log("Course : ", course);
  const [currentLecture, setCurrentLecture] = useState(course.lectures[0]);
  console.log("Current Lecture : ", currentLecture);

  const handleLectureClick = (lecture) => {
    setCurrentLecture(lecture);
  };
  return (
    <>
      <StudentNavBar />
      <Container>
        {/* <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row> */}
        <Row xs={1} md={2}>
          <Col>
            <h2 className="course-title">
              {" "}
              <span>COURSE :___ </span>
              {course.title}
            </h2>
            <div className="video-frame">
              {
                <iframe
                  width="560"
                  height="315"
                  src={currentLecture}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              }
            </div>
            <h4 className="duration">Duration: {course.duration}</h4>
          </Col>
          <Col>
            <div className="lectures-column">
              <h4 className="lectures-title">Lectures:</h4>
            </div>
            <div className="lectures-list">
              {course.lectures.map((lecture) => (
                <button
                  key={lecture}
                  onClick={() => handleLectureClick(lecture)}
                  className="lecture-link"
                >
                  {lecture}
                </button>
              ))}
            </div>
          </Col>

          <p className="course-description">{course.description}</p>
        </Row>
        <div className="reading-materials-column">
          <h4 className="reading-materials-title">Reading Materials:</h4>
          <div className="reading-materials-list">
            {course.readingMaterials.map((material) => (
              <a key={material} className="reading-material-link">
                {material}
              </a>
            ))}
          </div>
        </div>
        <div className="assignments-column">
          <h4 className="assignments-title">Assignments:</h4>
          <div className="assignments-list">
            {course.assignments.map((assignment) => (
              <a key={assignment} href={assignment} className="assignment-link">
                {assignment}
              </a>
            ))}
          </div>
        </div>
        <div className="quizzes-column">
          <h4 className="quizzes-title">Quizzes:</h4>
          <div className="quizzes-list">
            {course.quizzes.map((quiz) => (
              <Link key={quiz} to={quiz} className="quiz-link">
                {quiz}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default CoursePage;
