'use server';

import { analyzeRevisionRequest } from '../flows/analyze-revision-request';
import { mockMessageTemplates } from '@/lib/data';
import { adminDb } from '@/lib/firebase-admin';
import type { PendingOrder, Order } from '@/lib/types';
import { Timestamp } from 'firebase-admin/firestore';

/**
 * @fileOverview The single source of truth for conversational bot logic.
 * This module determines WHAT to say and WHAT to do, but does not send the message itself.
 */

// Fetches an order from the main `orders` collection
async function getOrderDetails(orderId: string): Promise<Order | null> {
    if (!adminDb) return null;
    const orderDoc = await adminDb.collection('orders').doc(orderId).get();
    return orderDoc.exists ? (orderDoc.data() as Order) : null;
}

// Fetches a pending order from the `pendingOrders` collection
async function getPendingOrder(pendingOrderId: string): Promise<PendingOrder | null> {
    if (!adminDb) return null;
    const orderDoc = await adminDb.collection('pendingOrders').doc(pendingOrderId).get();
    return orderDoc.exists ? (orderDoc.data() as PendingOrder) : null;
}

// Creates a new official order from a pending one
async function createOfficialOrder(pendingOrderId: string, pendingOrder: PendingOrder, chatId: number): Promise<string> {
    if (!adminDb) throw new Error('Firestore is not configured for backend operations.');
    
    const newOrderId = `#${String(Math.floor(1000 + Math.random() * 9000))}`;

    const newOrder: Order = {
        kode_order: newOrderId,
        nama_klien: pendingOrder.customer.name,
        customerTelegram: String(chatId),
        status_pesanan: 'Menunggu Pembayaran',
        tipe_pembayaran: pendingOrder.paymentMethod === 'dp' ? 'DP' : 'LUNAS',
        total_harga: pendingOrder.totalPrice,
        items: pendingOrder.cartItems,
        pekan: 'W1', // Default to week 1 for now
        budget: 'UMKM', // This needs a better mapping
        jumlah_transfer: 0,
        potongan_refund: 0,
        jenis_potongan: '',
        total_refund: 0,
        status_refund: '',
        log_aktivitas: [{ aksi: 'Pesanan dibuat melalui bot', oleh: 'sistem', waktu: Timestamp.now().toDate().toISOString() }],
        timestamp: Timestamp.now().toDate().toISOString(),
        revisionCount: 0,
        paymentStatus: 'Belum Dibayar',
    };

    // Create the new order in the main collection
    await adminDb.collection('orders').doc(newOrderId).set(newOrder);

    // Optionally, delete the pending order
    await adminDb.collection('pendingOrders').doc(pendingOrderId).delete();

    return newOrderId;
}


export async function getTelegramResponse(text: string, chatId: number): Promise<string> {
    const lowerCaseText = text.toLowerCase();
    
    // --- Start Command Handling ---
    if (lowerCaseText.startsWith('/start')) {
        const payload = lowerCaseText.split(' ')[1];

        if (payload && adminDb) {
            // This is a checkout flow
            const pendingOrder = await getPendingOrder(payload);
            if (pendingOrder) {
                const newOrderId = await createOfficialOrder(payload, pendingOrder, chatId);
                // Now, get the confirmation message template
                const template = mockMessageTemplates.find(t => t.id === 'payment_pending');
                if (template) {
                     const totalPrice = pendingOrder.paymentMethod === 'dp' ? pendingOrder.totalPrice / 2 : pendingOrder.totalPrice;
                     return template.content
                        .replace('{{customerName}}', pendingOrder.customer.name)
                        .replace('{{orderId}}', newOrderId)
                        .replace('{{totalPrice}}', new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice));
                }
            }
            return "Maaf, pesanan Anda tidak ditemukan atau sudah diproses. Silakan coba checkout lagi dari website.";
        }
        
        // This is a generic start command
        const template = mockMessageTemplates.find(t => t.id === 'welcome_start');
        return template ? template.content : "Selamat datang!";
    }
    
    // --- In-Conversation Command Handling ---
    // In a real app, you would look this up based on chatId
    const MOCK_ORDER_ID_FOR_CHAT = '#002'; 
    const order = await getOrderDetails(MOCK_ORDER_ID_FOR_CHAT);

    const revisionKeywords = ['revisi', 'ubah', 'ganti', 'perbaiki', 'tolong perbaiki'];
    const approvalKeywords = ['setuju', 'ok', 'oke', 'approve', 'lanjutkan', 'sip', 'sudah bagus'];
    const continueKeywords = ['/lanjutkan', '/bayar_aktivasi'];


    // Handle requests on an auto-completed order
    if (order && order.status_pesanan === 'Selesai Otomatis (Tanpa Respon)') {
        if (continueKeywords.some(keyword => lowerCaseText.includes(keyword))) {
            const template = mockMessageTemplates.find(t => t.id === 'reactivate_offer');
            return template ? template.content : "Untuk membuka kembali pesanan ini, ada biaya re-aktivasi sebesar Rp 50.000. Balas /bayar_aktivasi untuk lanjut.";
        }
        return `Pesanan ini sudah ditutup secara otomatis. Untuk melanjutkannya, balas dengan "/lanjutkan".`;
    }


    if (revisionKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        if (!order) return "Maaf, tidak ada pesanan aktif yang bisa direvisi dari chat ini.";
        if (order.status_pesanan !== 'Menunggu Respon Klien') {
            return `Anda hanya bisa meminta revisi saat status pesanan adalah "Menunggu Respon Klien". Status saat ini: "${order.status_pesanan}".`;
        }
        
        if (order.revisionCount >= 2) {
             const template = mockMessageTemplates.find(t => t.id === 'gmeet_offer');
             return template ? template.content.replace('{{orderId}}', order.kode_order) : "Anda telah mencapai batas revisi. Kami akan menawarkan jadwal G-Meet.";
        }
        
        try {
            const analysis = await analyzeRevisionRequest({ requestText: text });
            return analysis.classification === 'simple_revision'
                ? `Revisi untuk pesanan \`${order.kode_order}\` diterima dan akan segera diproses.`
                : `⚠️ *Potensi Perubahan Lingkup Kerja Terdeteksi!*\n\nTim kami akan meninjau permintaan revisi Anda untuk pesanan \`${order.kode_order}\` dan akan segera menghubungi Anda. Terima kasih.`;
        } catch (error) {
            return 'Terima kasih atas feedback Anda. Tim kami akan meninjaunya secara manual.';
        }
    }
    
    if (approvalKeywords.some(keyword => lowerCaseText.includes(keyword))) {
        if (!order) return "Terima kasih atas konfirmasinya!";
        if (order.status_pesanan !== 'Menunggu Respon Klien') {
             return `Terima kasih atas konfirmasinya. Status pesanan Anda saat ini adalah "${order.status_pesanan}".`;
        }
        return `✅ Siap! Pesanan \`${order.kode_order}\` kami anggap selesai. Terima kasih telah menggunakan jasa kami!`;
    }

    return `Maaf, saya belum mengerti. Balas dengan "Revisi: [catatan Anda]" atau "Setuju".`;
}
