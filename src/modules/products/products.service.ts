import ProductModel from "./models/Product.model";

const getAll = () => {
  return ProductModel.find().populate("category").lean();
};

const create = async () => {};

export default { getAll, create };
