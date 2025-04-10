import type { Context } from "hono";
import { errors } from "../constants/errors.js";
import { generateContent } from "../../services/gemini.service.js";
import { mockSearchWeb, searchWeb } from "../../services/search.service.js";
import type { ImageResult, SearchResult } from "../../types/results.js";
import { env } from "../../config/env.js";
import logger from "../../config/logger.js";

export const generateController = async (c: Context) => {
  try {
    const { prompt } = await c.req.json();

    if (!prompt) {
      return c.json(errors[400], 400);
    }

    const systemPrompt = env.SYSTEM_PROMPT;

    const userPrompt = `User topic: ${prompt}`;
    const finalPrompt = `${systemPrompt}\n\n${userPrompt}`;

    const response = await generateContent(finalPrompt);
    if (!response) {
      return c.json(errors[500], 500);
    }

    let jsonStr = response;
    if (response.includes("```json")) {
      jsonStr = response.split("```json")[1].split("```")[0].trim();
    } else if (response.includes("```")) {
      jsonStr = response.split("```")[1].split("```")[0].trim();
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonStr);
      if (!parsedResponse) {
        return c.json(errors[500], 500);
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      return c.json(
        { ...errors[500], details: "Failed to parse Gemini response" },
        500
      );
    }

    const { modules } = parsedResponse;

    for (const module of modules) {
      module.images = [];
      const imageResponse = (await searchWeb(
        module.title,
        "images"
      )) as ImageResult;

      if (imageResponse.images) {
        for (let i = 0; i < Math.min(3, imageResponse.images.length); i++) {
          const image = imageResponse.images[i];
          module.images.push({
            title: image.title,
            imageUrl: image.imageUrl,
          });
        }
      }

      module.externalLinks = [];
      const urlsResponse = (await searchWeb(
        module.title,
        "search"
      )) as SearchResult;

      if (urlsResponse.organic) {
        for (let i = 0; i < Math.min(5, urlsResponse.organic.length); i++) {
          const url = urlsResponse.organic[i];
          module.externalLinks.push({
            title: url.title,
            link: url.link,
          });
        }
      }
    }

    const responseData = {
      title: parsedResponse.title,
      description: parsedResponse.description,
      totalDuration: parsedResponse.totalDuration,
      targetAudience: parsedResponse.targetAudience,
      learningOutcomes: parsedResponse.learningOutcomes,
      modules: modules,
    };

    return c.json({
      data: responseData
    }, 200);
  } catch (error) {
    logger.error("Error in generateController:", error);
    return c.json(
      { ...errors[500], details: "Internal Server Error" },
      500
    );
  }
};
