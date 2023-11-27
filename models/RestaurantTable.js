const mongoose = require("mongoose");

const RestaurantTableSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide table name"],
      minlength: 3,
      maxlength: 20,
    },
    image: {
      type: String,
      required: [true, "Please provide image url"],
    },
    desc: {
      type: String,
      required: [true, "Please provide description"],
      minlength: 200,
      maxlength: 500,
    },
    price: {
      type: String,
      required: [true, "Please provide price"],
    },
    tableSize: {
      type: String,
      required: [true, "Please provide table size"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide author"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RestaurantTable", RestaurantTableSchema);
