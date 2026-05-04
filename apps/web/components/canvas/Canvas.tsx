'use client';

import React from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { useCanvasStore } from '@/store/useCanvasStore';
import { CanvasTile } from './CanvasTile';
import { cn } from '@/lib/utils';
import { themes } from '@/lib/themes';

export function Canvas() {
  const { tiles, gridSize, updateTile, zoom, currentThemeId, canvasConfig } = useCanvasStore();
  const theme = themes.find(t => t.id === currentThemeId) || themes[0];
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    setActiveId(null);

    if (delta.x === 0 && delta.y === 0) return;

    const tile = tiles.find((t) => t.id === active.id);
    if (tile) {
      const newX = Math.round((tile.x * gridSize + delta.x) / gridSize);
      const newY = Math.round((tile.y * gridSize + delta.y) / gridSize);
      
      updateTile(tile.id, { 
        x: Math.max(0, newX), 
        y: Math.max(0, newY) 
      });
    }
  };

  // Calculate required canvas height based on tiles
  const maxY = tiles.reduce((max, tile) => Math.max(max, tile.y + tile.h), 0);
  const canvasHeight = Math.max(720, (maxY + 4) * gridSize) * zoom;

  if (!isMounted) return null;

  return (
    <div 
      className="relative h-full w-full overflow-auto transition-colors duration-500 p-10 flex items-start justify-center"
      style={{ backgroundColor: theme.background }}
    >
      {/* Canvas Area */}
      <div 
        id="canvas-root"
        className="relative shadow-2xl border transition-colors duration-500 shrink-0"
        style={{
          width: 1280 * zoom,
          height: canvasHeight,
          backgroundColor: canvasConfig.backgroundColor || theme.cardBackground,
          backgroundImage: canvasConfig.backgroundImage 
            ? `url(${canvasConfig.backgroundImage})` 
            : `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: canvasConfig.backgroundImage ? 'cover' : `${gridSize}px ${gridSize}px`,
          backgroundPosition: 'center',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="relative h-full w-full">
            {tiles.map((tile) => (
              <CanvasTile key={tile.id} tile={tile} />
            ))}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="h-full w-full rounded-lg border border-primary bg-primary/10 backdrop-blur-sm shadow-2xl ring-2 ring-primary" />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
