const express = require("express");
const auth = require("../routes/auth");
const list = require("../routes/list");
/**
 * Function that exports all the routes
 * @param {Express} app
 */

module.exports = function (app) {
  app.use("/api/auth", auth);
  app.use("/api/list", list);
  //   app.use(error);
};
