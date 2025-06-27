'use server';

/**
 * @fileOverview Implements a Genkit flow for simulating Telegram bot responses.
 * This flow now calls the shared bot logic for maximum accuracy.
 *
 * - simulateTelegramResponse - Simulates the bot's response to a given message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getTelegramResponse } from '../logic/bot-logic';

const SimulateTelegramResponseInputSchema = z.object({
  text: z.string().describe('The message text sent by the user.'),
  chatId: z.number().describe('The chat ID of the user.'),
});

const SimulateTelegramResponseOutputSchema = z.object({
  response: z.string().describe('The message that the bot would send back.'),
});


export async function simulateTelegramResponse(input: z.infer<typeof SimulateTelegramResponseInputSchema>): Promise<z.infer<typeof SimulateTelegramResponseOutputSchema>> {
  return simulateTelegramResponseFlow(input);
}


const simulateTelegramResponseFlow = ai.defineFlow(
  {
    name: 'simulateTelegramResponseFlow',
    inputSchema: SimulateTelegramResponseInputSchema,
    outputSchema: SimulateTelegramResponseOutputSchema,
  },
  async ({ text, chatId }) => {
    // This flow is now a simple wrapper around the shared logic.
    // It gets the response string but does not perform any real actions.
    const responseMessage = await getTelegramResponse(text, chatId);
    return { response: responseMessage };
  }
);
