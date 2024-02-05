const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const { commentSchema } = require("./comment");

const milletItemSchema = new mongoose.Schema({
  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  listedAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  comments: [commentSchema],
});

const MilletItem = mongoose.model("MilletItem", milletItemSchema);

function validateMilletItem(item) {
  const schema = Joi.object().keys({
    listedBy: JoiObjectId().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string().required()).required(),
    comments: Joi.array(),
    price: Joi.number().required(),
    location: Joi.object()
      .keys({
        type: Joi.string().valid("Point").default("Point"),
        coordinates: Joi.array().items(Joi.number()).required(),
      })
      .required(),
  });
  return schema.validate(item);
}

exports.MilletItem = MilletItem;
exports.validateMilletItem = validateMilletItem;
exports.milletItemSchema = milletItemSchema;
