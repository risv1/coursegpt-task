import type { Context } from "hono";
import { UsersModel } from "../../database/models.js";
import { hashPassword, verifyPassword } from "../../utils/hash.utils.js";
import { generateToken, verifyToken } from "../../utils/jwt.utils.js";
import logger from "../../config/logger.js";

export const signup = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { name, email, password } = body;

    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return c.json({ error: "User with this email already exists" }, 400);
    }

    const passwordHash = await hashPassword(password);
    const user = new UsersModel({
      name,
      email,
      passwordHash,
      isGoogle: false,
      isGithub: false
    });

    await user.save();

    const token = generateToken(user._id.toString());

    return c.json({
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    }, 201);
  } catch (error) {
    logger.error(`Signup error: ${error}`);
    return c.json({ error: "Failed to create user" }, 500);
  }
};

export const signin = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    const user = await UsersModel.findOne({ email });
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    const token = generateToken(user._id.toString());

    return c.json({
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    logger.error(`Signin error: ${error}`);
    return c.json({ error: "Authentication failed" }, 500);
  }
};

export const googleAuth = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { name, email } = body;

    let user = await UsersModel.findOne({ email });

    if (!user) {
      user = new UsersModel({
        name,
        email,
        passwordHash: "GOOGLE_AUTH",
        isGoogle: true,
        isGithub: false
      });
      await user.save();
    } else if (!user.isGoogle) {
      user.isGoogle = true;
      await user.save();
    }

    const token = generateToken(user._id.toString());

    return c.json({
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    logger.error(`Google auth error: ${error}`);
    return c.json({ error: "Google authentication failed" }, 500);
  }
};

export const githubAuth = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { name, email } = body;

    let user = await UsersModel.findOne({ email });

    if (!user) {
      user = new UsersModel({
        name,
        email,
        passwordHash: "GITHUB_AUTH",
        isGoogle: false,
        isGithub: true
      });
      await user.save();
    } else if (!user.isGithub) {
      user.isGithub = true;
      await user.save();
    }

    const token = generateToken(user._id.toString());

    return c.json({
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    logger.error(`GitHub auth error: ${error}`);
    return c.json({ error: "GitHub authentication failed" }, 500);
  }
};

export const getProfile = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const user = await UsersModel.findById(userId).select("-passwordHash");

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({ data: { user } });
  } catch (error) {
    logger.error(`Get profile error: ${error}`);
    return c.json({ error: "Failed to get profile" }, 500);
  }
};
