import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";

export const validatorMiddleware = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (e: any) {
      if (e.isJoi) {
        res.status(400).json(e.details);
      } else {
        res.status(500).json({
          message: e.message ?? e.msg ?? "internal server error",
        });
      }
    }
  };
};
