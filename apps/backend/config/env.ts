import { config } from "dotenv";
import { z } from "zod";

config();

export type Environment = {
  PORT: number;
  NODE_ENV: string;
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
    .default("development")
    .refine((val) => ["development", "production", "test"].includes(val), {
      message: "NODE_ENV must be one of 'development', 'production', or 'test'",
    }),
});

export const env = envSchema.parse(process.env) as Environment;
