import React from "react";
import "./style.css";
import logo from "./CyberCampLogo.png";

const Footer = () => {
  return (
    <footer>
      <div className="rowf">
        <div className="columnf">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="columnf">
          <h4>Company Name</h4>
          <img src={logo} alt="Company Logo" className="logo" />
        </div>
        <div className="columnf">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> 1234 Main Street, City,
              State Zip Code
            </li>
            <li>
              <i className="fas fa-phone"></i> 123-456-7890
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@company.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
