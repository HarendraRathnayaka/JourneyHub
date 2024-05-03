import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./Components/NavBar";
import CreateBooking from "./Components/CreateBooking";
import BookingsList from "./Components/BookingList";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div>
        <Navbar />
        <Routes>
          <Route path="/bookinglist" element={<BookingsList />} />
          <Route path="/create" element={<CreateBooking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;