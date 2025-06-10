import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY, // Use env variable
  baseURL: 'https://api.anthropic.com/v1/',
});
