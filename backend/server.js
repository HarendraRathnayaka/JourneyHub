const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Database Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {}); // Removed useNewUrlParser and useUnifiedTopology options

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongodb database connected!');
});

// Middleware
app.use(express.json());

// Routes
app.use('/guide', require('./routes/tourguide.js'));
app.use('/payment', require('./routes/tourpayment.js'));
app.use('/booking', require('./routes/tourbooking.js'));
app.use('/client', require('./routes/client.js'));
app.use('/tour', require('./routes/tour.js'));

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
