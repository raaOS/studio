'use server';

import { analyzeRevisionRequest } from '../flows/analyze-revision-request';
import { mockOrders, mockMessageTemplates } from '@/lib/data'; // Import data for simulation

/**
 * @fileOverview The single source of truth for conversational bot logic.
 * This module determines WHAT to say, but does not send the message itself.
 *
 * - getTelegramResponse - Takes user input and returns the appropriate bot response string.
 */

// In a real app, this would be a database call.
// For now, we simulate it.
async function getOrderDetails(orderId: string) {
    return mockOrders.find(o => o.kode_order === orderId) || null;
}

export async function getTelegramResponse(text: string, chatId: number): Promise<string> {
    const lowerCaseText = text.toLowerCase();
    
    // Command Keywords
    const revisionKeywords = ['revisi', 'ubah', 'ganti', 'perbaiki', 'tolong perbaiki'];
    const approvalKeywords = ['setuju', 'ok', 'oke', 'approve', 'lanjutkan', 'sip', 'sudah bagus'];
    const cancelKeywords = ['batal', 'cancel', 'batalkan'];
    const statusKeywords = ['status', 'gimana pesanan', 'cek pesanan'];

    // Simulate finding an order associated with this chat ID.
    // In a real app, you would look up the chatId in your customer database.
    const MOCK_ORDER_ID_FOR_CHAT = '#002'; // Let's pretend this chat is for order #002
    const order = await getOrderDetails(MOCK_ORDER_ID_FOR_CHAT);

    // --- Command Handling ---

    // 1. Status Check
    if (statusKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        const template = mockMessageTemplates.find(t => t.id === 'status_check_response');
        if (!order || !template) return "Maaf, tidak ada pesanan aktif yang terhubung dengan chat ini.";
        return template.content
            .replace('{{customerName}}', order.nama_klien)
            .replace('{{orderId}}', order.kode_order)
            .replace('{{currentStatus}}', order.status_pesanan)
            .replace('{{queuePosition}}', '3') // Simulated
            .replace('{{totalInQueue}}', '10'); // Simulated
    }

    // 2. Cancellation
    if (cancelKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        if (!order) return "Maaf, tidak ada pesanan aktif yang bisa dibatalkan dari chat ini.";
        
        // Logic based on order status
        if (['Menunggu Pengerjaan', 'Sedang Dikerjakan'].includes(order.status_pesanan)) {
            const template = mockMessageTemplates.find(t => t.id === 'cancel_pre_design');
            return template ? template.content.replace('{{orderId}}', order.kode_order) : "Pembatalan diterima (pra-desain).";
        }
        if (['Menunggu Respon Klien', 'Sedang Direvisi', 'Eskalasi'].includes(order.status_pesanan)) {
            const template = mockMessageTemplates.find(t => t.id === 'cancel_post_design');
            return template ? template.content.replace('{{orderId}}', order.kode_order) : "Pembatalan diterima (pasca-desain).";
        }
        return `Pesanan Anda dengan status "${order.status_pesanan}" tidak dapat dibatalkan melalui bot. Silakan hubungi admin.`;
    }

    // 3. Revision
    if (revisionKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        if (!order) return "Maaf, tidak ada pesanan yang bisa direvisi dari chat ini.";
        if (order.status_pesanan !== 'Menunggu Respon Klien') {
            return `Anda hanya bisa meminta revisi saat status pesanan adalah "Menunggu Respon Klien". Status saat ini: "${order.status_pesanan}".`;
        }
        
        // Revision Limit Check
        if (order.revisionCount >= 2) {
             const template = mockMessageTemplates.find(t => t.id === 'offer_gmeet');
             return template ? template.content.replace('{{orderId}}', order.kode_order) : "Anda telah mencapai batas revisi. Kami akan menawarkan jadwal G-Meet.";
        }
        
        // AI Analysis
        try {
            const analysis = await analyzeRevisionRequest({ requestText: text });
            
            if (analysis.classification === 'simple_revision') {
                const template = mockMessageTemplates.find(t => t.id === 'revision_in_progress');
                return template ? template.content.replace('{{customerName}}', order.nama_klien).replace('{{orderId}}', order.kode_order) : "Revisi diterima.";
            } else { // scope_creep
                return `⚠️ *Potensi Perubahan Lingkup Kerja Terdeteksi!*\n\nPermintaan Anda: "*${text.substring(0, 50)}...*" sepertinya memerlukan tambahan di luar brief awal.\n\nTim kami akan meninjau permintaan ini terlebih dahulu dan akan segera menghubungi Anda kembali. Terima kasih atas pengertiannya.\n\n*(AI-Analysis: Tambahan brief)*`;
            }
        } catch (error) {
            console.error("Revision analysis AI failed:", error);
            return 'Terima kasih atas feedback Anda. Tim kami akan meninjaunya secara manual dan segera menghubungi Anda.';
        }
    }
    
    // 4. Approval
    if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        if (!order) return "Terima kasih atas konfirmasinya!";
        if (order.status_pesanan !== 'Menunggu Respon Klien') {
             return `Terima kasih atas konfirmasinya. Status pesanan Anda saat ini adalah "${order.status_pesanan}".`;
        }
        const template = mockMessageTemplates.find(t => t.id === 'order_completed');
        return template ? template.content.replace('{{customerName}}', order.nama_klien).replace('{{orderId}}', order.kode_order) : "Pesanan selesai!";
    }

    // 5. Start command
    if (lowerCaseText === '/start') {
      const template = mockMessageTemplates.find(t => t.id === 'welcome_start');
      return template ? template.content : "Selamat datang!";
    }
    
    // Fallback
    return `Maaf, saya belum mengerti maksud Anda. \n\n- Balas dengan "Revisi: [catatan Anda]" untuk meminta perbaikan.\n- Balas dengan "Setuju" untuk menyetujui desain.\n- Balas dengan "/status" untuk mengecek pesanan.`;
}
