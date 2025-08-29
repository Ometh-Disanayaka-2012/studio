'use server';

/**
 * @fileOverview A flow for suggesting additional ingredients based on the user's current ingredients.
 *
 * @exported {
 *   SuggestAdditionalIngredientsInput - The input type for the suggestAdditionalIngredients function.
 *   SuggestAdditionalIngredientsOutput - The return type for the suggestAdditionalIngredients function.
 *   suggestAdditionalIngredients - A function that suggests additional ingredients.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAdditionalIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
});
export type SuggestAdditionalIngredientsInput = z.infer<
  typeof SuggestAdditionalIngredientsInputSchema
>;

const SuggestAdditionalIngredientsOutputSchema = z.object({
  suggestedIngredients: z
    .string()
    .describe(
      'A comma-separated list of ingredients that complement the user provided ingredients.'
    ),
  possibleRecipes: z
    .string()
    .describe(
      'A comma-separated list of possible recipes that can be made with the suggested ingredients.'
    ),
});
export type SuggestAdditionalIngredientsOutput = z.infer<
  typeof SuggestAdditionalIngredientsOutputSchema
>;

export async function suggestAdditionalIngredients(
  input: SuggestAdditionalIngredientsInput
): Promise<SuggestAdditionalIngredientsOutput> {
  return suggestAdditionalIngredientsFlow(input);
}

const suggestAdditionalIngredientsPrompt = ai.definePrompt({
  name: 'suggestAdditionalIngredientsPrompt',
  input: {schema: SuggestAdditionalIngredientsInputSchema},
  output: {schema: SuggestAdditionalIngredientsOutputSchema},
  prompt: `You are a recipe suggestion AI. Given a list of ingredients, you will suggest additional ingredients that the user can add to expand the recipe possibilities, as well as possible recipes the ingredients can make.

  Ingredients: {{{ingredients}}}

  Suggest additional ingredients as a comma separated list.
  Suggest possible recipes as a comma separated list.
  `,
});

const suggestAdditionalIngredientsFlow = ai.defineFlow(
  {
    name: 'suggestAdditionalIngredientsFlow',
    inputSchema: SuggestAdditionalIngredientsInputSchema,
    outputSchema: SuggestAdditionalIngredientsOutputSchema,
  },
  async input => {
    const {output} = await suggestAdditionalIngredientsPrompt(input);
    return output!;
  }
);
