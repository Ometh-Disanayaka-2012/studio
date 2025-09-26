'use server';

/**
 * @fileOverview A flow for generating recipes based on a list of ingredients.
 *
 * @exported {
 *   generateRecipes - A function that generates recipes.
 * }
 */

import { ai } from '@/ai/genkit';
import {
  GenerateRecipesInputSchema,
  GenerateRecipesOutputSchema,
  type GenerateRecipesInput
} from '@/ai/types';

export async function generateRecipes(
  input: GenerateRecipesInput
): Promise<any> {
  const result = await generateRecipesFlow(input);
  // Add image placeholders to the recipes
  return result.map((recipe, index) => ({
    ...recipe,
    imageUrl: `https://picsum.photos/seed/${recipe.id}/600/400`,
  }));
}

const generateRecipesPrompt = ai.definePrompt({
  name: 'generateRecipesPrompt',
  input: { schema: GenerateRecipesInputSchema },
  output: { schema: GenerateRecipesOutputSchema },
  prompt: `You are an expert chef who creates delicious and easy-to-follow recipes. 
  
  Given a list of ingredients, you will generate a list of 6 diverse and interesting recipes that can be made. 
  
  For each recipe, provide a unique ID, a title, a short description, a detailed list of ingredients, step-by-step instructions, the estimated time in minutes, the cuisine type, and a 1-2 word hint for an image search.
  
  Ensure the recipes are varied in cuisine and cooking time.

  Ingredients: {{{ingredients}}}
  `,
});

const generateRecipesFlow = ai.defineFlow(
  {
    name: 'generateRecipesFlow',
    inputSchema: GenerateRecipesInputSchema,
    outputSchema: GenerateRecipesOutputSchema,
  },
  async (input) => {
    const { output } = await generateRecipesPrompt(input);
    return output!;
  }
);
