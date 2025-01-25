import joi from "joi";

export const forgetPasswordValidator = joi
  .object({
    email: joi.string().required().email(),
  })
  .strict();
