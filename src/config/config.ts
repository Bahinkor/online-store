import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

const envConfig = {
  db: {
    uri: process.env.DB_URI,
  },
  port: parseInt(process.env.PORT ?? "8000", 10),
  clientUrl: process.env.CLIENT_URL,
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
  },
  email: {
    username: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? "6379", 10),
  },
};

export default envConfig;
