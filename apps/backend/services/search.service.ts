import { env } from "../config/env.ts"
import type { ImageResult, SearchResult } from "../types/results.ts"
import { imagesResult, searchResult } from "./sample.service.ts"

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
    throw new Error("Failed to fetch data from Serper API")
  }

  const result = await response.json()
  if (result.error) {
    throw new Error(result.error)
  }

  return result.data
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
