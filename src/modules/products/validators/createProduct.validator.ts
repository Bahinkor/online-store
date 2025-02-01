import joi from "joi";

const createProductValidator = joi
  .object({
    title: joi.string().required(),
    price: joi.number().min(0).required(),
    stock: joi.number().min(0).required(),
    categories: joi.array().required(),
    description: joi.string().required(),
  })
  .strict();

export default createProductValidator;
