'use client';

import React from 'react';
import { Settings, Globe, Moon, Trash2, Info, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { clearRecentRecipes, clearFavoriteRecipes, resetAllData } = useAppStore();

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      resetAllData();
      alert("All data has been reset.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 pb-6 space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Settings className="w-6 h-6" /> Settings
      </h1>

      <div className="space-y-6">
        {/* Preferences */}
        <section className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Preferences</h3>
          <div className="bg-secondary/20 rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Language</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">English</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Theme</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">Dark</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>

        {/* App Data */}
        <section className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">App Data</h3>
          <div className="bg-secondary/20 rounded-2xl border border-white/5 overflow-hidden">
            <button 
              onClick={() => { clearRecentRecipes(); alert("Recent recipes cleared."); }}
              className="w-full flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">Clear Recent Recipes</span>
              </div>
            </button>
            <button 
              onClick={() => { clearFavoriteRecipes(); alert("Favorites cleared."); }}
              className="w-full flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <HeartIcon />
                <span className="font-medium">Clear Favorite Recipes</span>
              </div>
            </button>
            <button 
              onClick={handleReset}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3 text-red-500">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Reset All Data</span>
              </div>
            </button>
          </div>
        </section>

        {/* About */}
        <section className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">About</h3>
          <div className="bg-secondary/20 rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">About KitchenMate AI</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-muted-foreground">Version</span>
              <span className="text-sm font-bold text-foreground">1.0.0</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  );
}
