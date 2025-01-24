import type { NextFunction, Response } from "express";

import { HttpError } from "../errorHandler/httpError.handler";

const adminGuard = (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user;

    if (user.role !== "admin") throw new HttpError("your not access this route", 403);

    next();
  } catch (e) {
    next(e);
  }
};

export default adminGuard;
