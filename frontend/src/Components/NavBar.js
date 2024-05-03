import logo from './logo.png';
import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation
import "../Styles/Navbar.css"; // Import your CSS file for Navbar styles

function Navbar() {
  return (
    
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/bookinglist" className="navbar-logo"><img
                src={logo} // Assuming you've imported your logo file
                width="110"
                height="110"
                className="d-inline-block align-top"
                alt="Toure Guide Logo" // Add alt text for accessibility
/>
          
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/create" className="navbar-link">
              Add a Booking
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/bookinglist" className="navbar-link">
              View Bookings
            </Link>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </div>
    </nav>
    
  
  );
  
}

export default Navbar;
