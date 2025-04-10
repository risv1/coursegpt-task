import mongoose from "mongoose";
import { z } from "zod";

export const Quiz = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
    validate: {
      validator: (v: string) => {
        return v.length > 0;
      },
      message: "Course ID cannot be empty",
    },
  },
  question: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return z
          .string()
          .min(1)
          .max(500)
          .regex(/^[a-zA-Z0-9 ]*$/)
          .safeParse(v).success;
      },
      message: "Question must be at least 1 character long",
    },
  },
  options: {
    type: Array,
    required: true,
    validate: {
      validator: (v: string[]) => {
        return z.array(z.string()).safeParse(v).success;
      },
      message: "Options must be an array of strings",
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => {
        return z.number().int().min(0).max(3).safeParse(v).success;
      },
      message: "Correct answer must be an integer between 0 and 3",
    },
  },
  explanation: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return z
          .string()
          .min(1)
          .max(500)
          .safeParse(v).success;
      },
      message: "Explanation must be at least 1 character long",
    },
  },
});

export const Modules = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return z
          .string()
          .min(1)
          .max(100)
          .regex(/^[a-zA-Z0-9 ]*$/)
          .safeParse(v).success;
      },
      message: "Title must be at least 1 character long",
    },
  },
  description: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return z
          .string()
          .min(1)
          .max(500)
          .regex(/^[a-zA-Z0-9 ]*$/)
          .safeParse(v).success;
      },
      message: "Description must be at least 1 character long",
    },
  },
  subtopics: {
    type: Array,
    required: true,
    validate: {
      validator: (v: string[]) => {
        return z.array(z.string()).safeParse(v).success;
      },
      message: "Subtopics must be an array of strings",
    },
  },
  images: {
    type: Array,
    required: false,
    validate: {
      validator: (v: string[]) => {
        return z.array(z.string()).safeParse(v).success;
      },
      message: "Images must be an array of strings",
    },
  },
  externalLinks: {
    type: Array,
    required: false,
    validate: {
      validator: (v: string[]) => {
        return z.array(z.string()).safeParse(v).success;
      },
      message: "External links must be an array of strings",
    },
  },
  duration: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => {
        return z
          .string()
          .regex(/^[0-9]+:[0-5][0-9]$/)
          .safeParse(v).success;
      },
      message: "Duration must be in the format HH:MM",
    },
  },
  quiz: {
    type: [Quiz],
    required: true,
  }
});
