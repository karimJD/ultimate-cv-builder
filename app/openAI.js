"use server";
import { OpenAI } from "openai";

const structure = {
  name: "string",
  contact_info: {
    email: "string",
    phone: "string",
    location: "string",
    linkedin: "string",
    portfolio: "string",
  },
  summary: "string",
  skills: {
    programming_languages: ["string"],
    frameworks_libraries: ["string"],
    tools: ["string"],
    other: ["string"],
  },
  experience: [
    {
      job_title: "string",
      company: "string",
      location: "string",
      start_date: "string",
      end_date: "string",
      responsibilities: ["string"],
    },
  ],
  education: [
    {
      degree: "string",
      institution: "string",
      location: "string",
    },
  ],
  languages: {
    English: "string",
    French: "string",
    "Arabic ": "string",
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCV = async (cv, jobDescription) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an expert resume formatter." },
      { role: "user", content: `Here is my resume: ${JSON.stringify(cv)}` },
      {
        role: "user",
        content: `Here is the job description: ${jobDescription}`,
      },
      {
        role: "user",
        content: `Generate a JSON-formatted resume tailored to this job, you can adjust the experiences responsabilties to make it perfect for the job description without removing any experience. The output should be a valid JSON object that follows this structure: ${JSON.stringify(
          structure
        )}. Ensure it is a structured JSON, not a string. If a field is missing in the CV, leave it empty instead of removing it.`,
      },
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  return response.choices[0].message.content;
};
