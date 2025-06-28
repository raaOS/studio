'use server';

/**
 * @fileOverview An AI assistant to help users formulate a design brief.
 *
 * - assistWithBrief - Analyzes a user's raw design idea and extracts structured data.
 * - BriefAssistantInput - The input type for the assistWithBrief function.
 * - BriefAssistantOutput - The return type for the assistWithBrief function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const BriefAssistantInputSchema = z.object({
  raw_description: z.string().describe('The user\'s raw, unstructured description of their design needs.'),
});
export type BriefAssistantInput = z.infer<typeof BriefAssistantInputSchema>;

const BriefAssistantOutputSchema = z.object({
  suggested_title: z.string().describe('A concise, professional title for the design project.'),
  keywords: z.array(z.string()).describe('A list of 3-5 relevant keywords that capture the essence of the design.'),
  style_suggestions: z.array(z.string()).describe('A list of 2-3 style suggestions (e.g., "minimalist", "vintage", "corporate") based on the description.'),
});
export type BriefAssistantOutput = z.infer<typeof BriefAssistantOutputSchema>;

export async function assistWithBrief(input: BriefAssistantInput): Promise<BriefAssistantOutput> {
  return briefAssistantFlow(input);
}

const briefAssistantPrompt = ai.definePrompt({
  name: 'briefAssistantPrompt',
  input: { schema: BriefAssistantInputSchema },
  output: { schema: BriefAssistantOutputSchema },
  prompt: `You are an expert design consultant. A client has provided a rough description of what they want.
Your task is to analyze their request and structure it into a professional design brief.

Analyze the following description:
"{{raw_description}}"

Based on the description, provide a suggested project title, extract relevant keywords, and suggest potential design styles.
Ensure the keywords and style suggestions are concise and helpful for a designer.`,
});

const briefAssistantFlow = ai.defineFlow(
  {
    name: 'briefAssistantFlow',
    inputSchema: BriefAssistantInputSchema,
    outputSchema: BriefAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await briefAssistantPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a brief.');
    }
    return output;
  }
);
