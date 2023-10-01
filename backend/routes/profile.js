const express = require("express");
const router = express.Router();
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const { User } = require("../models/user");
const _ = require("lodash");
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

/**
 * Update user profile.
 * @route POST /updateUser
 * @param {Object} req.body - The request body.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.name - The user's name.
 * @param {string} req.body.phone - The user's phone number.
 * @param {string} req.body._id - The user's ID.
 * @returns {User} The updated user object. 
 */
router.post("/updateUser", async function (req, res) {
  var data = req.body;
  console.log(`Update User `, data);

  const { error } = validateProfileData(data);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(data._id)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }

  try {
    var user = await User.findOne({ _id: data._id });
    console.log(user);

    if (!user) {
      return res.status(404).send(getErrorResponse("User not found"));
    }
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    await user.save();
    return res.send(
      getSuccessResponse(
        "Success",
        _.omit(user.toObject(), ["__v", "password"])
      )
    );
  } catch (e) {
    console.log(e);
    return res.send(
      getErrorResponse(
        `An error occured while searching for the user. ${e.message}`
      )
    );
  }
});

function validateProfileData(req) {
  const schema = Joi.object().keys({
    _id: Joi.string().required(),
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(req);
}
module.exports = router;
