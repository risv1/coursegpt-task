import mongoose from "mongoose";
import { withTimestamps } from "./timestamps.schema.js";

export const Courses = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 0;
      },
      message: "User ID cannot be empty",
    },
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 0;
      },
      message: "Title cannot be empty",
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 0;
      },
      message: "Description cannot be empty",
    },
  },
  totalDuration: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 0;
      },
      message: "Target audience cannot be empty",
    },
  },
  learningOutcomes: {
    type: Array,
    required: true,
    validate: {
      validator: (v: string[]) => {
        return v.length > 0;
      },
      message: "Learning outcomes cannot be empty",
    },
  },
  ...withTimestamps,
})
