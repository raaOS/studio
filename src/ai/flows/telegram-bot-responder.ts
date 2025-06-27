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
import { adminDb } from '@/lib/firebase-admin';

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

// This schema should match the payload stored in Firestore
const OrderPayloadSchema = z.object({
    customer: z.object({
      name: z.string(),
      phone: z.string(),
      telegram: z.string(),
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
    const revisionKeywords = ['revisi', 'ubah', 'ganti', 'perbaiki', 'tolong perbaiki'];
    const approvalKeywords = ['setuju', 'ok', 'approve', 'lanjutkan', 'sip', 'sudah bagus', 'oke'];

    // PRIORITY 1: Check for /start command with an order payload ID
    if (lowerCaseText.startsWith('/start ')) {
      const pendingOrderId = incomingText.substring(7); // remove '/start '

      if (!adminDb) {
        console.error('Firebase Admin not initialized. Cannot fetch pending order. Check FIREBASE_SERVICE_ACCOUNT_JSON.');
        await sendTelegramUpdate({
            telegramId: String(chatId),
            message: '🚨 Terjadi kesalahan di sisi server. Konfigurasi database belum lengkap. Mohon hubungi admin.',
        });
        return { success: false };
      }

      try {
        const orderDocRef = adminDb.collection('pendingOrders').doc(pendingOrderId);
        const orderDoc = await orderDocRef.get();

        if (!orderDoc.exists) {
            throw new Error(`Pending order with ID ${pendingOrderId} not found.`);
        }
        
        const orderData = OrderPayloadSchema.parse(orderDoc.data());
        
        await orderDocRef.delete();

        const orderId = `DSN-${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')}`;
        const customer = orderData.customer;

        await sendTelegramUpdate({
            telegramId: String(chatId),
            message: `⏳ Terima kasih, ${customer.name}! Pesanan Anda dengan ID \`${orderId}\` sedang kami siapkan...`,
        });

        createOrderFolder({
            orderId: orderId,
            customerName: customer.name,
            folderTemplate: '[OrderID] - [CustomerName]',
        });

        const orderDetails = orderData.cartItems.map(item => `- ${item.name} (${item.budgetName}) x${item.quantity}`).join('\n');
        
        const confirmationMessage = `✅ *Pesanan Anda Diterima!*\n\n*Order ID:* \`${orderId}\`\n*Nama:* ${customer.name}\n*Telepon:* ${customer.phone}\n*Telegram (dari form):* ${customer.telegram}\n\n*Rincian Pesanan:*\n${orderDetails}\n\n*Total Tagihan:* ${formatRupiah(orderData.totalPrice)}\n*Metode Bayar:* ${orderData.paymentMethod === 'dp' ? 'DP 50%' : 'Lunas'}\n\nTerima kasih! Tim kami akan segera menghubungi Anda untuk langkah selanjutnya. Simpan pesan ini sebagai bukti pesanan Anda.`;

        await sendTelegramUpdate({
            telegramId: String(chatId),
            message: confirmationMessage,
        });

        console.log(`Order ${orderId} for chat ID ${chatId} processed successfully.`);

      } catch (e: any) {
        console.error("Failed to process order payload from Firestore:", e);
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: `Terjadi kesalahan saat mengambil data pesanan Anda. Tautan mungkin sudah tidak valid atau kedaluwarsa. Silakan coba lagi dari website atau hubungi admin.`,
        });
      }
    } 
    // PRIORITY 2: Check for a simple /start command
    else if (lowerCaseText === '/start') {
      const welcomeMessage = `Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".`;
      await sendTelegramUpdate({
        telegramId: String(chatId),
        message: welcomeMessage,
      });
    }
    // PRIORITY 3: Check for revision keywords
    else if (revisionKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: `✍️ *Permintaan Revisi Dicatat!*

Catatan revisi Anda telah kami terima dan akan diteruskan ke tim desainer. (Ini adalah simulasi, status pesanan belum benar-benar berubah).`,
        });
    }
    // PRIORITY 4: Check for approval keywords
    else if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        await sendTelegramUpdate({
          telegramId: String(chatId),
          message: `✅ *Persetujuan Diterima!*

Terima kasih atas konfirmasi Anda. Kami akan segera menyelesaikan pesanan Anda dan mengirimkan semua file final. (Ini adalah simulasi, status pesanan belum benar-benar berubah).`,
        });
    }
    // PRIORITY 5: Fallback for any other message
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
