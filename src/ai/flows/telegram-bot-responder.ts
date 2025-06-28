'use server';

/**
 * @fileOverview Implements a Genkit flow for responding to incoming Telegram messages.
 * This file is triggered by a webhook from Telegram. It now delegates conversational logic.
 * - processTelegramWebhook - Processes a webhook call from Telegram.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { sendTelegramUpdate } from './telegram-bot-integration';
import { getTelegramResponse } from '../logic/bot-logic';

// This schema defines the part of the Telegram webhook payload we care about.
const TelegramWebhookPayloadSchema = z.object({
  message: z.object({
    text: z.string().optional(),
    chat: z.object({
      id: z.number(),
    }),
  }),
});
export type TelegramWebhookPayload = z.infer<typeof TelegramWebhookPayloadSchema>;

export async function processTelegramWebhook(payload: TelegramWebhookPayload): Promise<{ success: boolean }> {
  return processTelegramWebhookFlow(payload);
}

const processTelegramWebhookFlow = ai.defineFlow(
  {
    name: 'processTelegramWebhookFlow',
    inputSchema: TelegramWebhookPayloadSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (payload) => {
    const chatId = payload.message?.chat?.id;
    const incomingText = payload.message?.text?.trim();

    if (!chatId || !incomingText) {
      console.log('Webhook received without chat ID or text. Ignoring.');
      return { success: true }; // Success to avoid Telegram retries
    }

    // For all messages, delegate to the shared logic to get the response.
    const responseMessage = await getTelegramResponse(incomingText, chatId);
    
    // And then perform the real action of sending the message.
    await sendTelegramUpdate({
      telegramId: String(chatId),
      message: responseMessage,
    });

    return { success: true };
  }
);
