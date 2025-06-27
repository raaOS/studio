'use server';

/**
 * @fileOverview Implements a Genkit flow for responding to incoming Telegram messages.
 * This file is triggered by a webhook from Telegram.
 * - processTelegramWebhook - Processes a webhook call from Telegram.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { sendTelegramUpdate } from './telegram-bot-integration';
import { createOrderFolder } from './create-drive-folder';

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

// This schema should match the payload sent from the website
const OrderPayloadSchema = z.object({
    customer: z.object({
      name: z.string(),
      phone: z.string(),
    }),
    cartItems: z.array(z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      brief: z.record(z.string()),
      budgetTier: z.string(),
      budgetName: z.string(),
    })),
    totalPrice: z.number(),
    paymentMethod: z.enum(['dp', 'lunas']),
  });

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
}

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
      return { success: true };
    }

    // Check for /start command with an order payload
    if (text.startsWith('/start ')) {
      try {
        const base64Payload = text.substring(7); // remove '/start '
        const decodedJson = Buffer.from(base64Payload, 'base64').toString('utf-8');
        const orderData = OrderPayloadSchema.parse(JSON.parse(decodedJson));
        
        const orderId = `DSN-${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')}`;
        const customer = orderData.customer;

        await sendTelegramUpdate({
            telegramId: String(chatId),
            message: `⏳ Terima kasih, ${customer.name}! Pesanan Anda dengan ID \`${orderId}\` sedang kami siapkan...`,
        });

        const folderResult = await createOrderFolder({
            orderId: orderId,
            customerName: customer.name,
            folderTemplate: '[OrderID] - [CustomerName]',
        });

        const orderDetails = orderData.cartItems.map(item => `- ${item.name} (${item.budgetName}) x${item.quantity}`).join('\n');
        const folderUrl = folderResult.success && folderResult.folderUrl ? folderResult.folderUrl : 'Gagal dibuat.';
        
        const confirmationMessage = `✅ *Pesanan Anda Diterima!*

*Order ID:* \`${orderId}\`
*Nama:* ${customer.name}
*Telepon:* ${customer.phone}

*Rincian Pesanan:*
${orderDetails}

*Total Tagihan:* ${formatRupiah(orderData.totalPrice)}
*Metode Bayar:* ${orderData.paymentMethod === 'dp' ? 'DP 50%' : 'Lunas'}

*Folder Google Drive:*
${folderUrl}

Terima kasih! Tim kami akan segera menghubungi Anda untuk langkah selanjutnya. Simpan pesan ini sebagai bukti pesanan Anda.`;

        await sendTelegramUpdate({
            telegramId: String(chatId),
            message: confirmationMessage,
        });

        console.log(`Order ${orderId} for chat ID ${chatId} processed successfully.`);

      } catch (e: any) {
        console.error("Failed to process order payload:", e);
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: `Terjadi kesalahan saat memproses pesanan Anda. Data pesanan tidak valid. Silakan coba lagi dari website atau hubungi admin. Error: ${e.message}`,
        });
      }
    } else if (text.toLowerCase() === '/start') {
      const welcomeMessage = `Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".`;
      await sendTelegramUpdate({
        telegramId: String(chatId),
        message: welcomeMessage,
      });
    }

    return { success: true };
  }
);
