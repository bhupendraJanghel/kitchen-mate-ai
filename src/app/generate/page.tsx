'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useStore';
import { Recipe } from '@/types';

function GenerationProcess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addRecentRecipe } = useAppStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let isActive = true;

    const generateRecipes = async () => {
      // Fake progress
      interval = setInterval(() => {
        if (isActive) {
          setProgress(p => (p >= 90 ? 90 : p + Math.random() * 15));
        }
      }, 500);

      const ingredients = searchParams.get('ingredients')?.split(',') || [];
      const meal = searchParams.get('meal') || 'Dinner';

      try {
        const response = await fetch('/api/generate-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ingredients, mealTime: meal }),
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        
        if (isActive && data.recipes) {
          setProgress(100);
          
          // Store results in sessionStorage to pass to the results page
          sessionStorage.setItem('recipe_results', JSON.stringify({
            meal,
            ingredientsCount: ingredients.length,
            recipes: data.recipes
          }));

          // Optionally add the first one to recent here or wait till they view it.
          // We'll wait till they view it.

          setTimeout(() => {
            if (isActive) {
              router.push('/results');
            }
          }, 500);
        }
      } catch (error) {
        console.error(error);
        if (isActive) {
          setProgress(100);
          // Handle error by going back or showing toast
          alert("Failed to generate recipes. Please try again.");
          router.push('/');
        }
      }
    };

    generateRecipes();

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 text-center space-y-12">
      <motion.div 
        className="relative"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full w-48 h-48 -z-10 animate-pulse" />
        <div className="text-8xl">🥘</div>
        {/* Floating ingredients animation could go here */}
        <motion.div 
          className="absolute -top-4 -right-4 text-3xl"
          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          🍅
        </motion.div>
        <motion.div 
          className="absolute top-8 -left-8 text-3xl"
          animate={{ y: [0, -30, 0], opacity: [0, 1, 0], x: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        >
          🧅
        </motion.div>
      </motion.div>

      <div className="space-y-4 w-full max-w-xs">
        <h2 className="text-2xl font-bold">Cooking ideas for you...</h2>
        <p className="text-muted-foreground text-sm">
          Checking your kitchen and finding tasty recipes ✨
        </p>

        <div className="pt-8">
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-[#ff8c6b] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <GenerationProcess />
    </Suspense>
  );
}
