import joi from "joi";

export const registerUserValidator = joi
  .object({
    firstName: joi.string().required().min(2).max(50),
    lastName: joi.string().required().min(2).max(50),
    email: joi.string().required().email(),
    password: joi.string().required().min(6).max(30),
  })
  .strict();
