import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  replyTo: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
  replays: {
    type: [mongoose.Types.ObjectId],
    ref: "Comment",
    required: true,
  },
  isAccept: {
    type: Boolean,
    default: false,
  },
});

const CommentModel = mongoose.models.Comment ?? mongoose.model("Comment", commentSchema);

export default CommentModel;
