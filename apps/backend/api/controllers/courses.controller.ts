import type { Context } from "hono";
import { CoursesModel, ModulesModel } from "../../database/models.js";
import logger from "../../config/logger.js";
import { formatDate } from "../../utils/date.utils.js";
import mongoose from "mongoose";

export const fetchUserCourses = async (c: Context) => {
  try {
    const userId = c.get("userId");

    const courses = await CoursesModel.find({ userId })
      .sort({ updatedAt: -1 })
      .select("_id title description updatedAt")
      .lean();

    const formattedCourses = courses.map(course => ({
      id: course._id.toString(),
      title: course.title,
      lastUpdated: formatDate(course.updatedAt)
    }));

    return c.json({ data: formattedCourses });
  } catch (error) {
    logger.error(`Fetch courses error: ${error}`);
    return c.json({ error: "Failed to fetch courses" }, 500);
  }
};

export const getCourseById = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const courseId = c.req.param("id");

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return c.json({ error: "Invalid course ID format" }, 400);
    }

    const course = await CoursesModel.findOne({
      _id: courseId,
      userId
    }).lean();

    if (!course) {
      return c.json({ error: "Course not found" }, 404);
    }

    const modules = await ModulesModel.find({ courseId }).sort({ id: 1 }).lean();

    interface Message {
      role: string;
      content: string;
    }

    const courseResponse = {
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      lastUpdated: formatDate(course.updatedAt),
      messages: [] as Message[]
    };

    if (modules.length > 0) {
      const formattedModules = modules.map(module => ({
        id: module.id,
        title: module.title,
        description: module.description,
        subtopics: module.subtopics,
        duration: module.duration,
        quiz: module.quiz,
        images: module.images || [],
        externalLinks: module.externalLinks || []
      }));

      const fullCourse = {
        title: course.title,
        description: course.description,
        totalDuration: course.totalDuration,
        targetAudience: course.targetAudience,
        learningOutcomes: course.learningOutcomes,
        modules: formattedModules
      };

      courseResponse.messages = [
        {
          role: "user",
          content: `Generate a course on ${course.title}`
        },
        {
          role: "assistant",
          content: JSON.stringify(fullCourse)
        }
      ];
    }

    return c.json({ data: courseResponse });
  } catch (error) {
    logger.error(`Get course error: ${error}`);
    return c.json({ error: "Failed to fetch course" }, 500);
  }
};

export const createCourse = async (c: Context) => {
  try {
    const userId = c.get("userId");

    const newCourse = new CoursesModel({
      userId,
      title: "New Lesson",
      description: "Start describing your lesson",
      totalDuration: "0",
      targetAudience: "",
      learningOutcomes: []
    });

    await newCourse.save();

    return c.json({
      data: {
        id: newCourse._id.toString(),
        title: newCourse.title,
        lastUpdated: "Just now",
        messages: []
      }
    }, 201);
  } catch (error) {
    logger.error(`Create course error: ${error}`);
    return c.json({ error: "Failed to create new lesson" }, 500);
  }
};

export const deleteCourse = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const courseId = c.req.param("id");

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return c.json({ error: "Invalid course ID format" }, 400);
    }

    const result = await CoursesModel.findOneAndDelete({
      _id: courseId,
      userId
    });

    if (!result) {
      return c.json({ error: "Course not found or you don't have permission to delete it" }, 404);
    }

    await ModulesModel.deleteMany({ courseId });

    return c.json({
      data: {
        success: true,
        message: "Course deleted successfully"
      }
    });
  } catch (error) {
    logger.error(`Delete course error: ${error}`);
    return c.json({ error: "Failed to delete lesson" }, 500);
  }
};
