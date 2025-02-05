import { isValidObjectId } from "mongoose";

import { HttpError } from "../../errorHandler/httpError.handler";
import CategoryModel from "../categories/models/Category.model";
import ProductModel from "./models/Product.model";

const getAll = () => {
  return ProductModel.find().populate("categories").lean();
};

const create = async (postData: any, mediaArray: any) => {
  const { categories } = postData;

  if (categories.length === 0) throw new HttpError("category is required", 400);

  if (!categories.every((category: string) => isValidObjectId(category)))
    throw new HttpError("Category id is invalid", 400);

  const existingCategories = await CategoryModel.find({ _id: { $in: categories } });

  if (existingCategories.length !== categories.length)
    throw new HttpError("Category id is not found", 404);

  if (!mediaArray || mediaArray.length === 0) {
    throw new HttpError("Images file is required", 400);
  }

  const mediaUrlArray = mediaArray.map((file: Express.Multer.File) => `images/${file.filename}`);

  const product = await ProductModel.create({ ...postData, images: mediaUrlArray });

  return product;
};

const getOne = async (productId: string) => {
  const isValidId = isValidObjectId(productId);

  if (!isValidId) throw new HttpError("Product id is invalid", 400);

  const product = await ProductModel.findOne({ _id: productId }).populate("categories").lean();

  if (!product) throw new HttpError("Product not found", 404);

  return product;
};

const remove = async (productId: string) => {
  const isValidId = isValidObjectId(productId);

  if (!isValidId) throw new HttpError("Product id is invalid", 400);

  await ProductModel.findByIdAndDelete(productId);
};

export default { getAll, create, getOne, remove };
