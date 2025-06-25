import { config } from 'dotenv';
config();

import '@/ai/flows/telegram-bot-integration.ts';
import '@/ai/flows/summarize-design-brief.ts';
import '@/ai/flows/generate-meeting-agenda.ts';
import '@/ai/flows/generate-dynamic-brief.ts';
import '@/ai/flows/create-drive-folder.ts';
