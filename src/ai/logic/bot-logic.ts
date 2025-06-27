'use server';

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

    // The order of checks is the priority of the bot's logic.
    // 1. Check for revision keywords first.
    if (revisionKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        // In a real app, you might trigger a database update here to change the order status.
        return `✍️ *Permintaan Revisi Dicatat!*\n\nCatatan revisi Anda telah kami terima dan akan diteruskan ke tim desainer. Status pesanan Anda akan segera diperbarui.`;
    }
    
    // 2. Check for approval keywords.
    if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        // In a real app, you might trigger the finalization process here.
        return `✅ *Persetujuan Diterima!*\n\nTerima kasih atas konfirmasi Anda. Kami akan segera menyelesaikan pesanan Anda dan mengirimkan semua file final. Status pesanan Anda akan segera diperbarui.`;
    }

    // 3. Check for a simple /start command.
    if (lowerCaseText === '/start') {
      return `Selamat datang di Urgent Studio Bot! 🤖\n\nUntuk memesan, silakan kembali ke website kami, isi keranjang Anda, dan klik tombol "Selesaikan via Telegram".`;
    }
    
    // 4. Fallback for any other message.
    return `Maaf, saya belum mengerti maksud Anda. \n\n- Untuk menyetujui desain, balas pesan pratinjau dengan kata kunci seperti "Setuju" atau "OK". \n- Untuk meminta perbaikan, balas dengan "Revisi: [catatan Anda]".`;
}
