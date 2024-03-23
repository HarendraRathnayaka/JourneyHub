const router = require('express').Router();
const client = require('../models/clientregister');
const QRCode = require('qrcode');

// Add new client
router.route('/add').post(async (req, res) => {
  const { firstName, lastName, email, address, phoneNo } = req.body;

  try {
    // Create a new client instance
    const newClient = new client({
      firstName,
      lastName,
      email,
      address,
      phoneNo,
    });

    // Save the client to get the client ID
    const savedClient = await newClient.save();

    // Generate QR code
    const qrCodeString = await QRCode.toString(savedClient.clientId.toString());

    // Update client document with QR code
    savedClient.qrCode = qrCodeString;
    await savedClient.save();

    res.json('New client added');
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error adding client: ${error.message}`);
  }
});

// Get client by client ID
router.route('/:clientId').get(async (req, res) => {
  const clientId = req.params.clientId;

  try {
    const foundClient = await client.findOne({ clientId: clientId });
    if (foundClient) {

      //console.log('Client QR Code:', foundClient.qrCode);
      res.json(foundClient);
    } else {
      res.status(404).send('Client not found');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(`Error fetching client: ${error.message}`);
  }

});

module.exports = router;
