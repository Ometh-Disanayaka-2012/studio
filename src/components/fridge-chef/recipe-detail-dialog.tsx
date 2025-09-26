import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag } from "lucide-react";
import type { Recipe } from "@/ai/types";

type RecipeDetailDialogProps = {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
};

export function RecipeDetailDialog({
  recipe,
  isOpen,
  onClose,
}: RecipeDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl">{recipe.title}</DialogTitle>
          <DialogDescription>{recipe.description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{recipe.time} mins</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                <span>{recipe.cuisine}</span>
            </div>
        </div>
        <ScrollArea className="h-[50vh] pr-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
              <ul className="list-disc list-inside space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Instructions</h3>
              <ol className="list-decimal list-inside space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
