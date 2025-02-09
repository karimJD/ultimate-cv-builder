"use server";

import { createAIClient } from './apiClient';
import { CVStructure } from './types';

function initializeAIClient() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (openaiKey) {
    return createAIClient(openaiKey, 'openai');
  } 
  if (geminiKey) {
    return createAIClient(geminiKey, 'gemini');
  }
  throw new Error('No API key provided for either OpenAI or Gemini');
}

export async function generateCV(cv, jobDescription) {
  try {
    const { client, model } = initializeAIClient();

    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You are an expert resume formatter." },
        { role: "user", content: `Here is my resume: ${JSON.stringify(cv)}` },
        { role: "user", content: `Here is the job description: ${jobDescription}` },
        {
          role: "user",
          content: `Generate a JSON-formatted resume tailored to this job, you can adjust the experiences responsibilities to make it perfect for the job description without removing any experience. The output should be a valid JSON object that follows this structure: ${JSON.stringify(CVStructure)}. Ensure it is a structured JSON, not a string. If a field is missing in the CV, leave it empty instead of removing it.`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
}