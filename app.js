const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const tableRouter = require("./routes/restaurant-table");
const reservationRouter = require("./routes/reservation");

const authenticateUser = require("./middlewares/authentication");
const notFoundMiddleware = require("./middlewares/not-found");

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https://reserveatable.chickenkiller.com"],
      },
    },
  })
);
app.use(mongoSanitize());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
);

const swaggerDoc = YAML.load("./swagger.yaml");

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Reserve Table API</h1><a href='/api-docs'>Documentation</a>"
  );
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tables", authenticateUser, tableRouter);
app.use("/api/v1/reservations", authenticateUser, reservationRouter);

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
