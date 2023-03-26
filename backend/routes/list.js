const express = require("express");
const router = express.Router();
const { getErrorResponse, getSuccessResponse } = require("../utils/response");
const { MilletItem, validateMilletItem } = require("../models/millet_item");
const mongoose = require("mongoose");

router.get("/getAll", async (req, res) => {
  const items = await MilletItem.find({});

  return res.send(getSuccessResponse("Success!", items));
});

router.post("/addItem", async (req, res) => {
  const { error } = validateMilletItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!mongoose.Types.ObjectId.isValid(req.body.listedBy)) {
    return res.status(404).send(getErrorResponse("Invalid User ID"));
  }
  let item = new MilletItem(req.body);
  await item.save();

  return res.send(getSuccessResponse("Added Item", item));
});

module.exports = router;
