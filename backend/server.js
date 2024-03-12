const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
require('dotenv').config();


app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);


// Database Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongodb database connected!');
});

// Middleware
app.use(cors());
app.use(express.json());


// https://localhost/guide/
app.use('/guide', require('./routes/tourguide.js'));















const PORT = process.env.PORT || 8070;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
