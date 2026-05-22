'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { INGREDIENTS, CATEGORIES } from '@/lib/constants/ingredients';
import { useAppStore } from '@/store/useStore';
import { MealTime, IngredientCategory } from '@/types';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const MEAL_TIMES: { id: MealTime; icon: string }[] = [
  { id: 'Breakfast', icon: '🌅' },
  { id: 'Lunch', icon: '☀️' },
  { id: 'Snacks', icon: '🥨' },
  { id: 'Dinner', icon: '🌙' },
  { id: 'Dessert', icon: '🍰' },
];

export default function HomePage() {
  const router = useRouter();
  const { lastSelectedIngredients, setLastSelectedIngredients } = useAppStore();
  
  const [selectedMeal, setSelectedMeal] = useState<MealTime>('Dinner');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(lastSelectedIngredients || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All');

  const toggleIngredient = (id: string) => {
    setSelectedIngredients(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (selectedIngredients.length === 0) return;
    setLastSelectedIngredients(selectedIngredients);
    // Navigate to generation/loading screen
    const query = new URLSearchParams({
      meal: selectedMeal,
      ingredients: selectedIngredients.join(','),
    });
    router.push(`/generate?${query.toString()}`);
  };

  const filteredIngredients = INGREDIENTS.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || i.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 pb-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-muted-foreground text-lg mb-1 flex items-center gap-2">
          Hello <span className="animate-wave origin-bottom-right">👋</span>
        </h2>
        <h1 className="text-3xl font-bold leading-tight">
          What do you want<br/>to cook today?
        </h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search ingredients..." 
          className="pl-12 h-12 bg-secondary/50 border-white/5 rounded-2xl text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Meal Time */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Meal Time</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {MEAL_TIMES.map((meal) => (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[72px] h-20 rounded-2xl transition-all duration-300",
                selectedMeal === meal.id 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <span className="text-2xl mb-1">{meal.icon}</span>
              <span className="text-xs font-medium">{meal.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div className="space-y-4 flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Available ingredients</h3>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            {selectedIngredients.length} selected
          </span>
        </div>

        {/* Categories */}
        <ScrollArea className="w-full whitespace-nowrap -mx-6 px-6 pb-2">
          <div className="flex w-max space-x-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? 'default' : 'secondary'}
                className={cn(
                  "px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all",
                  activeCategory === category 
                    ? "bg-white text-black hover:bg-white/90" 
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
          {filteredIngredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            return (
              <motion.button
                key={ingredient.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleIngredient(ingredient.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center p-3 h-24 rounded-2xl border transition-all duration-300",
                  isSelected
                    ? "bg-primary/10 border-primary shadow-[inset_0_0_0_1px_rgba(255,94,58,1)]"
                    : "bg-secondary/30 border-white/5 hover:bg-secondary/50"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-3xl mb-2">{ingredient.icon}</span>
                <span className="text-[11px] font-medium leading-tight text-center">
                  {ingredient.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Generate Button Fixed at Bottom (above nav) */}
      <div className="sticky bottom-0 pt-4 pb-4 bg-gradient-to-t from-background via-background to-transparent z-10">
        <Button 
          size="lg" 
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-[#ff8c6b] text-white font-bold text-lg shadow-[0_8px_30px_rgb(255,94,58,0.3)] hover:shadow-[0_8px_30px_rgb(255,94,58,0.5)] transition-all disabled:opacity-50 disabled:shadow-none"
          disabled={selectedIngredients.length === 0}
          onClick={handleGenerate}
        >
          ✨ Generate Recipes
        </Button>
      </div>
    </div>
  );
}
