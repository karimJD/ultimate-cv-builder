import { OpenAI } from "openai";
import { AI_CONFIG } from "./config";

export function createAIClient(apiKey, provider = 'openai') {
  if (!apiKey) {
    throw new Error(`API key is required for ${provider}`);
  }

  const config = {
    apiKey,
    ...(provider === 'gemini' && { baseURL: AI_CONFIG[provider].baseUrl })
  };

  return {
    client: new OpenAI(config),
    model: AI_CONFIG[provider].model
  };
}