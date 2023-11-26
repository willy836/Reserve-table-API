const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(201)
    .json({ user: { name: user.name, isAdmin: user.isAdmin }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  const token = user.createJWT();
  res
    .status(200)
    .json({ user: { name: user.name, isAdmin: user.isAdmin }, token });
};

module.exports = { register, login };
