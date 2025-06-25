'use server';

/**
 * @fileOverview Implements a Genkit flow for responding to incoming Telegram messages.
 * This file is triggered by a webhook from Telegram.
 * - processTelegramWebhook - Processes a webhook call from Telegram.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { sendTelegramUpdate } from './telegram-bot-integration';

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
    const text = payload.message?.text?.trim();

    if (!chatId || !text) {
      console.log('Webhook received without chat ID or text. Ignoring.');
      return { success: true }; // Success to avoid Telegram retries
    }

    // Only respond to the /start command for now.
    if (text.toLowerCase() === '/start') {
      const welcomeMessage = `Selamat datang di Urgent Studio Bot! 🤖\n\nSaya akan mengirimkan notifikasi penting seputar pesanan Anda di sini.\n\n*Chat ID Anda:* \`${chatId}\`\n\nSilakan gunakan Chat ID ini di panel admin jika Anda adalah admin, atau berikan kepada kami jika diminta.`;

      try {
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: welcomeMessage,
        });
      } catch (e) {
        console.error("Failed to send welcome message:", e);
        // Don't re-throw, just log.
      }
    }

    return { success: true };
  }
);
