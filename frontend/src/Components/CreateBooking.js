import React, { useState } from "react";
import axios from "axios";
import "../Styles/Createbooking.css";
import { toast } from "react-toastify";
import logo from './logo.png';

function CreateBooking() {
  const [formData, setFormData] = useState({
    bookedDate: new Date().toISOString().slice(0, 10),
    noOfDays: "",
    noOfPeople: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    departingFrom: "",
    departureDate: "",
    returnDate: "",
    guideName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8085/bookings",
        formData
      );

      toast.success("Your Booking has been created successfully!");
      console.log(response.data);
      // Handle success or redirect
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("An error occurred while processing your request.");
      // Handle error
    } finally {
    }
  };

  return (
    
    <div className="create-booking-container">
      <h2>Create Booking</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="bookedDate">
              Booked Date:
            </label>
            <input
              className="form-input-date"
              type="date"
              id="bookedDate"
              name="bookedDate"
              value={formData.bookedDate}
              onChange={handleChange}
              max={new Date().toISOString().slice(0, 10)} // Set max to current date
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="noOfDays">
              Number of Days:
            </label>
            <input
              className="form-input-number"
              type="number"
              id="noOfDays"
              name="noOfDays"
              value={formData.noOfDays}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="noOfPeople">
              Number of People:
            </label>
            <input
              className="form-input-number"
              type="number"
              id="noOfPeople"
              name="noOfPeople"
              value={formData.noOfPeople}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="form-input-text"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="form-input-text"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone:
            </label>
            <input
              className="form-input-phone"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-input-email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="address">
              Address:
            </label>
            <input
              className="form-input-text"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="departingFrom">
              Departing From:
            </label>
            <input
              className="form-input-text"
              type="text"
              id="departingFrom"
              name="departingFrom"
              value={formData.departingFrom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="departureDate">
              Departure Date:
            </label>
            <input
              className="form-input-date"
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 10)} // Set min to current date
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="returnDate">
              Return Date:
            </label>
            <input
              className="form-input-date"
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 10)} // Set min to current date
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="guideName">
              Guide Name:
            </label>
            <input
              className="form-input-text"
              type="text"
              id="guideName"
              name="guideName"
              value={formData.guideName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
<div>
       {/* Footer */}
 <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Your Logo" />
          </div>
          <div className="footer-social-links">
            <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/your_facebook" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>

    
  );
}

export default CreateBooking;
