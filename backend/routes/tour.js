const router = require('express').Router();
let tour = require('../models/tour.js');

// Add new tour
router.route('/add').post((req, res) => {
  
  const { tourName, pricePerPerson, pricePerDay } = req.body;

  const newTour = new tour({
    tourName,
    pricePerPerson,
    pricePerDay
  });

  newTour
    .save()
    .then(() => {
      res.json('New tour added');
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('Error adding tour');
    });

});

module.exports = router;