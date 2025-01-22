import type { ErrorRequestHandler } from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ message: err.message });
};

export default errorHandlerMiddleware;
