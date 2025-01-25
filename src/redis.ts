import { createClient } from "redis";

import envConfig from "./config/config";

const redisClient = createClient({
  socket: {
    host: envConfig.redis.host,
    port: envConfig.redis.port,
  },
});

const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log("🎉 Connect to Redis");
  } catch (e) {
    console.error(`❌ Redis error: ${e}`);
    await redisClient.disconnect();
    process.exit(1);
  }
};

export { connectToRedis, redisClient };
