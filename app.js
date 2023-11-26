const express = require("express");
require("dotenv").config();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const tableRouter = require("./routes/restaurant-table");

const authenticateUser = require("./middlewares/authentication");
const notFoundMiddleware = require("./middlewares/not-found");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tables", authenticateUser, tableRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
