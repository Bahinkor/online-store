import joi from "joi";

export const updatePasswordValidator = joi
  .object({
    password: joi.string().required().min(6).max(30),
  })
  .strict();
