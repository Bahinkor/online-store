import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

const envConfig = {
  db: {
    uri: process.env.DB_URI,
  },
  port: parseInt(process.env.PORT ?? "8000", 10),
  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
  },
};

export default envConfig;
