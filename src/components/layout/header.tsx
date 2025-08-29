import { ChefHat } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Fridge Chef</h1>
        </div>
      </div>
    </header>
  );
}
