import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "1h" });
}

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
