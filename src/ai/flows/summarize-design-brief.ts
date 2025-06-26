'use server';

/**
 * @fileOverview Summarizes design briefs provided by customers for admin order viewing.
 *
 * - summarizeDesignBrief - A function that summarizes customer design briefs.
 * - SummarizeDesignBriefInput - The input type for the summarizeDesignBrief function.
 * - SummarizeDesignBriefOutput - The return type for the summarizeDesignBrief function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const SummarizeDesignBriefInputSchema = z.object({
  designBriefs: z.array(z.record(z.string())).describe('An array of design briefs from the customer, where each brief is an object of question-answer pairs.'),
});

export type SummarizeDesignBriefInput = z.infer<typeof SummarizeDesignBriefInputSchema>;

const SummarizeDesignBriefOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the customer design briefs.'),
});

export type SummarizeDesignBriefOutput = z.infer<typeof SummarizeDesignBriefOutputSchema>;

export async function summarizeDesignBrief(input: SummarizeDesignBriefInput): Promise<SummarizeDesignBriefOutput> {
  return summarizeDesignBriefFlow(input);
}

const summarizeDesignBriefPrompt = ai.definePrompt({
  name: 'summarizeDesignBriefPrompt',
  model: googleAI.model('gemini-1.5-flash-latest'),
  input: {schema: SummarizeDesignBriefInputSchema},
  output: {schema: SummarizeDesignBriefOutputSchema},
  prompt: `You are an AI assistant helping an Urgent Studio admin to quickly understand customer design briefs.

  Summarize the following design briefs into a concise summary. Each brief consists of several question-answer pairs.

  {{#each designBriefs}}
  ---
  {{#each this as |answer question|}}
  - **{{question}}**: {{answer}}
  {{/each}}
  ---
  {{/each}}
  `,
});

const summarizeDesignBriefFlow = ai.defineFlow(
  {
    name: 'summarizeDesignBriefFlow',
    inputSchema: SummarizeDesignBriefInputSchema,
    outputSchema: SummarizeDesignBriefOutputSchema,
  },
  async input => {
    const {output} = await summarizeDesignBriefPrompt(input);
    return output!;
  }
);
