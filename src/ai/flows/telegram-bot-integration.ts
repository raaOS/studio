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
  telegramId: z.string().describe('The Telegram user ID to send the message to.'),
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

const sendTelegramUpdatePrompt = ai.definePrompt({
  name: 'sendTelegramUpdatePrompt',
  input: {schema: SendTelegramUpdateInputSchema},
  output: {schema: SendTelegramUpdateOutputSchema},
  prompt: `Send the following message to the Telegram user with ID {{telegramId}}:

{{updateMessage}}

Order ID: {{orderId}}`,
});

const sendTelegramUpdateFlow = ai.defineFlow(
  {
    name: 'sendTelegramUpdateFlow',
    inputSchema: SendTelegramUpdateInputSchema,
    outputSchema: SendTelegramUpdateOutputSchema,
  },
  async input => {
    try {
      // Simulate sending a message to Telegram (replace with actual API call)
      console.log(`Sending message to Telegram user ${input.telegramId}: ${input.updateMessage}`);
      // In a real implementation, you would use a Telegram bot API to send the message.
      // For example:
      // const telegramApiUrl = `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage`;
      // const response = await fetch(telegramApiUrl, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     chat_id: input.telegramId,
      //     text: input.updateMessage,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error(`Telegram API error: ${response.statusText}`);
      // }

      // const data = await response.json();
      // return { success: data.ok };

      // For now, we just return a successful response.
      const {output} = await sendTelegramUpdatePrompt(input);
      return {success: true};
    } catch (error: any) {
      console.error('Error sending Telegram update:', error);
      return {success: false};
    }
  }
);
