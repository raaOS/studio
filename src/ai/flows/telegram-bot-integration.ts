'use server';

/**
 * @fileOverview Implements a Genkit flow for sending order updates and payment reminders via Telegram.
 *
 * - sendTelegramUpdate - Sends a message to a Telegram user with order details.
 * - SendTelegramUpdateInput - The input type for the sendTelegramUpdate function.
 * - SendTelegramUpdateOutput - The return type for the sendTelegramUpdate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendTelegramUpdateInputSchema = z.object({
  telegramId: z.string().describe('The Telegram user ID or @username to send the message to.'),
  message: z.string().describe('The message to send to the user.'),
  orderId: z.string().optional().describe('The ID of the order, if applicable.'),
  botToken: z.string().optional().describe('The Telegram Bot Token to use. If not provided, it will use the one from environment variables.'),
});
export type SendTelegramUpdateInput = z.infer<typeof SendTelegramUpdateInputSchema>;

const SendTelegramUpdateOutputSchema = z.object({
  success: z.boolean().describe('Whether the message was sent successfully.'),
  error: z.string().optional().describe('Error message if the update failed.'),
});
export type SendTelegramUpdateOutput = z.infer<typeof SendTelegramUpdateOutputSchema>;

export async function sendTelegramUpdate(input: SendTelegramUpdateInput): Promise<SendTelegramUpdateOutput> {
  return sendTelegramUpdateFlow(input);
}

const sendTelegramUpdateFlow = ai.defineFlow(
  {
    name: 'sendTelegramUpdateFlow',
    inputSchema: SendTelegramUpdateInputSchema,
    outputSchema: SendTelegramUpdateOutputSchema,
  },
  async (input) => {
    const botToken = input.botToken || process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      const errorMsg = 'TELEGRAM_BOT_TOKEN is not set in environment variables or passed directly.';
      console.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      
      let fullMessage = input.message;
      if (input.orderId) {
          fullMessage += `\n\nOrder ID: ${input.orderId}`;
      }
      
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: input.telegramId,
          text: fullMessage,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        const errorMessage = data.description || 'Unknown error';
        console.error(`Telegram API error: ${errorMessage}`, data);
        return { success: false, error: `Telegram API Error: ${errorMessage}` };
      }

      return { success: true };

    } catch (error: any) {
      console.error('Error sending Telegram update:', error);
      return { success: false, error: error.message || 'An unexpected error occurred.' };
    }
  }
);
