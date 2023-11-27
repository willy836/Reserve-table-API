const User = require("../models/User");
const Reservation = require("../models/Reservation");

const getAllReservations = async (req, res) => {
  const reservations = await Reservation.find({
    authorId: req.user.userId,
  }).populate("restaurantTableId", ["name", "image", "tableSize"]);

  res.status(200).json({ reservations });
};

const createReservation = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error(`No user with id ${userId}`);
  }

  if (!user.isAdmin) {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
    return;
  }

  const { city, startDate, endDate, restaurantTableId, restaurantTableName } =
    req.body;

  if (
    !city ||
    !startDate ||
    !endDate ||
    !restaurantTableId ||
    !restaurantTableName
  ) {
    throw new Error(
      "Incomplete data provided. Please ensure all fields have valid data"
    );
  }

  req.body.authorId = userId;
  const reservation = await Reservation.create(req.body);

  res.status(201).json({ reservation });
};

const deleteReservation = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error(`No user with id ${userId}`);
  }

  if (!user.isAdmin) {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
    return;
  }

  const { id: reservationId } = req.params;
  const reservation = await Reservation.findOne({ _id: reservationId });

  if (!reservation) {
    throw new Error(`No reservation with id ${reservationId}`);
  }
  await Reservation.findByIdAndDelete(reservationId);
};

module.exports = { getAllReservations, createReservation, deleteReservation };
