const { User } = require("../models/user");
const Joi = require("joi");
const express = require("express");
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const router = express.Router();
const _ = require("lodash");
/**
 * Login as a user using {email} {password}
 * body: {email:"email",password:"password"}
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
    getSuccessResponse("Login Success", _.omit(user, ["password", "__v"]))
  );
});

/**
 * SignUp a new user
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
    getSuccessResponse("Signup Successful", _.omit(user, ["password", "__v"]))
  );
});

router.post("/exists", async (req, res) => {
  var email = req.body.email;
  if (!email) return res.send(getErrorResponse("Enter a valid email"));

  const user = await User.findOne({ email: email });
  if (!user)
    return res.send(getErrorResponse("No User Exists with this email address"));
  return res.send(
    getSuccessResponse("User Found", _.omit(user, ["password", "__v"]))
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

module.exports = router;
