'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { OnboardingTour } from './OnboardingTour';
import { NewCanvasPanel } from '../canvas/NewCanvasPanel';

import { useCanvasStore } from '@/store/useCanvasStore';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const isDarkMode = useCanvasStore((state) => state.isDarkMode);

  return (
    <div className={cn("flex h-screen w-full overflow-hidden bg-background font-sans", isDarkMode && "dark")}>
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden text-foreground">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-auto bg-muted/20 relative">
            {children}
          </main>
          <NewCanvasPanel />
        </div>
      </div>
      <CommandPalette />
      <OnboardingTour />
    </div>
  );
}
