import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, Ingredient } from '@/types';

interface AppState {
  favorites: Recipe[];
  recentRecipes: Recipe[];
  lastSelectedIngredients: string[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: string) => void;
  addRecentRecipe: (recipe: Recipe) => void;
  setLastSelectedIngredients: (ingredients: string[]) => void;
  clearRecentRecipes: () => void;
  clearFavoriteRecipes: () => void;
  resetAllData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      recentRecipes: [],
      lastSelectedIngredients: [],
      addFavorite: (recipe) =>
        set((state) => {
          if (state.favorites.some((r) => r.id === recipe.id)) return state;
          return { favorites: [recipe, ...state.favorites] };
        }),
      removeFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((r) => r.id !== recipeId),
        })),
      addRecentRecipe: (recipe) =>
        set((state) => {
          const filtered = state.recentRecipes.filter((r) => r.id !== recipe.id);
          return { recentRecipes: [recipe, ...filtered].slice(0, 10) }; // keep last 10
        }),
      setLastSelectedIngredients: (ingredients) =>
        set({ lastSelectedIngredients: ingredients }),
      clearRecentRecipes: () => set({ recentRecipes: [] }),
      clearFavoriteRecipes: () => set({ favorites: [] }),
      resetAllData: () => set({ favorites: [], recentRecipes: [], lastSelectedIngredients: [] }),
    }),
    {
      name: 'kitchenmate-storage', // name of item in localStorage
    }
  )
);
