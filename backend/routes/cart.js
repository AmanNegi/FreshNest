const express = require("express");
const router = express.Router();
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const { Cart, validateCart } = require("../models/cart");
const _ = require("lodash");
const { mongoose } = require("mongoose");

//TODO: Add cart functions

router.get("/get/:userId", async function (req, res) {
  var userId = req.params.userId;
  console.log("Get Cart for user: " + userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }

  try {
    var cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      // There's no cart for this user created yet
      return res.send(
        getSuccessResponse("Success", {
          userId: userId,
          items: [],
        })
      );
    }
    return res.send(
      getSuccessResponse("Success", _.omit(cart.toObject(), ["__v"]))
    );
  } catch (e) {
    console.log(e);
    return res.send(
      getErrorResponse(`An error occured while getting the cart. ${e.message}`)
    );
  }
});

router.post("/add", async (req, res) => {
  // Body = {userId, item, count}
  var data = req.body;

  if (!mongoose.Types.ObjectId.isValid(data.userId)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }

  var cart = await Cart.findOne({ userId: data.userId });

  if (!cart) {
    // There's no cart for this user created yet
    var newCart = new Cart({
      userId: data.userId,
      items: [{ item: data.item, count: data.count }],
    });
    await newCart.save();
    return res.send(getSuccessResponse("Saved Item to Cart", newCart));
  }
  console.log(cart);
  cart.items = [{ item: data.item, count: data.count }, ...cart.items];
  await cart.save();

  return res.send(getSuccessResponse("Saved Item to Cart", cart));
});

module.exports = router;
