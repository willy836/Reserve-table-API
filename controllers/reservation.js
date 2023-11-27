const Reservation = require("../models/Reservation");

const getAllReservations = async (req, res) => {
  const reservations = await Reservation.find({
    user: req.user.userId,
  })
    .populate("user", ["name"])
    .populate("restaurantTable", ["name", "image", "tableSize"]);

  res.status(200).json({ reservations });
};

const createReservation = async (req, res) => {
  const { city, startDate, endDate, userName, tableName, restaurantTable } =
    req.body;

  if (
    !city ||
    !startDate ||
    !endDate ||
    !userName ||
    !tableName ||
    !restaurantTable
  ) {
    return res.status(400).json({
      message:
        "Incomplete data provided. Please ensure all fields have valid data",
    });
  }

  req.body.user = req.user.userId;
  const reservation = await Reservation.create(req.body);

  res.status(201).json({ reservation });
};

const deleteReservation = async (req, res) => {
  const { userId } = req.user;
  const { id: reservationId } = req.params;
  const reservation = await Reservation.findOne({
    _id: reservationId,
    user: userId,
  });

  if (!reservation) {
    return res
      .status(404)
      .json({ message: `No reservation with id ${reservationId}` });
  }
  await Reservation.findByIdAndDelete(reservationId);
  res.status(204).send();
};

module.exports = { getAllReservations, createReservation, deleteReservation };
