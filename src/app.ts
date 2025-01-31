import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import routeNotFoundMiddleware from "./middlewares/notFound.middleware";
import authRouter from "./modules/auth/auth.routes";
import categoryRouter from "./modules/categories/categories.routes";
import productRouter from "./modules/products/products.routes";
import userRouter from "./modules/users/users.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

// error handler middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
