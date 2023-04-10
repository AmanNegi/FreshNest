const express = require("express");
const router = express.Router();
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const { User } = require("../models/user");
const _ = require("lodash");

//TODO: Add profile functions

router.get("/updateUser", async function (req, res) {
  var data = req.body;

  console.log(`Update User `, data);
  if (!mongoose.Types.ObjectId.isValid(data._id)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }

  try {
    var user = await User.find({ _id: data._id });
    console.log(user);
    user.name = data.name;
    user.save();
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
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  });
  return schema.validate(req);
}
module.exports = router;
