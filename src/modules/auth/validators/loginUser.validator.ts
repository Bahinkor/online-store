import joi from "joi";

export const loginUserValidator = joi
  .object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(30),
  })
  .strict();
