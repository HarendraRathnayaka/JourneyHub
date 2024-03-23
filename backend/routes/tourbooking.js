const router = require('express').Router();
let booking = require('../models/tourbooking');

// Add new booking
router.route('/add').post((req, res) => {
  
  const { clientId, tourId, startDate, noOfDays, noOfPeople, guideId, status, bookedDate } = req.body;

  const newBooking = new booking({
    clientId,
    tourId,
    startDate,
    noOfDays,
    noOfPeople,
    guideId,
    status,
    bookedDate
  });

  newBooking
    .save()
    .then(() => {
      res.json('New booking added');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error adding booking');
    });
});

// Get all bookings by client Id
router.route('/getByClientId/:clientId').get((req, res) => {
  const clientId = req.params.clientId;

  booking
    .find({ clientId: clientId })
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error fetching bookings');
    });
});

// Get a booking by client Id + booking Id
router.route('/get/:clientId/:bookingId').get((req, res) => {
  const clientId = req.params.clientId;
  const bookingId = req.params.bookingId;

  booking
    .findOne({ clientId: clientId, bookingId: bookingId })
    .then((booking) => {
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).send('Booking not found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error fetching booking');
    });
});

// Update a booking by client Id + booking Id
router.route('/update/:clientId/:bookingId').put(async (req, res) => {
  const clientId = req.params.clientId;
  const bookingId = req.params.bookingId;

  const { tourId, startDate, noOfDays, noOfPeople, guideId, status, bookedDate } = req.body;
  const updateBooking = {
    tourId,
    startDate,
    noOfDays,
    noOfPeople,
    guideId,
    status,
    fullPayment,
    bookedDate: Date.now() // Automatically updating bookedDate
    
  };

  booking
    .findOneAndUpdate({ clientId: clientId, bookingId: bookingId }, updateBooking, { new: true })
    .then((updatedBooking) => {
      if (updatedBooking) {
        res.json(updatedBooking);
      } else {
        res.status(404).send('Booking not found');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error updating booking');
    });
});

// Delete a booking by client Id + booking Id
router.route('/delete/:clientId/:bookingId').delete(async (req, res) => {
  const clientId = req.params.clientId;
  const bookingId = req.params.bookingId;

  booking
    .findOneAndDelete({ clientId: clientId, bookingId: bookingId })
    .then(() => {
      res.json('Booking deleted');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error deleting booking');
    });
});

module.exports = router;
