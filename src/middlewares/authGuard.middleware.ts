import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import envConfig from "../config/config";
import { HttpError } from "../errorHandler/httpError.handler";

const authGuard = (req: any, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new HttpError("invalid token", 401);

    const payload = jwt.verify(accessToken, envConfig.auth.accessTokenSecretKey ?? "test-secret");

    req.user = payload;
    console.log(payload);

    next();
  } catch (e) {
    throw new HttpError("invalid token", 401);
  }
};

export default authGuard;
