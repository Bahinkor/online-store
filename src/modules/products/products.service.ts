import { isValidObjectId } from "mongoose";

import { HttpError } from "../../errorHandler/httpError.handler";
import CategoryModel from "../categories/models/Category.model";
import ProductModel from "./models/Product.model";

const getAll = () => {
  return ProductModel.find().populate("category").lean();
};

const create = async (postData: any, mediaArray: any) => {
  const categoryValidationResult = postData.categories.map(async (category: string) => {
    const isValidIs = isValidObjectId(category);

    if (!isValidIs) return false;

    const categoryDoc = await CategoryModel.findOne({ _id: category });

    if (!categoryDoc) return false;
  });

  if (!categoryValidationResult[0]) throw new HttpError("invalid category id", 400);

  if (mediaArray || mediaArray.length === 0) {
    throw new HttpError("Image file is required", 400);
  }

  const mediaUrlArray = mediaArray.map((fileName: string) => `images/${fileName}`);

  const product = await ProductModel.create({ ...postData, images: mediaUrlArray });

  return product;
};

export default { getAll, create };
