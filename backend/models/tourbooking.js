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
  tour: {
    type: String,
    required: true,
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
  }


});

autoIncrement.initialize(mongoose.connection);
guideSchema.plugin(autoIncrement.plugin, {
  model: 'bookings',
  field: 'bookingId',
  startAt: 1,
  incrementBy: 1,
});

const booking = mongoose.model('bookings', bookingSchema);

module.exports = booking;
