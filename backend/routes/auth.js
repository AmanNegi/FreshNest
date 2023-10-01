const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const router = express.Router();
const _ = require("lodash");
const { default: mongoose } = require("mongoose");

/**
 * Login as a user using {email} {password}
 * body: {email:"email", password:"password"}
 */

router.post("/login", async (req, res) => {
  console.log("Request Body: ", req.body);
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send(getErrorResponse("No User Exists with this email"));

  const validPassword = req.body.password === user.password;
  if (!validPassword) return res.send(getErrorResponse("Invalid Password"));

  return res.send(
    getSuccessResponse(
      "Login Success",
      _.omit(user.toObject(), ["password", "__v"])
    )
  );
});

/**
 * Sign up a new user
 * BODY: { name, email, password, userType, phone}
 */

router.post("/signup", async (req, res) => {
  console.log("Request Body: ", req.body);
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.send(getErrorResponse("User with this email already exists"));

  let userType = req.body.userType;
  if (!userType || userType === "admin") userType = "customer";

  /// NOTE: asterjoules@gmail.com is an admin email
  if (req.body.email === "asterjoules@gmail.com") userType = "admin";

  user = new User({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    userType: userType,
    phone: req.body.phone,
  });

  await user.save();
  return res.send(
    getSuccessResponse(
      "Signup Successful",
      _.omit(user.toObject(), ["password", "__v"])
    )
  );
});

/**
 * Save credentials for a user (Google Login)
 * { email, name}
 */

router.post("/saveGLogin", async (req, res) => {
  console.log("Request Body: ", req.body);
  const { error } = validateGLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.send(
      getSuccessResponse(
        "Login Success",
        _.omit(user.toObject(), ["password", "__v"])
      )
    );
  }

  const userType = "customer";
  const email = req.body.email;

  // By default email is the password itself
  user = new User({
    email: email,
    name: req.body.name,
    password: email,
    userType: userType,
    phone: "000 ",
  });

  await user.save();
  return res.send(
    getSuccessResponse(
      "Signup Successful",
      _.omit(user.toObject(), ["password", "__v"])
    )
  );
});

/**
 * Get All Users (For Admin Panel)
 * {adminId: Objectid}
 */

router.post("/getAll", async (req, res) => {
  console.log("Request Body: ", req.body);

  // Validate if Id is valid
  if (!mongoose.Types.ObjectId.isValid(req.body.adminId)) {
    return res.status(404).send(getErrorResponse("Invalid Admin ID"));
  }

  let user = await User.findOne({ _id: req.body.adminId });
  // Check if user exists
  if (!user)
    return res.send(getErrorResponse("No User Exists with this email"));

  // Check if user is admin
  if (user.userType !== "admin") {
    return res.status(404).send(getErrorResponse("You are not an Admin!"));
  }

  // User is admin, fetch all users and return

  var users = await User.find({}).select("-__v -password");

  return res.send(getSuccessResponse("Success", users));
});

router.post("/exists", async (req, res) => {
  var email = req.body.email;
  if (!email) return res.send(getErrorResponse("Enter a valid email"));

  const user = await User.findOne({ email: email });
  if (!user)
    return res.send(getErrorResponse("No User Exists with this email address"));
  return res.send(
    getSuccessResponse(
      "User Found",
      _.omit(user.toObject(), ["password", "__v"])
    )
  );
});

function validateLogin(req) {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });
  return schema.validate(req);
}

function validateSignUp(req) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
    userType: Joi.string().default("customer"),
  });
  return schema.validate(req);
}

function validateGLogin(req) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  });

  return schema.validate(req);
}

module.exports = router;
