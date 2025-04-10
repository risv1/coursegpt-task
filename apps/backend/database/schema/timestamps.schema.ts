import { z } from "zod";

export const withTimestamps = {
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: (value: Date) => {
        return z.date().safeParse(value).success;
      },
      message: "Creation date must be a valid date",
    },
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: (value: Date) => {
        return z.date().safeParse(value).success;
      },
      message: "Update date must be a valid date",
    },
  },
  deletedAt: {
    type: Date,
    default: null,
    validate: {
      validator: (value: Date) => {
        return z.date().nullable().safeParse(value).success;
      },
      message: "Deletion date must be a valid date or null",
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
    validate: {
      validator: (value: boolean) => {
        return z.boolean().safeParse(value).success;
      },
      message: "isDeleted must be a boolean",
    },
  },
};
