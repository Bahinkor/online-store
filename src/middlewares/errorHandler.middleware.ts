import type { NextFunction, Request, Response } from "express";

import { HttpError } from "../errorHandler/httpError.handler";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message ?? "internal server error" });
  }
};

export default errorHandlerMiddleware;
