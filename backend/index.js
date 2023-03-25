const express = require("express");
var app = express();

const port = process.env.port || 3000;
const server = app.listen(port, () =>
  console.log("Listening at port http://localhost:3000...")
);

module.exports = server;
