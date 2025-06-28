'use server';

import { analyzeRevisionRequest } from '../flows/analyze-revision-request';

/**
 * @fileOverview The single source of truth for conversational bot logic.
 * This module determines WHAT to say, but does not send the message itself.
 *
 * - getTelegramResponse - Takes user input and returns the appropriate bot response string.
 */

/**
 * Analyzes user text and returns the appropriate bot response.
 * This function contains the core conversational logic.
 * @param text The raw text from the user.
 * @param chatId The user's chat ID.
 * @returns A promise that resolves to the bot's response message string.
 */
export async function getTelegramResponse(text: string, chatId: number): Promise<string> {
    const lowerCaseText = text.toLowerCase();
    
    const revisionKeywords = ['revisi', 'ubah', 'ganti', 'perbaiki', 'tolong perbaiki'];
    const approvalKeywords = ['setuju', 'ok', 'oke', 'approve', 'lanjutkan', 'sip', 'sudah bagus'];

    // 1. Check for revision keywords first.
    if (revisionKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        // Instead of a simple response, we now analyze the request.
        try {
            const analysis = await analyzeRevisionRequest({ requestText: text });
            
            if (analysis.classification === 'simple_revision') {
                // In a real app, update order status to 'Sedang Direvisi'
                return `✍️ *Permintaan Revisi Dicatat!*\n\nCatatan revisi Anda telah kami terima dan akan diteruskan ke tim desainer. Status pesanan Anda akan segera diperbarui.\n\n*(AI-Analysis: Revisi wajar)*`;
            } else { // 'scope_creep'
                // In a real app, update order status to 'Perlu Tinjauan Owner'
                return `⚠️ *Potensi Perubahan Lingkup Kerja Terdeteksi!*\n\nPermintaan Anda: "*${text.substring(0, 50)}...*" sepertinya memerlukan tambahan di luar brief awal.\n\nTim kami akan meninjau permintaan ini terlebih dahulu dan akan segera menghubungi Anda kembali. Terima kasih atas pengertiannya.\n\n*(AI-Analysis: Tambahan brief)*`;
            }
        } catch (error) {
            console.error("Revision analysis AI failed:", error);
            // Fallback response if AI fails
            return 'Terima kasih atas feedback Anda. Tim kami akan meninjaunya secara manual dan segera menghubungi Anda.';
        }
    }
    
    // 2. Check for approval keywords.
    if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        // In a real app, you might trigger the finalization process here.
        return `✅ *Persetujuan Diterima!*\n\nTerima kasih atas konfirmasi Anda. Kami akan segera menyelesaikan pesanan Anda dan mengirimkan semua file final. Status pesanan Anda akan segera diperbarui.`;
    }

    // 3. Check for a simple /start command.
    if (lowerCaseText === '/start') {
      return `Selamat datang di Urgent Studio Bot! 🤖\n\nSaya akan mengirimkan notifikasi penting seputar pesanan Anda di sini.\n\n*Chat ID Anda:* \`${chatId}\`\n\nSilakan gunakan Chat ID ini di panel admin jika Anda adalah admin, atau berikan kepada kami jika diminta.`;
    }
    
    // 4. Fallback for any other message.
    return `Maaf, saya belum mengerti maksud Anda. \n\n- Untuk menyetujui desain, balas pesan pratinjau dengan kata kunci seperti "Setuju" atau "OK". \n- Untuk meminta perbaikan, balas dengan "Revisi: [catatan Anda]".`;
}
