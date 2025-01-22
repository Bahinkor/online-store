import mongoose from "mongoose";

import envConfig from "./config/config";

const connectToDB = async () => {
  try {
    await mongoose.connect(envConfig.db.uri!);
    console.log(`🎉 Connected to DB: ${mongoose.connection.host}`);
  } catch (e) {
    console.error(`❌ connecting to DB failed: ${e}`);
    process.exit(1);
  }
};

export default connectToDB;
