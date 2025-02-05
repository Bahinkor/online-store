import slugify from "slugify";

import type { CategoryType } from "./types/types";

import { HttpError } from "../../errorHandler/httpError.handler";
import ProductModel from "../products/models/Product.model";
import CategoryModel from "./models/Category.model";

const getAll = () => {
  return CategoryModel.find();
};

const create = async (categoryData: CategoryType) => {
  const { title, slug } = categoryData;
  const cleanSlug = slugify(slug, { lower: true });

  const isExistCategory = await CategoryModel.findOne({ slug: cleanSlug });

  if (isExistCategory) throw new HttpError("Category already exists", 400);

  await CategoryModel.create({ title, slug: cleanSlug });
};

const findOne = async (slug: string) => {
  const categoryDoc: any = await CategoryModel.findOne({ slug }).lean();

  if (!categoryDoc) throw new HttpError("Category not found", 404);

  return ProductModel.find({ categories: { $in: categoryDoc._id } });
};

const remove = async (slug: string) => {
  const deletedCategory = await CategoryModel.findOneAndDelete({ slug });

  if (!deletedCategory) throw new HttpError("Category not found", 404);
};

export default { getAll, create, findOne, remove };
