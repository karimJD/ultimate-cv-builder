const API_URL = "https://openrouter.ai/api/v1/models";

async function getRandomFreeModels(count = 3) {
  try {
      const response = await fetch(API_URL);
      if (!response.ok) {
          console.error(`Error: Unable to fetch models (Status Code: ${response.status})`);
          return [];
      }

      const data = await response.json();
      const freeModels = (data?.data || [])
          .filter(model => model.pricing?.prompt === "0")
          .map(model => model.id);

      // Shuffle and pick `count` random models
      return freeModels
          .sort(() => Math.random() - 0.5) // Shuffle the array
          .slice(0, count); // Pick the first `count` elements

  } catch (error) {
      console.error("Error fetching models:", error);
      return [];
  }
}

// Example usage:
const freeModels = await getRandomFreeModels();
console.log(freeModels);



export const AI_CONFIG = {
  openai: {
    model: 'gpt-3.5-turbo',
    baseUrl: 'https://api.openai.com/v1',
  },
  gemini: {
    model: 'gemini-1.5-flash',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
  },
  openrouter: {
    baseUrl : "https://openrouter.ai/api/v1",
    models : freeModels
  }
};