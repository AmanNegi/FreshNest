const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    min: 5,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  userType: {
    type: String,
    enum: ["admin", "customer", "farmer"],
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
