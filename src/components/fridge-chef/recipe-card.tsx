import Image from "next/image";
import { Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/ai/types";

type RecipeCardProps = {
  recipe: Recipe;
  onClick: () => void;
};

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <Card 
      className="flex flex-col h-full overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            data-ai-hint={recipe.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle>{recipe.title}</CardTitle>
        <CardDescription className="mt-2">{recipe.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <Badge variant="secondary" className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>{recipe.time} mins</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1.5">
           <Tag className="w-3.5 h-3.5" />
          <span>{recipe.cuisine}</span>
        </Badge>
      </CardFooter>
    </Card>
  );
}
