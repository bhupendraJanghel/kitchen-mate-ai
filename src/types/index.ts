export type MealTime = 'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner' | 'Dessert';

export type IngredientCategory = 'Vegetables' | 'Spices' | 'Dairy' | 'Snacks' | 'Grains' | 'Fruits' | 'Sauces' | 'Meat';

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  icon?: string;
}

export interface RecipeStep {
  step: number;
  instruction: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: string; // e.g. "20 min"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  ingredients: string[];
  missingIngredients: string[];
  steps: RecipeStep[];
  imageUrl?: string;
  videoUrl?: string;
}
