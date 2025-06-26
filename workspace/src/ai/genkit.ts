import {genkit, type GenkitPlugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins: GenkitPlugin[] = [];

// The googleAI() plugin is conditionally enabled to prevent startup errors.
// To use generative AI features, you must:
// 1. Get a Google AI API key from https://aistudio.google.com/app/apikey
// 2. Add it to the .env file as: GEMINI_API_KEY="YOUR_API_KEY_HERE"
// The application will run without the key, but AI features will be disabled.
if (process.env.GEMINI_API_KEY) {
  plugins.push(googleAI());
}

export const ai = genkit({
  plugins,
});
