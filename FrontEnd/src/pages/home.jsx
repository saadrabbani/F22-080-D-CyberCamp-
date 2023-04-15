import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../componrnts/navs/navbar_nav";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="">
        <div className="p-3 mb-2 bg-dark text-white">
          <br />
          <br />
          <br />
          <br />
          <div className=" d-flex justify-content-center">
            <h1>Welcome to CyberCamp</h1>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className=" d-flex justify-content-center">
            <p>
              Welcome to CyberCamp! Our education website is dedicated to
              providing top-quality CyberSecurity training to students and
              professionals looking to enhance their skills in this important
              and rapidly-growing field. We offer a wide range of course
              materials, including lectures, interactive exercises, and labs
              hosted on the cloud, to give you the opportunity to learn and
              practice what you've learned in a real-world setting. Whether
              you're just starting out in CyberSecurity or are a seasoned
              professional looking to stay up-to-date on the latest threats and
              best practices, CyberCamp has something for you.
            </p>
          </div>
          <div className=" d-flex justify-content-center">
            <a class="btn btn-primary btn-md" href="login" role="button">
              Login
            </a>
            {/* <div className="d-grid gap-2">
              <Button variant="primary" size="md">
                Login
              </Button>
            </div> */}
          </div>
          <br />
          <div className=" d-flex justify-content-center">
            <a href="signup">
              <Button variant="secondary" size="md">
                Signup
              </Button>
            </a>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Home;

{
  /* <a class="btn btn-primary btn-lg" href="login" role="button">
  Login
</a>; */
}
