"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SuggestAdditionalIngredientsOutput } from "@/ai/types";

type SuggestedIngredientsProps = {
  suggestions: SuggestAdditionalIngredientsOutput;
};

export function SuggestedIngredients({ suggestions }: SuggestedIngredientsProps) {
  const suggestedList = suggestions.suggestedIngredients.split(",").map(s => s.trim());
  const recipeList = suggestions.possibleRecipes.split(",").map(s => s.trim());

  return (
    <div className="fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span>AI Suggestions</span>
          </CardTitle>
          <CardDescription>
            Here are some ingredients you could add to create more dishes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Suggested Ingredients</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedList.map((ingredient, index) => (
                <Badge key={index} variant="secondary">{ingredient}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Possible New Recipes</h4>
            <div className="flex flex-wrap gap-2">
              {recipeList.map((recipe, index) => (
                <Badge key={index} variant="outline">{recipe}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
