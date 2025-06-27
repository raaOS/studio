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
    const incomingText = payload.message?.text?.trim();

    if (!chatId || !incomingText) {
      console.log('Webhook received without chat ID or text. Ignoring.');
      return { success: true }; // Success to avoid Telegram retries
    }

    const lowerCaseText = incomingText.toLowerCase();

    // Keyword definitions for natural language commands
    const approvalKeywords = ['setuju', 'ok', 'approve', 'lanjutkan', 'sip', 'sudah bagus'];
    const revisionKeywords = ['revisi', 'ubah', 'ganti', 'perbaiki', 'tolong perbaiki'];

    // 1. Check for /start command with an order payload
    if (lowerCaseText.startsWith('/start ')) {
      try {
        const base64Payload = incomingText.substring(7); // remove '/start '
        const decodedJson = Buffer.from(base64Payload, 'base64').toString('utf-8');
        const orderData = OrderPayloadSchema.parse(JSON.parse(decodedJson));
        
        const orderId = `DSN-${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')}`;
        const customer = orderData.customer;

        await sendTelegramUpdate({
            telegramId: String(chatId),
            message: `⏳ Terima kasih, ${customer.name}! Pesanan Anda dengan ID \`${orderId}\` sedang kami siapkan...`,
        });

        await createOrderFolder({
            orderId: orderId,
            customerName: customer.name,
            folderTemplate: '[OrderID] - [CustomerName]',
        });

        const orderDetails = orderData.cartItems.map(item => `- ${item.name} (${item.budgetName}) x${item.quantity}`).join('\n');
        
        const confirmationMessage = `✅ *Pesanan Anda Diterima!*

*Order ID:* \`${orderId}\`
*Nama:* ${customer.name}
*Telepon:* ${customer.phone}

*Rincian Pesanan:*
${orderDetails}

*Total Tagihan:* ${formatRupiah(orderData.totalPrice)}
*Metode Bayar:* ${orderData.paymentMethod === 'dp' ? 'DP 50%' : 'Lunas'}

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
    } 
    // 2. Check for approval keywords
    else if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: `✅ *Persetujuan Diterima!*

Terima kasih atas konfirmasi Anda. Kami akan segera menyelesaikan pesanan Anda dan mengirimkan semua file final. (Ini adalah simulasi, status pesanan belum benar-benar berubah).`,
        });
    }
    // 3. Check for revision keywords
    else if (revisionKeywords.some(keyword => lowerCaseText.startsWith(keyword))) {
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: `✍️ *Permintaan Revisi Dicatat!*

Catatan revisi Anda telah kami terima dan akan diteruskan ke tim desainer. (Ini adalah simulasi, status pesanan belum benar-benar berubah).`,
        });
    }
    // 4. Check for a simple /start command
    else if (lowerCaseText === '/start') {
      const welcomeMessage = `Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".`;
      await sendTelegramUpdate({
        telegramId: String(chatId),
        message: welcomeMessage,
      });
    } 
    // 5. Fallback for any other message
    else {
      await sendTelegramUpdate({
        telegramId: String(chatId),
        message: `Maaf, saya belum mengerti maksud Anda. 

Jika ingin menyetujui desain, balas pesan pratinjau dengan "Setuju". 
Jika ingin revisi, balas pesan pratinjau dengan "Revisi: [catatan Anda]".`,
      });
    }

    return { success: true };
  }
);
