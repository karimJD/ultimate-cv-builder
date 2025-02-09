"use server";

import { createAIClient } from './apiClient';
import { CVStructure } from './types';

function initializeAIClient() {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openrouter = process.env.OPENROUTER_API_KEY;

  if (openaiKey) {
    return createAIClient(openaiKey, 'openai');
  } 
  if (geminiKey) {
    return createAIClient(geminiKey, 'gemini');
  }
  if (openrouter) {
    return createAIClient(openrouter, 'openrouter');
  }
  throw new Error('No API key provided for either OpenAI or Gemini');
}

export async function generateCV(cv, jobDescription) {
  try {
    const { client, model , models } = initializeAIClient();

    const response = await client.chat.completions.create({
      model,
      models,
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
    logSubmission(response)
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating CV:', error);
    throw error;
  }
}


function logSubmission(submission) {
  if (!submission || typeof submission !== "object") {
      console.error("Invalid submission data");
      return;
  }

  const {
      id,
      provider,
      model,
      created,
      choices,
      usage
  } = submission;

  console.log("📝 Submission Details:");
  console.log(`🔹 ID: ${id}`);
  console.log(`🔹 Provider: ${provider}`);
  console.log(`🔹 Model: ${model}`);
  console.log(`🔹 Created: ${new Date(created * 1000).toLocaleString()}`);
  console.log(`🔹 Finish Reason: ${choices?.[0]?.finish_reason || "Unknown"}`);
  console.log(`🔹 Tokens Used:`);
  console.log(`   - Prompt Tokens: ${usage?.prompt_tokens}`);
  console.log(`   - Completion Tokens: ${usage?.completion_tokens}`);
  console.log(`   - Total Tokens: ${usage?.total_tokens}`);
}