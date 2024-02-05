const express = require("express");
const router = express.Router();
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const { User } = require("../models/user");
const _ = require("lodash");
const { default: mongoose } = require("mongoose");
const { MilletItem } = require("../models/millet_item");

// TODO: Add a function to check if user is admin
router.get("/isAdmin/:userId", async function (req, res) {});

/**
 * Delete a millet item by ID
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.itemId - The ID of the item to delete.
 * @param {string} req.body.adminId - The ID of the admin performing the delete operation.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
router.post("/deleteItem", async (req, res) => {
  const { itemId, adminId } = req.body;

  // Check and validate itemId
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).send(getErrorResponse("Invalid Item ID"));
  }
  // Check and validate adminId
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return res.status(404).send(getErrorResponse("Invalid Admin ID"));
  }

  const user = await User.findOne({ _id: adminId });
  console.log(user);

  // When mongoose deletes an item it returns it as well

  let deletedItem = await MilletItem.findOne({_id: itemId});
  console.log(deletedItem.listedBy.toString(), adminId);

  if (deletedItem.listedBy.toString() !== adminId) {
    if (user.userType !== "admin") {
      return res.status(404).send(getErrorResponse("You are not an Admin"));
    }
    return res
      .status(404)
      .send(getErrorResponse("You are not the owner of the item"));
  }

  deletedItem = await MilletItem.findByIdAndDelete(itemId);

  if (!deletedItem) {
    return res
      .status(404)
      .send(getErrorResponse("Item with ID provided not found!"));
  }

  return res.send(getSuccessResponse("Deleted Item", deletedItem));
});

module.exports = router;
