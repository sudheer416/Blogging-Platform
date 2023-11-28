const Users = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { addYears } = require("date-fns");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const { decode } = require("punycode");

//signing Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRECT, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
  next();
};

// Fetch all users
const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await Users.find();

  res.status(200).json({
    status: "success",
    data: allUsers,
  });
  next();
});

//Registration Users

const SignUp = catchAsync(async (req, res, next) => {
  const newUser = { ...req.body };
  const signing = await Users.create(newUser);
  const token = signToken(signing._id);
  res.status(201).json({
    status: "sucess",
    token,
    message: "User register successfully",
  });
  next();
});

//Login

const login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  if (!req.body.email || !req.body.password) {
    return next(new AppError("please give email& password", 401));
  } else {
    const getUser = await Users.findOne({ email });
    password = password.toString();
    if (!getUser || !(await bcrypt.compare(password, getUser.password))) {
      return next(new AppError("Please give correct email & password", 401));
    }

    //sending token
    const token = signToken(getUser._id);
    res.status(200).json({
      status: "sucess",
      token,
      message: "login Sucessfully",
    });
  }
  next();
});

// Authication Middleware to check if the request is from an authenticated user

const protectRoute = catchAsync(async (req, res, next) => {
  //Check the token
  console.log("protect ...", req.headers);
  console.log("auth middleware", req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }
  if (!token) {
    return next(
      new AppError(" you are not unable to access please provide token", 401)
    );
    next();
  }

  // vaildate token
  const decoded = await jwt.verify(token, process.env.JWT_SECRECT);
  console.log(decoded);
  if (!decoded) {
    return next(new AppError("Please provide vaild token", 401));
  }

  //check user Exists or not by id

  const user = await Users.findById(decoded.id);
  if (!user) {
    return next(new AppError("Insufficient permissions", 401));
  }
  req.user = user;
  console.log("protcetd route", req.user.name);
  next();
});

const authorizeRole = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("Unable to access ", 401));
  }
  next();
});

module.exports = { SignUp, getAllUsers, login, protectRoute, authorizeRole };
