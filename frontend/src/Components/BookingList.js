
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/BookingList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jsPDF from "jspdf";
import {
  faEdit,
  faTrash,
  faCancel,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8085/bookings/");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowUpdateForm(false); // Hide update form when a booking is clicked
  };

  const handleClosePopup = () => {
    setSelectedBooking(null);
  };

  const handleDeleteBooking = async (id) => {
    // Ask for confirmation before proceeding with deletion
    try {
      await axios.delete(`http://localhost:8085/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
      toast.success("Booking deleted successfully");
      setSelectedBooking(null); // Close the popup after deleting
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking");
    }
  };

  const handleUpdateBooking = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8085/bookings/${selectedBooking._id}`,
        updateFormData
      );
      // Update the state with the updated booking
      setBookings(
        bookings.map((booking) =>
          booking._id === response.data._id ? response.data : booking
        )
      );
      toast.success("Booking updated successfully");
      setShowUpdateForm(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Error updating booking");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Booking List", 10, 10);
    let y = 20;
    bookings.forEach((booking, index) => {
      doc.text(`Booking ${index + 1}`, 10, y);
      doc.text(`First Name: ${booking.firstName}`, 20, (y += 10));
      doc.text(`Last Name: ${booking.lastName}`, 20, (y += 5));
      doc.text(`Phone: ${booking.phone}`, 20, (y += 5));
      doc.text(
        `Departure Date: ${new Date(
          booking.departureDate
        ).toLocaleDateString('en-US')}`,
        20,
        (y += 5)
      );
      doc.text(
        `Return Date: ${new Date(booking.returnDate).toLocaleDateString('en-US')}`,
        20,
        (y += 5)
      );
      // Add more details as needed
      y += 10; // Increase vertical position for the next booking
    });
    doc.save("booking_list.pdf");
  };

  const filteredBookings = bookings.filter((booking) =>
    Object.values(booking).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="booking-list">
      <div className="booking-list-container">
       <br></br> 
       <br></br> 
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={generateReport}>
            <FontAwesomeIcon icon={faFilePdf} /> Generate Report
          </button>
        </div>
        
        <h1>Booking List</h1>
        <table className="booking-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Departure Date</th>
              <th>Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} onClick={() => handleBookingClick(booking)}>
                <td>{booking.firstName}</td>
                <td>{booking.lastName}</td>
                <td>{booking.phone}</td>
                <td>{new Date(booking.departureDate).toLocaleDateString('en-US')}</td>
                <td>{new Date(booking.returnDate).toLocaleDateString('en-US')}</td>
                <td>
                  <div className="buttons-container">
                    <button
                      className="updatebutton"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateFormData(booking); // Set form data with the clicked booking
                        setShowUpdateForm(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBooking(booking._id);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBooking && (
        <div className="popup retrew-form-modal">
          <div className="popup-content retrew-form-content">
            <h3>Booking Details</h3>
            <p>First Name: {selectedBooking.firstName}</p>
            <p>Last Name: {selectedBooking.lastName}</p>
            <p>Phone: {selectedBooking.phone}</p>
            <p>Email: {selectedBooking.email}</p>
            <p>Address: {selectedBooking.address}</p>
            <p>Departing From: {selectedBooking.departingFrom}</p>
            <p>Booking Date: {new Date(selectedBooking.bookedDate).toLocaleDateString('en-US')}</p>
            <p>Departure Date: {new Date(selectedBooking.departureDate).toLocaleDateString('en-US')}</p>
            <p>Return Date: {new Date(selectedBooking.returnDate).toLocaleDateString('en-US')}</p>
            <p>Guide Name: {selectedBooking.guideName}</p>
            <p>No. of Days: {selectedBooking.noOfDays}</p>
            <p>No. of People: {selectedBooking.noOfPeople}</p>
            <button className="popup-close" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      {showUpdateForm && (
        <div className="popup update-form-modal">
          <div className="popup-content update-form-content">
            <h3>Update Booking</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={updateFormData.firstName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={updateFormData.lastName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={updateFormData.phone || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updateFormData.email || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={updateFormData.address || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="departingFrom">Departing From:</label>
                <input
                  type="text"
                  id="departingFrom"
                  name="departingFrom"
                  value={updateFormData.departingFrom || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departureDate">Departure Date:</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={updateFormData.departureDate || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="returnDate">Return Date:</label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={updateFormData.returnDate || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="guideName">Guide Name:</label>
                <input
                  type="text"
                  id="guideName"
                  name="guideName"
                  value={updateFormData.guideName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="noOfDays">No. of Days:</label>
                <input
                  type="number"
                  id="noOfDays"
                  name="noOfDays"
                  value={updateFormData.noOfDays || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="noOfPeople">No. of People:</label>
                <input
                  type="number"
                  id="noOfPeople"
                  name="noOfPeople"
                  value={updateFormData.noOfPeople || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <button className="update-button" onClick={handleUpdateBooking}>
                <FontAwesomeIcon icon={faEdit} /> Update
              </button>
              <button onClick={() => setShowUpdateForm(false)}>
                <FontAwesomeIcon icon={faCancel} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingList;
