const express = require("express");
require("dotenv").config();

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);

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
