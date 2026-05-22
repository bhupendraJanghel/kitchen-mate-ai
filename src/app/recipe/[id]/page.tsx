'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Heart, Share, Clock, ChefHat, Users, CheckCircle2, Circle, PlaySquare, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { Recipe } from '@/types';
import { useAppStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function RecipeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  
  const { favorites, addFavorite, removeFavorite, addRecentRecipe } = useAppStore();
  const isFavorite = recipe ? favorites.some(r => r.id === recipe.id) : false;

  useEffect(() => {
    // Try to load from session storage (if generated) or from favorites/recent (if returning)
    const sessionData = sessionStorage.getItem(`recipe_${id}`);
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      setRecipe(parsed);
      addRecentRecipe(parsed);
    } else {
      // Check store
      const allSaved = useAppStore.getState().favorites.concat(useAppStore.getState().recentRecipes);
      const found = allSaved.find(r => r.id === id);
      if (found) {
        setRecipe(found);
        addRecentRecipe(found);
      } else {
        router.replace('/');
      }
    }
  }, [id, addRecentRecipe, router]);

  if (!recipe) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  const imgUrl = recipe.imageUrl || 'https://images.unsplash.com/photo-1546549095-5b3cb20a4b7b?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header Image & Actions */}
      <div className="relative h-72 w-full">
        <img src={imgUrl} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        
        <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={toggleFavorite}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10"
            >
              <Heart className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-primary text-primary" : "text-white")} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Share className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 -mt-10 relative z-10 space-y-6">
        {/* Title & Meta */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{recipe.title}</h1>
          <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {recipe.cookingTime}</div>
            <div className="flex items-center gap-1.5"><ChefHat className="w-4 h-4" /> {recipe.difficulty}</div>
            <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {recipe.servings} Servings</div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Ingredients</h3>
            <span className="text-xs text-muted-foreground font-medium">{recipe.ingredients.length} items</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-2 text-sm bg-secondary/30 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span className="font-medium truncate">{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Ingredients */}
        {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Needs (Optional)</h3>
              <span className="text-xs text-muted-foreground font-medium">{recipe.missingIngredients.length} items</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {recipe.missingIngredients.map((ing, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-secondary/30 p-3 rounded-xl border border-white/5">
                  <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-medium truncate text-muted-foreground">{ing}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Steps</h3>
            <span className="text-xs text-muted-foreground font-medium">{recipe.steps.length} Steps</span>
          </div>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary border border-white/10 flex items-center justify-center font-bold text-sm shrink-0">
                    {step.step}
                  </div>
                  {i !== recipe.steps.length - 1 && (
                    <div className="w-px h-full bg-secondary mt-2 mb-1" />
                  )}
                </div>
                <div className="pb-4 pt-1">
                  <p className="text-sm leading-relaxed text-foreground/90">{step.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="sticky bottom-0 bg-background border-t border-white/10 p-4 flex gap-3 z-50">
        <Button 
          variant="outline"
          className="flex-1 h-14 rounded-2xl border-white/10 bg-secondary/50 font-bold hover:bg-secondary/80 gap-2"
          onClick={() => recipe.videoUrl && window.open(recipe.videoUrl, '_blank')}
        >
          <PlaySquare className="w-5 h-5 text-red-500" />
          Watch on YouTube
        </Button>
        <Button 
          className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-primary to-[#ff8c6b] text-white font-bold gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
          onClick={toggleFavorite}
        >
          <Bookmark className="w-5 h-5" />
          {isFavorite ? 'Saved' : 'Save Recipe'}
        </Button>
      </div>
    </div>
  );
}
