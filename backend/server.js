const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors middleware

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 8085;

// Middleware
app.use(express.json());
app.use(cors()); // Use cors middleware to allow requests from all origins

// Routes
app.use("/bookings", bookingRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });
