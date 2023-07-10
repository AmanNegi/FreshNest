const express = require("express");
const router = express.Router();
const { getErrorResponse, getSuccessResponse } = require("../utils/response");
const { MilletItem, validateMilletItem } = require("../models/millet_item");
const { Comment, validateComment } = require("../models/comment");
const { User } = require("../models/user");
const mongoose = require("mongoose");

router.get("/getRecent", async (req, res) => {
  const items = await MilletItem.find().sort({ dateField: -1 }).limit(5);

  return res.send(getSuccessResponse("Success!", items));
});

router.get("/getAll", async (req, res) => {
  const items = await MilletItem.find({});

  return res.send(getSuccessResponse("Success!", items));
});

router.get("/getAll/:farmerID", async (req, res) => {
  var farmerID = req.params.farmerID;
  if (!mongoose.Types.ObjectId.isValid(farmerID)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }

  let items = await MilletItem.find({});

  items = items.filter((item) => item.listedBy.toString() === farmerID);

  return res.send(getSuccessResponse("Success", items));
});

router.post("/addItem", async (req, res) => {
  console.log(req.body);
  const { error } = validateMilletItem(req.body);
  if (error) return res.send(getErrorResponse(error.details[0].message));

  if (!mongoose.Types.ObjectId.isValid(req.body.listedBy)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }
  let item = new MilletItem(req.body);
  await item.save();

  return res.send(getSuccessResponse("Added Item", item));
});

router.get("/getItem/:id", async (req, res) => {
  console.log(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).send(getErrorResponse("Invalid Product ID"));
  }
  let item = await MilletItem.findOne({ _id: req.params.id });
  if (!item) {
    return res.status(404).send(getErrorResponse("No Product Found"));
  }
  return res.send(getSuccessResponse("Success", item));
});

router.post("/comment", async (req, res) => {
  const { commentBy, itemID } = req.body;
  if (!mongoose.Types.ObjectId.isValid(itemID)) {
    return res.status(404).send(getErrorResponse("Invalid Item ID"));
  }
  let item = await MilletItem.findOne({ _id: itemID });

  if (!mongoose.Types.ObjectId.isValid(commentBy)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }

  // let user = User.findOne({ _id: userID });

  const { error } = validateComment(req.body);
  if (error) return res.send(getErrorResponse(error.details[0].message));

  let comment = new Comment(req.body);
  item.comments.push(comment);
  await item.save();

  return res.send(getSuccessResponse("Added Comment", item));
});

router.post("/getComments", async (req, res) => {
  const { itemID } = req.body;
  if (!mongoose.Types.ObjectId.isValid(itemID)) {
    return res.status(404).send(getErrorResponse("Invalid Item ID"));
  }
  let item = await MilletItem.findOne({ _id: itemID });
  return res.send(getSuccessResponse("Success!", item.comments));
});

module.exports = router;
