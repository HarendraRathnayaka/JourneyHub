const router = require("express").Router();
const {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingById,
  deleteBookingById,
} = require("../Controllers/bookingController");

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.put("/:id", updateBookingById);
router.delete("/:id", deleteBookingById);

module.exports = router;
