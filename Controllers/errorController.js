const AppError = require("../Utils/appError");

///sending developement Error
const sendErrorDev = (err, errStack, res) => {
  //console.log(errStack);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: errStack,
  });
};

//sending Producation Errors...

const sendErrorPro = (err, res) => {
  // console.log(err.isOperational);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went Worng",
    });
  }
};

const handleCastError = (err) => {
  const message = `Invaild ${err.path} :${err.value}`;
  return new AppError(message, 400);
};
const handleDupicateKeys = (err) => {
  const keys = Object.keys(err.keyPattern);
  const message = `Duplicate fields values ${
    err.keyValue[keys[0]]
  } please  use another  value`;
  //console.log(err);

  return new AppError(message, 400);
};

const handleValidateError = (err) => {
  const error = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input Data . ${error.join(". ")}`;
  return new AppError(message, 400);
};

const handleTokenError = (err) => {
  return new AppError("Invalid token please provide vaild token", 401);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";
  //console.log("errorr...", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "development") {
    let error = { ...err };
    //console.log("errorstack", err.code);
    if (err.name) sendErrorDev(err, err.stack, res);
  } else if (process.env.NODE_ENV === "production") {
    //console.log("pro-error", process.env.NODE_ENV, err);
    let error = { ...err };
    if (err.name === "JsonWebTokenError") err = handleTokenError(error);
    if (err.name === "CastError") err = handleCastError(error);
    if (err.name === "ValidationError") err = handleValidateError(error);
    if (err.code === 11000) err = handleDupicateKeys(error);
    sendErrorPro(err, res);
  }
  next();
};
