import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.ts";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

export const generateContent = async(prompt: string) => {
  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt
  })

  return response.text
}
