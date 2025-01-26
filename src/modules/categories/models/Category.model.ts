import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

const CategoryModel = mongoose.models.Category ?? mongoose.model("Category", categorySchema);

export default CategoryModel;
