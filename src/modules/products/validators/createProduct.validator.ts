import joi from "joi";

const createProductValidator = joi
  .object({
    title: joi.string().required(),
    price: joi
      .string()
      .required()
      .messages({ "number.base": "Price must be a number" })
      .custom((value, helpers) => {
        const num = Number(value);
        return isNaN(num) ? helpers.error("number.base") : num;
      }),
    stock: joi
      .string()
      .required()
      .messages({ "number.base": "Stock must be a number" })
      .custom((value, helpers) => {
        const num = Number(value);
        return isNaN(num) ? helpers.error("number.base") : num;
      }),
    categories: joi.array().required(),
    description: joi.string().required(),
  })
  .strict();

export default createProductValidator;
