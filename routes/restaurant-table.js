const express = require("express");
const {
  getAllRestaurantTables,
  getSingleRestaurantTable,
  createRestaurantTable,
  updateRestaurantTable,
  deleteRestaurantTable,
} = require("../controllers/restaurant-table");

const router = express.Router();

router.route("/").get(getAllRestaurantTables).post(createRestaurantTable);
router
  .route("/:id")
  .get(getSingleRestaurantTable)
  .patch(updateRestaurantTable)
  .delete(deleteRestaurantTable);

module.exports = router;
