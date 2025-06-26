import { NextResponse } from 'next/server';
import { syncOrderFromSheet } from '@/ai/flows/sync-from-sheet';

// This is the webhook endpoint that Google Apps Script will call.
// It receives data from the spreadsheet and passes it to a Genkit flow.
export async function POST(request: Request) {
  try {
    // We'll add a secret key check here later for security.
    const payload = await request.json();
    
    console.log("Webhook received from Google Sheet:", payload);

    // Don't wait for the flow. Respond immediately to Google Sheets.
    syncOrderFromSheet(payload);

    return NextResponse.json({ status: 'ok', message: 'Data received.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing Google Sheet webhook:', errorMessage);
    
    // Return a server error status
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 500 });
  }
}
