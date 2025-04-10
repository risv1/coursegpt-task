import type { Context, Next } from "hono";
import { cors } from "hono/cors";

const corsMiddleware = async (c: Context, next: Next) => {
  const middleware = cors({
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  return middleware(c, next);
}

export default corsMiddleware;
