'use server';

/**
 * @fileOverview Implements a Genkit flow for simulating Telegram bot responses.
 * This flow does not actually send messages but returns the message content that would be sent.
 *
 * - simulateTelegramResponse - Simulates the bot's response to a given message.
 * - SimulateTelegramResponseInput - Input for the simulation.
 * - SimulateTelegramResponseOutput - Output from the simulation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimulateTelegramResponseInputSchema = z.object({
  text: z.string().describe('The message text sent by the user.'),
  chatId: z.number().describe('The chat ID of the user.'),
});
export type SimulateTelegramResponseInput = z.infer<typeof SimulateTelegramResponseInputSchema>;

const SimulateTelegramResponseOutputSchema = z.object({
  response: z.string().describe('The message that the bot would send back.'),
});
export type SimulateTelegramResponseOutput = z.infer<typeof SimulateTelegramResponseOutputSchema>;


export async function simulateTelegramResponse(input: SimulateTelegramResponseInput): Promise<SimulateTelegramResponseOutput> {
  return simulateTelegramResponseFlow(input);
}


const simulateTelegramResponseFlow = ai.defineFlow(
  {
    name: 'simulateTelegramResponseFlow',
    inputSchema: SimulateTelegramResponseInputSchema,
    outputSchema: SimulateTelegramResponseOutputSchema,
  },
  async ({ text, chatId }) => {
    const lowerCaseText = text.toLowerCase();
    
    // This logic should mirror `processTelegramWebhookFlow` exactly.
    const revisionKeywords = ['revisi', 'ubah', 'ganti', 'perbaiki', 'tolong perbaiki'];
    const approvalKeywords = ['setuju', 'ok', 'approve', 'lanjutkan', 'sip', 'sudah bagus', 'oke'];

    let responseMessage = '';

    // PRIORITY 1: Check for revision keywords first as they are more specific
    if (revisionKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        responseMessage = `✍️ *Permintaan Revisi Dicatat!*\n\nCatatan revisi Anda telah kami terima dan akan diteruskan ke tim desainer. (Ini adalah simulasi, status pesanan belum benar-benar berubah).`;
    }
    // PRIORITY 2: Check for approval keywords
    else if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        responseMessage = `✅ *Persetujuan Diterima!*\n\nTerima kasih atas konfirmasi Anda. Kami akan segera menyelesaikan pesanan Anda dan mengirimkan semua file final. (Ini adalah simulasi, status pesanan belum benar-benar berubah).`;
    }
    // PRIORITY 3: Check for /start command with an order payload ID (simulated)
    else if (lowerCaseText.startsWith('/start ')) {
      responseMessage = `(Simulasi) Menerima pesanan dengan payload: ${text.substring(7)}. Bot akan memprosesnya dan mengirim konfirmasi.`;
    } 
    // PRIORITY 4: Check for a simple /start command
    else if (lowerCaseText === '/start') {
      responseMessage = `Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".`;
    }
    // PRIORITY 5: Fallback for any other message
    else {
      responseMessage = `Maaf, saya belum mengerti maksud Anda. \n\nJika ingin menyetujui desain, balas pesan pratinjau dengan "Setuju". \nJika ingin revisi, balas pesan pratinjau dengan "Revisi: [catatan Anda]".`;
    }

    return { response: responseMessage };
  }
);
