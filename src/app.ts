import cors from "cors";
import express from "express";
import helmet from "helmet";

import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import routeNotFoundMiddleware from "./middlewares/notFound.middleware";
import userRouter from "./modules/users/users.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRouter);

// error handler middlewares
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
