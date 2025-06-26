'use server';

/**
 * @fileOverview A meeting agenda generation AI agent.
 *
 * - generateMeetingAgenda - A function that handles the meeting agenda generation process.
 * - GenerateMeetingAgendaInput - The input type for the generateMeetingAgenda function.
 * - GenerateMeetingAgendaOutput - The return type for the generateMeetingAgenda function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const GenerateMeetingAgendaInputSchema = z.object({
  orderId: z.string().describe('The ID of the order for which the meeting is scheduled.'),
  orderDetails: z.string().describe('Details of the order including services, quantity, and brief.'),
  revisionHistory: z.string().describe('A summary of the revision history for the order.'),
  customerCommunicationLogs: z
    .string()
    .describe('A summary of communication logs with the customer regarding the order.'),
});
export type GenerateMeetingAgendaInput = z.infer<typeof GenerateMeetingAgendaInputSchema>;

const GenerateMeetingAgendaOutputSchema = z.object({
  agenda: z.string().describe('The generated meeting agenda in Markdown format.'),
});
export type GenerateMeetingAgendaOutput = z.infer<typeof GenerateMeetingAgendaOutputSchema>;

export async function generateMeetingAgenda(
  input: GenerateMeetingAgendaInput
): Promise<GenerateMeetingAgendaOutput> {
  return generateMeetingAgendaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMeetingAgendaPrompt',
  model: googleAI.model('gemini-1.5-flash-latest'),
  input: {schema: GenerateMeetingAgendaInputSchema},
  output: {schema: GenerateMeetingAgendaOutputSchema},
  prompt: `You are an AI assistant designed to generate meeting agendas for client meetings.

  Based on the provided order details, revision history, and customer communication logs, create a detailed agenda for the meeting in Markdown format.
  The agenda should include key discussion points, potential concerns to address, and a structured plan for the meeting.

  Order ID: {{{orderId}}}
  Order Details: {{{orderDetails}}}
  Revision History: {{{revisionHistory}}}
  Customer Communication Logs: {{{customerCommunicationLogs}}}

  Generate the agenda now.
`,
});

const generateMeetingAgendaFlow = ai.defineFlow(
  {
    name: 'generateMeetingAgendaFlow',
    inputSchema: GenerateMeetingAgendaInputSchema,
    outputSchema: GenerateMeetingAgendaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
