const FREE_MODELS = ['google/gemini-2.0-flash-lite-preview-02-05:free', 'google/gemini-2.0-pro-exp-02-05:free', 'qwen/qwen-vl-plus:free', 'qwen/qwen2.5-vl-72b-instruct:free', 'deepseek/deepseek-r1-distill-llama-70b:free', 'google/gemini-2.0-flash-thinking-exp:free', 'deepseek/deepseek-r1:free', 'sophosympatheia/rogue-rose-103b-v0.2:free', 'deepseek/deepseek-chat:free', 'google/gemini-2.0-flash-thinking-exp-1219:free', 'google/gemini-2.0-flash-exp:free', 'google/gemini-exp-1206:free', 'meta-llama/llama-3.3-70b-instruct:free', 'google/learnlm-1.5-pro-experimental:free', 'nvidia/llama-3.1-nemotron-70b-instruct:free', 'meta-llama/llama-3.2-11b-vision-instruct:free', 'google/gemini-flash-1.5-8b-exp', 'qwen/qwen-2-7b-instruct:free', 'google/gemma-2-9b-it:free', 'mistralai/mistral-7b-instruct:free', 'microsoft/phi-3-mini-128k-instruct:free', 'microsoft/phi-3-medium-128k-instruct:free', 'meta-llama/llama-3-8b-instruct:free', 'openchat/openchat-7b:free', 'undi95/toppy-m-7b:free', 'huggingfaceh4/zephyr-7b-beta:free', 'gryphe/mythomax-l2-13b:free']

// get 3 random models from FREE_MODELS
const freeModels = FREE_MODELS.sort(() => Math.random() - 0.5).slice(0, 3);



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