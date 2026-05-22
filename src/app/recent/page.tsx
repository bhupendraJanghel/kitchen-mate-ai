'use client';

import React from 'react';
import { Trash2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';

export default function RecentPage() {
  const { recentRecipes, clearRecentRecipes } = useAppStore();

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 pb-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ClockIcon /> Recent
        </h1>
        {recentRecipes.length > 0 && (
          <button 
            onClick={clearRecentRecipes}
            className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center border border-white/5 text-muted-foreground hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 space-y-6">
        {recentRecipes.length === 0 ? (
          <div className="text-center text-muted-foreground mt-20">
            No recent recipes.
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">History</h3>
            <div className="space-y-3">
              {recentRecipes.map((recipe) => (
                <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
                  <div className="flex items-center gap-4 bg-secondary/30 p-3 rounded-2xl border border-white/5 hover:bg-secondary/50 transition-colors">
                    <img 
                      src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546549095-5b3cb20a4b7b?w=200&q=80'} 
                      alt={recipe.title} 
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-base truncate">{recipe.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 flex gap-2">
                        <span>{recipe.difficulty}</span>
                        <span>•</span>
                        <span>{recipe.cookingTime}</span>
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
