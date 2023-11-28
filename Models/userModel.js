const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valide email"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide Password"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified(this.password)) return next();
  else {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
