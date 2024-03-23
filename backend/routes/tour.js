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

router.route('/get/:tourId').get(async (req, res) => {
  const tourId = req.params.tourId;

  try {
    const foundTour = await tour.findOne({ tourId: tourId });
    if (foundTour) {
      res.json(foundTour);
    } else {
      res.status(404).send('Tour not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error fetching tour: ${error.message}`);
  }

});

module.exports = router;