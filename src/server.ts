import app from "./app";
import envConfig from "./config/config";
import connectToDB from "./db";
import { connectToRedis } from "./redis";

const startServer = () => {
  app.listen(envConfig.port, () => {
    console.log(`🎉 running server on port: ${envConfig.port}`);
  });
};

const run = async () => {
  await connectToDB();
  await connectToRedis();
  startServer();
};

run();
