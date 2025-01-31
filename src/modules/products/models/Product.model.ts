import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  categories: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const ProductModel = mongoose.models.Product ?? mongoose.model("Product", productSchema);

export default ProductModel;
