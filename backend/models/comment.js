const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const commentSchema = new mongoose.Schema({
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  commentAt: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
});

const Comment = mongoose.model("Comment", commentSchema);

function validateComment(item) {
  const schema = Joi.object().keys({
    commentBy: JoiObjectId().required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    itemID: JoiObjectId().required(),
    commentAt: Joi.date().required(),
  });
  return schema.validate(item);
}

exports.Comment = Comment;
exports.commentSchema = commentSchema;
exports.validateComment = validateComment;
