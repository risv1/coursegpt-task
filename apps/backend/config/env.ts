import { config } from "dotenv";
import { z } from "zod";

config();

export type Environment = {
  PORT: number;
  NODE_ENV: string;
  GEMINI_API_KEY: string;
  GEMINI_MODEL: string;
  SERPER_API_KEY: string;
  SYSTEM_PROMPT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
};

const envSchema = z.object({
  PORT: z
    .string()
    .default("8000")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), {
      message: "PORT must be a number",
    }),
  NODE_ENV: z
    .string()
    .default("production")
    .refine((val) => ["development", "production", "test"].includes(val), {
      message: "NODE_ENV must be one of 'development', 'production', or 'test'",
    }),
  GEMINI_API_KEY: z
    .string()
    .default("dummy-gemini-api-key")
    .refine(Boolean, {
      message: "GEMINI_API_KEY is required",
    }),
  GEMINI_MODEL: z
    .string()
    .default("gemini-pro")
    .refine(Boolean, {
      message: "GEMINI_MODEL is required",
    }),
  SERPER_API_KEY: z
    .string()
    .default("dummy-serper-api-key")
    .refine(Boolean, {
      message: "SERPER_API_KEY is required",
    }),
  SYSTEM_PROMPT: z
    .string()
    .default("You are CourseGPT, an AI assistant that helps create educational courses.")
    .refine(Boolean, {
      message: "SYSTEM_PROMPT is required",
    }),
  MONGO_URI: z
    .string()
    .default("mongodb://user:password@localhost:27017/coursegpt?authSource=admin")
    .refine(Boolean, {
      message: "MONGO_URI is required",
    }),
  JWT_SECRET: z
    .string()
    .default("your-super-secret-jwt-key-for-development-only")
    .refine(Boolean, {
      message: "JWT_SECRET is required",
    }),
});

export const env = envSchema.parse(process.env) as Environment;
