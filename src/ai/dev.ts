'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/telegram-bot-integration.ts';
import '@/ai/flows/telegram-bot-responder.ts';
import '@/ai/flows/create-drive-folder.ts';
import '@/ai/flows/verify-telegram-bot.ts';
import '@/ai/flows/simulate-telegram-response.ts';
import '@/ai/logic/bot-logic.ts';
import '@/ai/flows/analyze-revision-request.ts';
