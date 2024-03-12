const router = require('express').Router();
let guide = require('../models/tourguide');


//add new data
router.route("/add").post((req, res) => {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const age = req.body.age;
    const phoneNo = req.body.phoneNo;
    const gender = req.body.gender;
    const language = req.body.language;
   
    const newGuide = new guide({
        
        firstName,
        lastName,
        email,
        age,
        phoneNo, 
        gender, 
        language    
    })

    newGuide.save().then(() => {
        res.json("New guide added"); //give a response from json format
    }).catch((err) => {
        console.log(err);
    })

})


//fetch data
router.route('/').get((req, res) => {
    guide
    .find()
    .then((guide) => {
      res.json(guide);
    })
    .catch((err) => {
      console.log(err);
    });
});


//update data
router.route('/update/:id').put(async (req, res) => {

  let Id = req.params.id;

  const { firstName, lastName, email, age, phoneNo, gender, language } = req.body; 
  const updateGuide = {
    firstName,
    lastName,
    email,
    age,
    phoneNo,
    gender,
    language

  };
  const Update = await guide
    .findByIdAndUpdate(Id, updateGuide) 
    .then(() => {
      res.status(200).send({ status: 'Data updated' });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: 'Error with updating data', error: err.message });
    });

});


//delete data
router.route('/delete/:id').delete(async (req, res) => {

  let Id = req.params.id;

  await guide
    .findByIdAndDelete(Id)
    .then(() => {
      res.status(200).send({ status: 'Data deleted' });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with deleting data', error: err.message });
    });

});


//fetch data by id
router.route('/get/:id').get(async (req, res) => {

  let Id = req.params.id;

  const fetch = await guide
    .findById(Id)
    .then((guide) => {
      res.status(200).send({ status: 'Data fetched', guide });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: 'Error with getting data', error: err.message });
    });

});


module.exports = router;