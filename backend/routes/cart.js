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
      // Create an empty cart in that case
      return res.send(getSuccessResponse("Created New Cart", { items: [] }));
    }
    return res.send(
      getSuccessResponse("Success", _.omit(cart.toObject(), ["__v"]))
    );
  } catch (e) {
    console.log(e);
  }
});

router.post("/add", async (req, res) => {
  // Body = {userId, item, count}
  var data = req.body;

  if (!mongoose.Types.ObjectId.isValid(data.userId)) {
    return res.send(getErrorResponse("Invalid User ID"));
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

  // Check if a product with same id pre-exists

  var value = cart.items.filter((e) => e.item == data.item);
  console.log("Value OF MAP: ", value);
  if (value && value.length == 1) {
    // If it does simply add the count
    cart.items = cart.items.map((e) => {
      if (e.item == data.item) {
        e.count = e.count + data.count;
        console.log("New Count: ", e.count);
      }
      return e;
    });

    console.log("Item Prexists, increment quantity");
  } else {
    // else save the item
    cart.items = [{ item: data.item, count: data.count }, ...cart.items];
  }

  await cart.save();

  return res.send(getSuccessResponse("Saved Item to Cart", cart));
});

// Remove item from cart
// Body: {userId, itemId}
router.post("/remove", async (req, res) => {
  var { userId, itemId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send(getErrorResponse("Invalid Cart Item ID"));
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).send(getErrorResponse("Invalid Item ID"));
  }

  var cart = await Cart.findOne({ userId: userId });

  if (!cart) {
    return res
      .status(404)
      .send(getErrorResponse("No cart exists for this userId"));
  }

  const len = cart.items.length;
  
  // If itemId doesn't match, add it back to list
  cart.items = cart.items.filter((e) => e.item.toString() !== itemId);

  if (cart.items.length === len) {
    // No item was removed, means it doesn't exist
    return res
      .status(404)
      .send(getErrorResponse("No item of this ID is present in your cart"));
  }

  await cart.save();

  return res.send(
    getSuccessResponse("Successfully removed item from cart", cart)
  );
});

module.exports = router;
