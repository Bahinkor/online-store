import type { NextFunction, Response } from "express";

import jwt from "jsonwebtoken";

import envConfig from "../config/config";
import { HttpError } from "../errorHandler/httpError.handler";
import UserModel from "../modules/users/models/User.model";

const authGuard = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) throw new HttpError("invalid token", 401);

    const payload: any = jwt.verify(
      accessToken,
      envConfig.auth.accessTokenSecretKey ?? "test-secret",
    );

    const user = await UserModel.findOne({ _id: payload.id }).lean();

    if (!user) throw new HttpError("user not found", 404);

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

export default authGuard;
