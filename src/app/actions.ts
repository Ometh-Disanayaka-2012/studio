"use server";

import {
  generateRecipes,
} from "@/ai/flows/generate-recipes";
import {
  suggestAdditionalIngredients,
} from "@/ai/flows/suggest-additional-ingredients";
import type { GenerateRecipesInput, SuggestAdditionalIngredientsInput } from "@/ai/types";

export async function getSuggestions(data: SuggestAdditionalIngredientsInput) {
  try {
    const result = await suggestAdditionalIngredients(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      error: `Failed to get suggestions: ${errorMessage}`,
    };
  }
}

export async function getRecipes(data: GenerateRecipesInput) {
  try {
    const result = await generateRecipes(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      success: false,
      error: `Failed to get recipes: ${errorMessage}`,
    };
  }
}
