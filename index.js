const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
dotenv.config({ path: "./config/config.env" });
const { logs } = require("./Middleware/logevents");
const mongoSanitize = require("express-mongo-sanitize");
const AppError = require("./Utils/appError");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

//const hpp = require("hpp");

const golbalErrorHandler = require("./Controllers/errorController");
const app = express();
//Connecting Mongoose DB
app.use(express.json({}));

//Global Middleware
// rate limit 100 request per hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour",
});

app.use("/api", limiter);
//Secure Header Http
app.use(helmet());

//Rate limite

//Data Sanitizartion again Nosql query injections
app.use(mongoSanitize());
//DATA Sanitizartion against site scripts xss
app.use(xss());

//

//Routes

const userRoutes = require("./Routes/userRouters");
const blogsRoutes = require("./Routes/blogsRouter");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogsRoutes);
app.use(logs);
app.use(morgan("dev"));

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't f  ind ${req.originalUrl} on this server`,
  // });
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(golbalErrorHandler);

module.exports = app;
