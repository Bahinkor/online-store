import ProductModel from "./models/Product.model";

const getAll = () => {
  return ProductModel.find().populate("category").lean();
};

export default { getAll };
