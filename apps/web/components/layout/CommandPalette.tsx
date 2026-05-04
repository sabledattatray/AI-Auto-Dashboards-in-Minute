'use client';

import React from 'react';
import { Command } from 'cmdk';
import { 
  Search, 
  Plus, 
  Download, 
  Share2, 
  Undo2, 
  Redo2, 
  Palette,
  Layout,
  Database
} from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { themes } from '@/lib/themes';

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { undo, redo, setTheme, addTile } = useCanvasStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] bg-background/80 backdrop-blur-sm">
      <Command 
        className="w-[640px] max-w-[90vw] overflow-hidden rounded-xl border bg-card shadow-2xl animate-in fade-in zoom-in duration-200"
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <div className="flex items-center border-b px-4 py-3">
          <Search className="mr-2 text-muted-foreground" size={20} />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..." 
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground/50"
          />
        </div>

        <Command.List className="max-h-[400px] overflow-auto p-2 scrollbar-hide">
          <Command.Empty className="p-8 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          <Command.Group heading="Actions" className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Command.Item 
              onSelect={() => { undo(); setOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
            >
              <Undo2 size={16} />
              <span>Undo Last Action</span>
              <kbd className="ml-auto text-[10px] font-mono opacity-50">Ctrl+Z</kbd>
            </Command.Item>
            <Command.Item 
              onSelect={() => { redo(); setOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
            >
              <Redo2 size={16} />
              <span>Redo Action</span>
              <kbd className="ml-auto text-[10px] font-mono opacity-50">Ctrl+Y</kbd>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Visuals" className="mt-4 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Command.Item 
              onSelect={() => { addTile('BAR_CHART'); setOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
            >
              <Plus size={16} />
              <span>Add Bar Chart</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => { addTile('KPI_CARD'); setOpen(false); }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
            >
              <Plus size={16} />
              <span>Add KPI Card</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Themes" className="mt-4 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {themes.map((t) => (
              <Command.Item 
                key={t.id}
                onSelect={() => { setTheme(t.id); setOpen(false); }}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent cursor-pointer transition-colors"
              >
                <div className="h-4 w-4 rounded-full" style={{ backgroundColor: t.accentColor }} />
                <span>Switch to {t.name}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>

        <div className="flex items-center gap-4 border-t bg-muted/20 px-4 py-3 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <kbd className="rounded border bg-background px-1.5 py-0.5">Enter</kbd>
            <span>to select</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="rounded border bg-background px-1.5 py-0.5">↑↓</kbd>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="rounded border bg-background px-1.5 py-0.5">Esc</kbd>
            <span>to close</span>
          </div>
        </div>
      </Command>
    </div>
  );
}
