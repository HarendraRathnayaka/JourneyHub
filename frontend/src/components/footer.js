import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Import specific icons
import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h4>About Us</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            consectetur odio at magna lacinia, vel aliquet metus faucibus.
          </p>
        </div>
        <div className="footer-content">
          <h4>Contact Us</h4>
          <p>Email: example@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer-content">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <Link to="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link to="#">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link to="#">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Tour Guide App. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
