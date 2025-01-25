import type { NextFunction, Request, RequestHandler, Response } from "express";

import authService from "./auth.service";

const registerHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await authService.register(req.body);

    res.status(201).json({
      data: { ...newUser, password: null },
      statusCode: 201,
      message: "User created successfully",
    });
  } catch (e) {
    next(e);
  }
};

const loginHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: string = await authService.login(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    res.status(200).json({
      statusCode: 200,
      message: "User logged in successfully",
    });
  } catch (e) {
    next(e);
  }
};

const getMeHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getMe(req.user._id);

    res.status(200).json({
      data: user,
      statusCode: 200,
      message: "User retrieved successfully",
    });
  } catch (e) {
    next(e);
  }
};

const updateMeHandler: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  try {
    await authService.updateMe(req.user._id, req.body);

    res.status(200).json({
      statusCode: 200,
      message: "User updated successfully",
    });
  } catch (e) {
    next(e);
  }
};

export default { registerHandler, loginHandler, getMeHandler, updateMeHandler };
