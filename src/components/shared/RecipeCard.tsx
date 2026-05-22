'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Clock, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { Recipe } from '@/types';
import { useAppStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export default function RecipeCard({ recipe, index }: RecipeCardProps) {
  const { favorites, addFavorite, removeFavorite } = useAppStore();
  const isFavorite = favorites.some(r => r.id === recipe.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  // Fallback images since we don't have real ones
  const fallbackImages = [
    'https://images.unsplash.com/photo-1546549095-5b3cb20a4b7b?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60'
  ];
  
  const imgUrl = recipe.imageUrl || fallbackImages[index % fallbackImages.length];

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-card rounded-3xl overflow-hidden border border-white/5 flex flex-col mb-4 group"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imgUrl} 
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button 
            onClick={toggleFavorite}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
          >
            <Heart 
              className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-primary text-primary" : "text-white")} 
            />
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{recipe.cookingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5" />
              <span className={cn(
                recipe.difficulty === 'Easy' ? 'text-green-400' :
                recipe.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
              )}>
                {recipe.difficulty}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {recipe.description}
          </p>

          <Button 
            className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-semibold"
          >
            View Recipe
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
