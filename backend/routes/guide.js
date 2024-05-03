const router = require('express').Router();
let Guide = require('../model/guideModel');

router.get('/', (req, res) => {
    Guide.find()
    .then(userguide => res.json(userguide))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Guide.findById(req.params.id)
    .then(userguide => res.json(userguide))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
    const newGuide = new Guide({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        phone: req.body.phone,
        gender: req.body.gender,
        language: req.body.language,
        image: req.body.image // Add image field
    });

    newGuide.save()
    .then(() => res.json("New Guide Added"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    Guide.findByIdAndDelete(req.params.id)
    .then(() => res.json("Guide Details Deleted"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:id', (req, res) => {
    Guide.findByIdAndUpdate(req.params.id,
        { $set: req.body })
    .then(() => res.json("Guide Details Updated"))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
