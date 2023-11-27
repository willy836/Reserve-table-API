const User = require("../models/User");
const RestaurantTable = require("../models/RestaurantTable");

const getAllRestaurantTables = async (req, res) => {
  const restaurantTables = await RestaurantTable.find({}).sort("-createdAt");
  res.status(200).json({ restaurantTables });
};

const getSingleRestaurantTable = async (req, res) => {
  const { id: tableId } = req.params;
  const restaurantTable = await RestaurantTable.find({ _id: tableId });

  if (!restaurantTable) {
    return res.status(404).json({ message: `No table with id ${tableId}` });
  }

  res.status(200).json({ restaurantTable });
};

const createRestaurantTable = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ message: `No user with id ${userId}` });
  }

  if (!user.isAdmin) {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
    return;
  }
  req.body.author = userId;
  const restaurantTable = await RestaurantTable.create(req.body);

  res.status(201).json({ restaurantTable });
};

const updateRestaurantTable = async (req, res) => {
  const { userId } = req.user;
  const { id: tableId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ message: `No user with id ${userId}` });
  }

  if (!user.isAdmin) {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
    return;
  }

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body cannot be empty. Provide data for update",
    });
  }

  const restaurantTable = await RestaurantTable.findOne({ _id: tableId });

  if (!restaurantTable) {
    return res.status(404).json({ message: `No table with id ${tableId}` });
  }

  const updatedTable = await RestaurantTable.findByIdAndUpdate(
    { _id: tableId },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({ restaurantTable: updatedTable });
};

const deleteRestaurantTable = async (req, res) => {
  const { userId } = req.user;
  const { id: tableId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ message: `No user with id ${userId}` });
  }

  if (!user.isAdmin) {
    res
      .status(403)
      .json({ message: "You are not authorized to perform this action" });
    return;
  }

  const restaurantTable = await RestaurantTable.findOne({ _id: tableId });

  if (!restaurantTable) {
    return res.status(404).json({ message: `No table with id ${tableId}` });
  }

  await RestaurantTable.findByIdAndDelete(tableId);

  res.status(204).send();
};

module.exports = {
  getAllRestaurantTables,
  getSingleRestaurantTable,
  createRestaurantTable,
  updateRestaurantTable,
  deleteRestaurantTable,
};
