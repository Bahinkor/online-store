import joi from "joi";

import UserRole from "../types/role.enum";

export const updateUserValidator = joi
  .object({
    firstName: joi.string().required().min(2).max(50),
    lastName: joi.string().required().min(2).max(50),
    email: joi.string().required().email(),
    role: joi
      .string()
      .required()
      .valid(...Object.values(UserRole)),
  })
  .strict();
