"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { IngredientForm } from "@/components/fridge-chef/ingredient-form";
import { RecipeResults } from "@/components/fridge-chef/recipe-results";
import type { GenerateRecipesOutput } from "@/ai/types";

export default function Home() {
  const [recipes, setRecipes] = useState<GenerateRecipesOutput | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-8">
            <IngredientForm onRecipesGenerated={setRecipes} />
          </div>
          <div className="lg:col-span-8">
            <RecipeResults recipes={recipes} />
          </div>
        </div>
      </main>
    </div>
  );
}
