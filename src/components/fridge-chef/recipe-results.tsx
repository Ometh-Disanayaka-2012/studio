"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { CookingPot } from "lucide-react";
import { RecipeCard } from "./recipe-card";
import { RecipeFilters } from "./recipe-filters";

type Recipe = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  time: number; // in minutes
  cuisine: string;
};

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Classic Tomato & Basil Pasta",
    description: "A simple yet delicious pasta dish that's perfect for a quick weeknight meal.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    dataAiHint: "tomato pasta",
    time: 25,
    cuisine: "Italian",
  },
  {
    id: 2,
    title: "Garlic Butter Shrimp Scampi",
    description: "Juicy shrimp tossed in a rich garlic butter sauce, served over pasta or with crusty bread.",
    imageUrl: "https://picsum.photos/600/400?random=2",
    dataAiHint: "shrimp scampi",
    time: 20,
    cuisine: "Italian",
  },
  {
    id: 3,
    title: "Spicy Chicken Stir-fry",
    description: "A quick and flavorful stir-fry with tender chicken and crisp vegetables in a spicy sauce.",
    imageUrl: "https://picsum.photos/600/400?random=3",
    dataAiHint: "chicken stir-fry",
    time: 30,
    cuisine: "Asian",
  },
  {
    id: 4,
    title: "Hearty Beef Tacos",
    description: "Flavorful ground beef in a warm tortilla with all your favorite toppings.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    dataAiHint: "beef tacos",
    time: 35,
    cuisine: "Mexican",
  },
  {
    id: 5,
    title: "Creamy Mushroom Risotto",
    description: "A rich and creamy Italian rice dish made with Arborio rice and savory mushrooms.",
    imageUrl: "https://picsum.photos/600/400?random=5",
    dataAiHint: "mushroom risotto",
    time: 45,
    cuisine: "Italian",
  },
  {
    id: 6,
    title: "Lemon Herb Roasted Chicken",
    description: "A whole roasted chicken seasoned with lemon and herbs for a comforting family dinner.",
    imageUrl: "https://picsum.photos/600/400?random=6",
    dataAiHint: "roast chicken",
    time: 90,
    cuisine: "American",
  },
];

const cuisines = ["All", "Italian", "Asian", "Mexican", "American"];

export function RecipeResults({ show }: { show: boolean }) {
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState(120); // max time in minutes

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      const cuisineMatch =
        cuisineFilter === "All" || recipe.cuisine === cuisineFilter;
      const timeMatch = recipe.time <= timeFilter;
      return cuisineMatch && timeMatch;
    });
  }, [cuisineFilter, timeFilter]);

  if (!show) {
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
            <RecipeCard key={recipe.id} recipe={recipe} />
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
    </div>
  );
}
