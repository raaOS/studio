'use server';

/**
 * @fileOverview A dynamic brief generation AI agent.
 *
 * - generateDynamicBrief - A function that handles the dynamic brief generation process.
 * - GenerateDynamicBriefInput - The input type for the generateDynamicBrief function.
 * - GenerateDynamicBriefOutput - The return type for the generateDynamicBrief function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDynamicBriefInputSchema = z.object({
  serviceName: z.string().describe('The name of the design service.'),
});
export type GenerateDynamicBriefInput = z.infer<typeof GenerateDynamicBriefInputSchema>;

const GenerateDynamicBriefOutputSchema = z.object({
  briefFields: z.array(z.string()).describe('A list of 3-5 concise questions for the design brief.'),
});
export type GenerateDynamicBriefOutput = z.infer<typeof GenerateDynamicBriefOutputSchema>;

export async function generateDynamicBrief(
  input: GenerateDynamicBriefInput
): Promise<GenerateDynamicBriefOutput> {
  return generateDynamicBriefFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDynamicBriefPrompt',
  input: {schema: GenerateDynamicBriefInputSchema},
  output: {schema: GenerateDynamicBriefOutputSchema},
  prompt: `You are a creative assistant helping a customer to provide a design brief.
  Based on the service name '{{{serviceName}}}', generate a list of 3 to 5 specific questions to ask the customer for their design brief.
  These questions should help gather all necessary details for the designer. Make the questions short and clear.
  `,
});

const generateDynamicBriefFlow = ai.defineFlow(
  {
    name: 'generateDynamicBriefFlow',
    inputSchema: GenerateDynamicBriefInputSchema,
    outputSchema: GenerateDynamicBriefOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
