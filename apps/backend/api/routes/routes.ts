import { Hono } from "hono";
import { generateController } from "../controllers/generate.controller.js";
import { signin, signup } from "../controllers/auth.controller.js";
// import { authMiddleware } from "../middlewares/auth.middleware.js";
// import { createCourse, deleteCourse, fetchUserCourses, getCourseById } from "../controllers/courses.controller.js";

const router = new Hono();

router.get("/health", (c) => {
  return c.text("OK");
});

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);

router.post("/generate", generateController);

// router.use("/courses/*", authMiddleware);
// router.get("/courses", fetchUserCourses);
// router.get("/courses/:id", getCourseById);
// router.post("/courses", createCourse);
// router.delete("/courses/:id", deleteCourse);


export default router;
