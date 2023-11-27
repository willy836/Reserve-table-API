const mongoose = require("mongoose");

const ReservationSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, "Please provide city"],
    },
    startDate: {
      type: Date,
      required: [true, "Please provide start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Please provide end date"],
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide author"],
    },
    restaurantTableId: {
      type: mongoose.Types.ObjectId,
      ref: "RestaurantTable",
      required: [true, "Please provide restaurant table id"],
    },
    restaurantTableName: {
      type: String,
      required: [true, "Please provide table name"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
