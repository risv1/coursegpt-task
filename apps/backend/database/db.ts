import mongoose from "mongoose";
import { env, type Environment } from "../config/env.js";
import logger from "../config/logger.js";
import { registerModels } from "./models.js";

export const connectToDatabase = async () => {
  try {
    let uri = env.MONGO_URI;

    logger.info("Connecting to MongoDB...");

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    logger.info("Connected to MongoDB successfully ✅");

    const models = registerModels();
    logger.info("Registered models 🚀", models);
  } catch (error) {
    logger.error(`Database connection error: ${error}`);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info("Disconnected from MongoDB successfully 👋");
  } catch (error) {
    logger.error("Error disconnecting from MongoDB:", error);
  }
};

export const db = mongoose.connection;
