import { z } from 'genkit';

export const GenerateRecipesInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
});
export type GenerateRecipesInput = z.infer<typeof GenerateRecipesInputSchema>;

export const RecipeSchema = z.object({
  id: z.number().describe('A unique ID for the recipe.'),
  title: z.string().describe('The title of the recipe.'),
  description: z.string().describe('A short, enticing description of the recipe.'),
  time: z.number().describe('The estimated time in minutes to prepare the recipe.'),
  cuisine: z.string().describe('The cuisine type of the recipe (e.g., Italian, Mexican, Asian).'),
  dataAiHint: z.string().describe('One or two keywords for the recipe image search.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the recipe.'),
  instructions: z.array(z.string()).describe('A list of step-by-step instructions for the recipe.'),
});
export type Recipe = z.infer<typeof RecipeSchema>;

export const GenerateRecipesOutputSchema = z.array(RecipeSchema);
export type GenerateRecipesOutput = z.infer<typeof GenerateRecipesOutputSchema>;

export const SuggestAdditionalIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
});
export type SuggestAdditionalIngredientsInput = z.infer<
  typeof SuggestAdditionalIngredientsInputSchema
>;

export const SuggestAdditionalIngredientsOutputSchema = z.object({
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
