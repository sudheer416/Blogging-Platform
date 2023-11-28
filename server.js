const app = require("./index");
const db = require("./config/dbConnect");
const port = process.env.PORT || 5000;
db.connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
});
process.on("uncaughtException", (err) => {
  console.log("uncaughtException shutting down application");
  process.exit(1);
});
