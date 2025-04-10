import { env } from "../config/env.js"
import type { ImageResult, SearchResult } from "../types/results.js"
import { imagesResult, searchResult } from "./sample.service.js"

export const searchWeb = async(q: string, type: "search" | "images") => {
  let data = JSON.stringify({
    q,
    gl: "in",
    num: 3,
  })

  const response = await fetch(`https://google.serper.dev/${type}`, {
    method: "POST",
    headers: {
      "X-API-KEY": env.SERPER_API_KEY,
      "Content-Type": "application/json",
    },
    body: data,
  })

  if (!response.ok) {
    console.error("Failed to fetch data from Serper API")
    throw new Error("Failed to fetch data from Serper API")
  }

  const result = await response.json()
  if (result.error) {
    console.error("Error from Serper API:", result.error)
    throw new Error(result.error)
  }

  return result
}

export const mockSearchWeb = async(q: string, type: "search" | "images") => {
  if (type === "search") {
    return searchResult as SearchResult
  } else if (type === "images") {
    return imagesResult as ImageResult
  } else {
    throw new Error("Invalid type")
  }
}
