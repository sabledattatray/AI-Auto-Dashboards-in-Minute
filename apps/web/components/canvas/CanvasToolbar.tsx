'use client';

import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Grid3X3, 
  MousePointer2, 
  Layers, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  BringToFront, 
  SendToBack 
} from 'lucide-react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { cn } from '@/lib/utils';

export function CanvasToolbar() {
  const { zoom, gridSize, snapToGrid } = useCanvasStore();

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border bg-card/80 backdrop-blur-md px-4 py-2 shadow-xl z-50">
      <div className="flex items-center gap-1 border-r pr-2 mr-1">
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Zoom Out">
          <ZoomOut size={16} />
        </button>
        <span className="text-xs font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Zoom In">
          <ZoomIn size={16} />
        </button>
      </div>

      <div className="flex items-center gap-1 border-r pr-2 mr-1">
        <button 
          className={cn(
            "p-1.5 rounded-md transition-colors",
            snapToGrid ? "bg-primary/10 text-primary" : "hover:bg-accent text-muted-foreground"
          )}
          title="Snap to Grid"
        >
          <Grid3X3 size={16} />
        </button>
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Select Tool">
          <MousePointer2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Align Left">
          <AlignLeft size={16} />
        </button>
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Align Center">
          <AlignCenter size={16} />
        </button>
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Align Right">
          <AlignRight size={16} />
        </button>
        <div className="h-4 w-px bg-border mx-1" />
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Bring to Front">
          <BringToFront size={16} />
        </button>
        <button className="p-1.5 hover:bg-accent rounded-md transition-colors text-muted-foreground" title="Send to Back">
          <SendToBack size={16} />
        </button>
      </div>
    </div>
  );
}
