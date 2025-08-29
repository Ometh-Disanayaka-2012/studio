"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getSuggestions } from "@/app/actions";
import type { SuggestAdditionalIngredientsOutput } from "@/ai/flows/suggest-additional-ingredients";
import { SuggestedIngredients } from "./suggested-ingredients";

const formSchema = z.object({
  ingredients: z
    .string()
    .min(3, "Please enter at least one ingredient."),
});

type IngredientFormProps = {
  onGenerate: () => void;
};

export function IngredientForm({ onGenerate }: IngredientFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] =
    useState<SuggestAdditionalIngredientsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setSuggestions(null);

    const result = await getSuggestions(values);

    if (result.success && result.data) {
      setSuggestions(result.data);
      onGenerate();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Ingredients</CardTitle>
          <CardDescription>
            List the ingredients you have on hand, separated by commas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Controller
                name="ingredients"
                control={form.control}
                render={({ field }) => (
                  <Textarea
                    id="ingredients"
                    placeholder="e.g., chicken breast, broccoli, garlic, olive oil"
                    className="min-h-[100px]"
                    {...field}
                  />
                )}
              />
              {form.formState.errors.ingredients && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.ingredients.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Generate Recipes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>Getting AI suggestions...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {suggestions && <SuggestedIngredients suggestions={suggestions} />}
    </div>
  );
}
