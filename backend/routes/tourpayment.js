const router = require('express').Router();
let payment = require('../models/tourguide');

const nodemailer = require('nodemailer');



//subscribe mail send
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    //host: 'smtp.elasticemail.com', // Elastic Email SMTP server
    //port: 2525, // Port for secure connection (TLS)
    //secure: true, // Set to true if using port 465 (SSL)
    auth: {
      user: 'woodmasters574@gmail.com', 
      pass: 'lofkfoafptumclqg', 
    },
  });
  
  router.route('/subscribe').post(async (req, res) => {
    const { email } = req.body;
  
    console.log(`Email received: ${email}`);
  
    // Email body
    const mailOptions = {
      from: 'journeyhublk@gmail.com', 
      to: email, 
      subject: 'Welcome to JourneyHub Newsletter!', 
      text: 'You have subscribed to our newsletter successfully. Stay tuned, we will give updates frequently.', 
    };
  
    try {
      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}`);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });

  module.exports = router;