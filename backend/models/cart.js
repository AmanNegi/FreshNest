const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const { milletItemSchema } = require("./millet_item.js");

const cartItemSchema = new mongoose.Schema({
  count: {
    type: mongoose.Schema.Types.Number,
    default: 1,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MilletItem",
    required: true,
  },
  addedAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

function validateCart(item) {
  const schema = Joi.object().keys({
    userId: JoiObjectId().required(),
    items: Joi.array(),
  });
  return schema.validate(item);
}

exports.Cart = Cart;
exports.validateCart = validateCart;
