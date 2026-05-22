'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { useAppStore } from '@/store/useStore';
import RecipeCard from '@/components/shared/RecipeCard';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const { favorites } = useAppStore();
  const [search, setSearch] = React.useState('');

  const filtered = favorites.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 pb-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HeartIcon /> Favorites
        </h1>
        <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center border border-white/5">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search favorites..." 
          className="pl-12 h-12 bg-secondary/50 border-white/5 rounded-2xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 space-y-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center text-4xl border border-white/5">
              🥘
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">More favorites,<br/>more happiness! ❤️</h3>
              <p className="text-sm text-muted-foreground">
                Save recipes you love<br/>to cook again.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((recipe, index) => (
              <motion.div 
                key={recipe.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CompactRecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}

function CompactRecipeCard({ recipe }: { recipe: any }) {
  const { removeFavorite } = useAppStore();
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-white/5 relative group" onClick={() => window.location.href = `/recipe/${recipe.id}`}>
      <div className="relative h-32">
        <img src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546549095-5b3cb20a4b7b?w=400&q=80'} alt={recipe.title} className="w-full h-full object-cover" />
        <button 
          onClick={(e) => { e.stopPropagation(); removeFavorite(recipe.id); }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 backdrop-blur-md"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff5e3a" stroke="#ff5e3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm truncate">{recipe.title}</h4>
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {recipe.cookingTime}
        </div>
      </div>
    </div>
  );
}
