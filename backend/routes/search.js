const express = require("express");
const router = express.Router();
const { getSuccessResponse, getErrorResponse } = require("../utils/response");
const { MilletItem } = require("../models/millet_item");

router.get("/:query", async function (req, res) {
  var query = req.params.query;
  console.log(`Searching For ${query}...`);

  try {
    var items = await MilletItem.find({
      name: {
        $regex: query,
        $options: "i",
      },
    });
    console.log(items);
    return res.send(getSuccessResponse("Success", items));
  } catch (e) {
    console.log(e);
    return res.send(
      getErrorResponse(`An error occured while searching. ${e.message}`)
    );
  }
});

module.exports = router;
