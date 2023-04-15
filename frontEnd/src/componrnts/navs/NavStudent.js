import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// import NavDropdown from "react-bootstrap/NavDropdown";

function StudentNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <img
          src="http://141.145.196.28:8000/logo.png"
          width="50"
          alt="Company Logo"
          className="logo"
        />
        {/* add navbar png */}
        {/* <img
          src="../../logos/cyberCamp.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="LOGO"
        /> */}

        <Navbar.Brand href="/">CyberCamp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Nav.Link href="/subscribe">Join Membership</Nav.Link>
            <Nav.Link href="/myEnrollments">MyEnrollments</Nav.Link>
            {/* studentProfile */}
            <Nav.Link href="/studentProfile">Profile</Nav.Link>
            
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StudentNavBar;
