const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //console.log(process.env.MANGOOSE);
    await mongoose.connect(process.env.MANGOOSE, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log("Mongoose connected");
  } catch (err) {
    console.log("Error:", err);
    console.log("unhandleRejection shutting down");
    process.exit();
  }
};

const closeDB = async () => {
  return mongoose.disconnect();
};
module.exports = { connectDB };
