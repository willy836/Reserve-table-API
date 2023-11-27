const express = require("express");
const {
  getAllReservations,
  createReservation,
  deleteReservation,
} = require("../controllers/reservation");

const router = express.Router();

router.route("/").get(getAllReservations).post(createReservation);
router.delete("/:id", deleteReservation);

module.exports = router;
