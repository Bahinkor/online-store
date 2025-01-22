import app from "./app";
import envConfig from "./config/config";
import connectToDB from "./db";

const startServer = () => {
  app.listen(envConfig.port, () => {
    console.log(`🎉 running server on port: ${envConfig.port}`);
  });
};

const run = async () => {
  await connectToDB();
  startServer();
};

run();
