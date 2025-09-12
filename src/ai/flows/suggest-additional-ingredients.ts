'use server';

/**
 * @fileOverview A flow for suggesting additional ingredients based on the user's current ingredients.
 *
 * @exported {
 *   suggestAdditionalIngredients - A function that suggests additional ingredients.
 * }
 */

import {ai} from '@/ai/genkit';
import {
  SuggestAdditionalIngredientsInputSchema,
  SuggestAdditionalIngredientsOutputSchema,
  type SuggestAdditionalIngredientsInput,
} from '@/ai/types';

export async function suggestAdditionalIngredients(
  input: SuggestAdditionalIngredientsInput
): Promise<any> {
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
