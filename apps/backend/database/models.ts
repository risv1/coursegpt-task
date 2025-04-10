import mongoose from "mongoose";
import { Users } from "./schema/users.schema.js";
import { Courses } from "./schema/courses.schema.js";
import { Modules } from "./schema/modules.schema.js";

export const UsersModel = mongoose.model("Users", Users);
export const CoursesModel = mongoose.model("Courses", Courses);
export const ModulesModel = mongoose.model("Modules", Modules);

export const registerModels = () => {
  const registeredModels = Object.keys(mongoose.models).join(", ");
  return registeredModels;
}
