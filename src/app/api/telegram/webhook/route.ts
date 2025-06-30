import { NextResponse } from 'next/server';
// import { processTelegramWebhook } from '@/ai/flows/telegram-bot-responder';

// This is the endpoint that Telegram will call when a user sends a message to the bot.
// You need to set this webhook URL in your bot's settings via the Telegram API.
// e.g., https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_APP_URL>/api/telegram/webhook
export async function POST(request: Request) {
  try {
    // const payload = await request.json();
    
    // Don't wait for the flow to finish. Respond to Telegram immediately
    // to prevent timeouts and retries. The flow will run in the background.
    // processTelegramWebhook(payload);

    // return NextResponse.json({ status: 'ok' });
    console.log("Telegram webhook received, but processing is currently disabled.");
    return NextResponse.json({ status: 'ok', message: 'Webhook received, processing disabled pending refactor.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing Telegram webhook:', errorMessage);
    
    // Still return a success status code to prevent Telegram from retrying on a malformed request.
    return NextResponse.json({ status: 'error', message: errorMessage }, { status: 200 });
  }
}
