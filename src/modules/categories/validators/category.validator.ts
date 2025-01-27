import joi from "joi";

const createCategoryValidator = joi
  .object({
    title: joi.string().required(),
    slug: joi.string().required(),
  })
  .strict();

export default createCategoryValidator;
