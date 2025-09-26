"use client";

import { useState, useMemo } from "react";
import { CookingPot } from "lucide-react";
import { RecipeCard } from "./recipe-card";
import { RecipeFilters } from "./recipe-filters";
import { RecipeDetailDialog } from "./recipe-detail-dialog";
import type { GenerateRecipesOutput, Recipe } from "@/ai/types";

const cuisines = ["All", "Italian", "Asian", "Mexican", "American", "French", "Indian", "Other"];

type RecipeResultsProps = {
  recipes: GenerateRecipesOutput | null;
}

export function RecipeResults({ recipes }: RecipeResultsProps) {
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState(120); // max time in minutes
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter((recipe) => {
      const cuisineMatch =
        cuisineFilter === "All" || recipe.cuisine === cuisineFilter;
      const timeMatch = recipe.time <= timeFilter;
      return cuisineMatch && timeMatch;
    });
  }, [recipes, cuisineFilter, timeFilter]);

  if (!recipes) {
    return (
      <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-8 text-center min-h-[400px]">
        <CookingPot className="w-16 h-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground">
          Your recipes are waiting
        </h3>
        <p className="text-muted-foreground/80 mt-2 max-w-sm">
          Enter your ingredients, and we'll whip up some delicious recipe ideas for you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <RecipeFilters
        cuisines={cuisines}
        cuisineFilter={cuisineFilter}
        setCuisineFilter={setCuisineFilter}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
      />
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
          ))}
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-8 text-center min-h-[300px]">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No recipes match your filters
            </h3>
            <p className="text-muted-foreground/80 mt-2">
              Try adjusting your cuisine or time preferences.
            </p>
          </div>
      )}
      {selectedRecipe && (
        <RecipeDetailDialog
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
