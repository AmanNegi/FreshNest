const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = async function () {
  //   var dbUrl = "mongodb://127.0.0.1:27017/agro-millets";

  var dbUrl = process.env.DATABASE_URL;

  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database..."))
    .catch((err) => console.log(err));
};
