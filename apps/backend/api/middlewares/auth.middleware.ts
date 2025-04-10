import type { Context, Next } from "hono";
import { verifyToken } from "../../utils/jwt.utils.js";
import logger from "../../config/logger.js";
import type { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = verifyToken(token) as JwtPayload;

    if (!decoded) {
      return c.json({ error: "Invalid or expired token" }, 401);
    }

    c.set("userId", decoded.userId);
    await next();
  } catch (error) {
    logger.error(`Auth middleware error: ${error}`);
    return c.json({ error: "Authentication failed" }, 500);
  }
};
