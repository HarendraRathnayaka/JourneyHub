const mongoose = require("mongoose");
//data added
const bookingSchema = new mongoose.Schema({
  bookedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  noOfDays: {
    type: Number,
    required: true,
  },
  noOfPeople: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  departingFrom: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  guideName: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
