const mongoose = require("mongoose");
const { URI } = require("../env");

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});
