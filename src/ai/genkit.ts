import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    // The googleAI() plugin is currently disabled to prevent API key errors.
    // To use generative AI features, you must:
    // 1. Get a Google AI API key from https://aistudio.google.com/app/apikey
    // 2. Add it to the .env file as: GEMINI_API_KEY="YOUR_API_KEY_HERE"
    // 3. Uncomment the `googleAI()` line below.
    googleAI(),
  ],
});
