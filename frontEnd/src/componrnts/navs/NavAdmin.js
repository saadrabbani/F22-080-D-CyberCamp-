import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

function AdminNavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <img
          src="http://141.145.196.28:8000/logo.png"
          width="50"
          alt="Company Logo"
          className="logo"
        />
        <Navbar.Brand href="/">
          {/* <Image
            src="CyberCampLogo.png"
            alt="CyberCamp Logo"
            width={30}
            height={30}
            className="d-inline-block align-top"
          />{" "} */}
          CyberCamp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Nav.Link href="/addPath">Add Path</Nav.Link>
            <Nav.Link href="/updatePath">Update path</Nav.Link>
            <Nav.Link href="/deletePath">Delete Path</Nav.Link>
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
