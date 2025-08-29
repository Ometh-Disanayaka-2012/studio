"use server";

import {
  suggestAdditionalIngredients,
  type SuggestAdditionalIngredientsInput,
} from "@/ai/flows/suggest-additional-ingredients";

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
