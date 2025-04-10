import { Hono } from "hono";
import { generateController } from "../controllers/generate.controller.ts";

const router = new Hono();

router.get("/health", (c) => {
  return c.text("OK");
});

router.post("/generate", generateController);

export default router;
