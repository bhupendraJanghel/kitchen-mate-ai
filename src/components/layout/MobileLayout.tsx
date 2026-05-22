'use client';

import React from 'react';
import BottomNav from '../shared/BottomNav';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const pathname = usePathname();

  // Hide bottom nav on specific screens if needed
  const hideBottomNav = ['/splash'].includes(pathname);

  return (
    <div className="min-h-screen bg-black flex justify-center w-full">
      <div className="w-full max-w-md bg-background min-h-screen shadow-2xl relative flex flex-col overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-y-auto pb-24"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {!hideBottomNav && (
          <div className="absolute bottom-0 w-full z-50">
            <BottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
