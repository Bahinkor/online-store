import mongoose from "mongoose";

const banUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const BanUserModel = mongoose.models.BanUser ?? mongoose.model("BanUser", banUserSchema);

export default BanUserModel;
