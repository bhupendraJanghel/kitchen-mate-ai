'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Recipe } from '@/types';
import RecipeCard from '@/components/shared/RecipeCard';

export default function ResultsPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealTime, setMealTime] = useState<string>('Dinner');
  const [ingredientsCount, setIngredientsCount] = useState<number>(0);

  useEffect(() => {
    const dataStr = sessionStorage.getItem('recipe_results');
    if (dataStr) {
      try {
        const data = JSON.parse(dataStr);
        setRecipes(data.recipes || []);
        setMealTime(data.meal || 'Dinner');
        setIngredientsCount(data.ingredientsCount || 0);
        
        // Save recipes temporarily in session storage to individual access
        data.recipes?.forEach((r: Recipe) => {
          sessionStorage.setItem(`recipe_${r.id}`, JSON.stringify(r));
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen pt-12 px-6 pb-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center border border-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{mealTime}</h1>
            <p className="text-xs text-muted-foreground font-medium">
              Using {ingredientsCount} ingredients
            </p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center">
          <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Recipes List */}
      <div className="flex-1 space-y-4">
        {recipes.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20">
            No recipes found.
          </div>
        ) : (
          recipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
