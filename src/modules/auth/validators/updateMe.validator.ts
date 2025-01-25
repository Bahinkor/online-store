import joi from "joi";

export const updateMeValidator = joi
  .object({
    firstName: joi.string().required().min(2).max(50),
    lastName: joi.string().required().min(2).max(50),
  })
  .strict();
