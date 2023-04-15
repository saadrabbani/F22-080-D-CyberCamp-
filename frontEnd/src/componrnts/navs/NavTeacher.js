import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

function TeacherNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <img
          src="http://141.145.196.28:8000/logo.png"
          width="50"
          alt="Company Logo"
          className="logo"
        />
        <Navbar.Brand href="/">CyberCamp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Nav.Link href="/addCourse">addCourse</Nav.Link>
            
            <Nav.Link href="/teacher">Dashboard</Nav.Link>
            {/* teacherProfile */}
            <Nav.Link href="/teacherProfile">Profile</Nav.Link>
            
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TeacherNavBar;
