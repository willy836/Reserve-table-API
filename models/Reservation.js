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
    userName: {
      type: String,
      required: [true, "pLease provide user name"],
    },
    tableName: {
      type: String,
      required: [true, "Please provide table name"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    restaurantTable: {
      type: mongoose.Types.ObjectId,
      ref: "RestaurantTable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
