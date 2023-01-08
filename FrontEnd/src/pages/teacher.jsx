import React from "react";
import AddCourse from "./addCourse";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TeacherNavBar from "../componrnts/navs/NavTeacher";

const Teacher = () => {
  return (
    <>
      <TeacherNavBar />
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <h1>Teacher Dashboard </h1>
          </Col>
        </Row>

        <br />
        <br />
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <a href="/addCourse" className="btn btn-primary">
              Add Course
            </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Teacher;
