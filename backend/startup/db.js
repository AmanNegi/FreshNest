const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = async function () {
  var dbUrl = process.env.DATABASE_URL;

  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database..."))
    .catch((err) => console.log(err));
};
