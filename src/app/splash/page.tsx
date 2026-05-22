'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function SplashPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl" />

      <motion.div 
        className="flex flex-col items-center z-10 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo Icon */}
        <div className="relative">
          <div className="text-8xl">🥘</div>
          <motion.div 
            className="absolute -top-4 -right-4 text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            KitchenMate<br/>
            <span className="text-primary">AI</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Cook with what<br/>you already have
          </p>
        </div>
      </motion.div>

      {/* Fixed Bottom Button */}
      <motion.div 
        className="absolute bottom-12 left-6 right-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <Link href="/">
          <Button 
            size="lg" 
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-[#ff8c6b] text-white font-bold text-lg shadow-[0_8px_30px_rgb(255,94,58,0.3)] hover:shadow-[0_8px_30px_rgb(255,94,58,0.5)] transition-all"
          >
            Get Started →
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
