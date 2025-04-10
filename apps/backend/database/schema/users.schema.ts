import mongoose from "mongoose";
import { z } from "zod";
import { withTimestamps } from "./timestamps.schema.js";

export const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return z.string().min(1).safeParse(v).success;
      },
      message: "Name cannot be empty",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => {
        return z.string().email().safeParse(v).success;
      },
      message: "Invalid email address",
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  ...withTimestamps,
});
