'use server';

/**
 * @fileOverview Implements a Genkit flow for verifying the Telegram Bot Token.
 *
 * - verifyTelegramBot - Checks if the bot token is valid by calling the getMe endpoint.
 * - VerifyTelegramBotOutput - The return type for the verifyTelegramBot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyTelegramBotOutputSchema = z.object({
  success: z.boolean().describe('Whether the token is valid.'),
  botName: z.string().optional().describe('The username of the bot if successful.'),
  error: z.string().optional().describe('Error message if the verification failed.'),
});
export type VerifyTelegramBotOutput = z.infer<typeof VerifyTelegramBotOutputSchema>;

export async function verifyTelegramBot(): Promise<VerifyTelegramBotOutput> {
  return verifyTelegramBotFlow();
}

const verifyTelegramBotFlow = ai.defineFlow(
  {
    name: 'verifyTelegramBotFlow',
    outputSchema: VerifyTelegramBotOutputSchema,
  },
  async () => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      const errorMsg = 'TELEGRAM_BOT_TOKEN is not set in environment variables.';
      console.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/getMe`;
      
      const response = await fetch(telegramApiUrl);
      const data = await response.json();

      if (data.ok) {
        return { success: true, botName: data.result.username };
      } else {
        return { success: false, error: data.description || 'Token tidak valid.' };
      }

    } catch (error: any) {
      console.error('Error verifying Telegram token:', error);
      return { success: false, error: error.message || 'An unexpected error occurred.' };
    }
  }
);
