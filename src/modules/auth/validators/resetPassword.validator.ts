import joi from "joi";

export const resetPasswordValidator = joi
  .object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(30),
    token: joi.string().required(),
  })
  .strict();
