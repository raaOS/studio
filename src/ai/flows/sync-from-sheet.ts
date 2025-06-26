'use server';

/**
 * @fileOverview Implements a Genkit flow for syncing order data from a Google Sheet webhook.
 * 
 * - syncOrderFromSheet - Receives order data, validates it, and prepares it for saving to Firebase.
 * - SyncOrderFromSheetInput - The input type for the syncOrderFromSheet function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
// We'll import the Telegram flow to send notifications later.
// import { sendTelegramUpdate } from './telegram-bot-integration';

// This schema should match the columns in your Google Sheet exactly.
const SyncOrderFromSheetInputSchema = z.object({
  kode_order: z.string(),
  nama_klien: z.string(),
  status_pesanan: z.string(),
  tipe_pembayaran: z.string(),
  jumlah_transfer: z.coerce.number(),
  total_harga: z.coerce.number(),
  potongan_refund: z.coerce.number().optional().default(0),
  jenis_potongan: z.string().optional().default(''),
  total_refund: z.coerce.number().optional().default(0),
  status_refund: z.string().optional().default(''),
  timestamp: z.string(),
});
export type SyncOrderFromSheetInput = z.infer<typeof SyncOrderFromSheetInputSchema>;

export async function syncOrderFromSheet(input: SyncOrderFromSheetInput): Promise<{ success: boolean }> {
  return syncOrderFromSheetFlow(input);
}

const syncOrderFromSheetFlow = ai.defineFlow(
  {
    name: 'syncOrderFromSheetFlow',
    inputSchema: SyncOrderFromSheetInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (orderData) => {
    console.log(`Processing order sync for: ${orderData.kode_order}`);

    // **PHASE 1: Save to Firebase**
    // In a real implementation, we would use the Firebase Admin SDK here
    // to write `orderData` to Firestore or Realtime Database.
    // For now, we'll just log it to the console.
    console.log('Simulating save to Firebase:', orderData);


    // **PHASE 2: Trigger Notifications (Optional)**
    // Here, we could check if the status has changed and if so,
    // call the `sendTelegramUpdate` flow.
    // Example:
    // const previousStatus = await getPreviousStatusFromFirebase(orderData.kode_order);
    // if (orderData.status_pesanan !== previousStatus) {
    //   await sendTelegramUpdate({
    //     telegramId: '@some_id_from_db', // We would fetch this from our customer database
    //     message: `Update Pesanan ${orderData.kode_order}: Status Anda sekarang adalah *${orderData.status_pesanan}*`,
    //   });
    // }
    
    console.log(`Successfully synced order ${orderData.kode_order}.`);

    return { success: true };
  }
);
