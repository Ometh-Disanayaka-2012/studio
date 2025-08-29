"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type RecipeFiltersProps = {
  cuisines: string[];
  cuisineFilter: string;
  setCuisineFilter: (value: string) => void;
  timeFilter: number;
  setTimeFilter: (value: number) => void;
};

export function RecipeFilters({
  cuisines,
  cuisineFilter,
  setCuisineFilter,
  timeFilter,
  setTimeFilter,
}: RecipeFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end bg-card p-4 rounded-lg border">
      <div>
        <Label htmlFor="cuisine-filter" className="mb-2 block">Cuisine</Label>
        <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
          <SelectTrigger id="cuisine-filter" className="w-full">
            <SelectValue placeholder="Select a cuisine" />
          </SelectTrigger>
          <SelectContent>
            {cuisines.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="time-filter" className="mb-2 block">
          Max. Time ({timeFilter} mins)
        </Label>
        <Slider
          id="time-filter"
          min={10}
          max={120}
          step={5}
          value={[timeFilter]}
          onValueChange={(value) => setTimeFilter(value[0])}
        />
      </div>
    </div>
  );
}
