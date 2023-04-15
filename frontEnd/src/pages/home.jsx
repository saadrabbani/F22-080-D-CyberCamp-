import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../componrnts/navs/navbar_nav";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";

import Footer from "../componrnts/footer/footer";

const Home = () => {
  const logo = "http://141.145.196.28:8000/logo.png";
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="bg">
        <div className="body1">
          <div className="container">
            <img src={logo} width="200" alt="Company Logo" className="logo" />
            <h1 style={{ color: "#16df70" }}>Welcome to CyberCamp</h1>

            <div className="">
              <br />
              <br />
              <p>
                Welcome to CyberCamp! Our education website is dedicated to
                providing top-quality CyberSecurity training to students and
                professionals looking to enhance their skills in this important
                and rapidly-growing field. We offer a wide range of course
                materials, including lectures, interactive exercises, and labs
                hosted on the cloud, to give you the opportunity to learn and
                practice what you've learned in a real-world setting. Whether
                you're just starting out in CyberSecurity or are a seasoned
                professional looking to stay up-to-date on the latest threats
                and best practices, CyberCamp has something for you.
              </p>
              {/* // add button with onClick to go to login page */}
              {/* <Button `onClick={handleClick}`>Login</Button> */}
              <a href="login">
                <button className="button">Login</button>
              </a>
              <a href="signup">
                <button className="button">Signup</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

{
  /* <a class="btn btn-primary btn-lg" href="login" role="button">
  Login
</a>; */
}
