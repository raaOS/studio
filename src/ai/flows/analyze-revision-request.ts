'use server';

/**
 * @fileOverview A Genkit flow to analyze a client's revision request and classify it.
 *
 * - analyzeRevisionRequest - Determines if a request is a simple revision or scope creep.
 * - AnalyzeRevisionInput - Input schema for the flow.
 * - AnalyzeRevisionOutput - Output schema for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AnalyzeRevisionInputSchema = z.object({
  requestText: z.string().describe("The full text of the client's revision request."),
});
export type AnalyzeRevisionInput = z.infer<typeof AnalyzeRevisionInputSchema>;

const AnalyzeRevisionOutputSchema = z.object({
  classification: z.enum(['simple_revision', 'scope_creep'])
    .describe("Classify the request. 'simple_revision' for minor changes within the original scope. 'scope_creep' for new features or significant changes outside the original scope."),
  reasoning: z.string().describe("A brief explanation for the classification decision."),
});
export type AnalyzeRevisionOutput = z.infer<typeof AnalyzeRevisionOutputSchema>;

export async function analyzeRevisionRequest(input: AnalyzeRevisionInput): Promise<AnalyzeRevisionOutput> {
  return analyzeRevisionFlow(input);
}

const revisionAnalysisPrompt = ai.definePrompt({
  name: 'revisionAnalysisPrompt',
  input: { schema: AnalyzeRevisionInputSchema },
  output: { schema: AnalyzeRevisionOutputSchema },
  prompt: `You are an expert project manager at a design agency. Your task is to analyze a client's feedback on a submitted design and determine if it's a simple revision or scope creep.

- A 'simple_revision' involves adjustments to the existing design based on the original brief (e.g., "change the color to blue", "make the logo bigger", "fix the typo").
- 'scope_creep' involves requests for new items, new features, or fundamental changes to the concept that were not in the original agreement (e.g., "also make a business card version", "can you add an animation?", "let's try a completely different concept").

Analyze the following client request:
"{{requestText}}"

Classify the request and provide a brief justification for your decision.`,
});

const analyzeRevisionFlow = ai.defineFlow(
  {
    name: 'analyzeRevisionFlow',
    inputSchema: AnalyzeRevisionInputSchema,
    outputSchema: AnalyzeRevisionOutputSchema,
  },
  async (input) => {
    const { output } = await revisionAnalysisPrompt(input);
    if (!output) {
      throw new Error('AI analysis failed. Could not classify the revision request.');
    }
    return output;
  }
);
