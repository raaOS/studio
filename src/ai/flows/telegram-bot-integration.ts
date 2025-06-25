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
});
export type SendTelegramUpdateInput = z.infer<typeof SendTelegramUpdateInputSchema>;

const SendTelegramUpdateOutputSchema = z.object({
  success: z.boolean().describe('Whether the message was sent successfully.'),
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
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken || botToken === 'YOUR_BOT_TOKEN_HERE') {
      console.error('TELEGRAM_BOT_TOKEN is not set in the .env file.');
      return { success: false };
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Telegram API error: ${response.statusText}`, errorData);
        throw new Error(`Telegram API error: ${errorData.description || response.statusText}`);
      }

      const data = await response.json();
      return { success: data.ok };

    } catch (error: any) {
      console.error('Error sending Telegram update:', error);
      return { success: false };
    }
  }
);
