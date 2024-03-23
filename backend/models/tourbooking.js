const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  
  clientId: {
    type: Number,
    required: true,
  },
  bookingId: {
    type: Number,
    required: true,
    unique: true,
    default: 0,
  },
  tourId: {
    type: Number,
    required: true,
  },
  guideId: {
    type: Number,
    required: true,
  },
  bookedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  startDate: {
    type: Date,
    required: true,
  },
  noOfDays: {
    type: Number,
    required: true,
  },
  noOfPeople: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending"
  }

});

autoIncrement.initialize(mongoose.connection);
bookingSchema.plugin(autoIncrement.plugin, {
  model: 'bookings',
  field: 'bookingId',
  startAt: 1,
  incrementBy: 1,
});

const booking = mongoose.model('bookings', bookingSchema);

module.exports = booking;
