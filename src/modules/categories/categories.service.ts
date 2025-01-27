import slugify from "slugify";

import type { CategoryType } from "./types/types";

import { HttpError } from "../../errorHandler/httpError.handler";
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

export default { getAll, create };
