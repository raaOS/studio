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
  orderId: z.string().describe('The ID of the order.'),
  updateMessage: z.string().describe('The message to send to the user.'),
  botToken: z.string().describe('The Telegram Bot API Token.'),
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
    const botToken = input.botToken?.trim();

    if (!botToken) {
      const errorMsg = 'Telegram Bot Token is not provided.';
      console.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    try {
      const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const fullMessage = `${input.updateMessage}\n\nOrder ID: ${input.orderId}`;
      
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: input.telegramId,
          text: fullMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.description || response.statusText;
        console.error(`Telegram API error: ${response.statusText}`, data);
        return { success: false, error: `Telegram API Error: ${errorMessage}` };
      }

      return { success: data.ok };

    } catch (error: any) {
      console.error('Error sending Telegram update:', error);
      return { success: false, error: error.message || 'An unexpected error occurred.' };
    }
  }
);
