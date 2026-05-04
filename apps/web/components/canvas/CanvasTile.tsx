'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TileConfig, useCanvasStore } from '@/store/useCanvasStore';
import { cn } from '@/lib/utils';
import { MoreVertical, Maximize2, Trash2, Copy, Lock, Settings2, Sparkles } from 'lucide-react';

import { KPICardTile } from '../tiles/KPICardTile';
import { ChartTile } from '../tiles/ChartTile';
import { MapTile } from '../tiles/MapTile';
import { DataTableTile } from '../tiles/DataTableTile';

interface CanvasTileProps {
  tile: TileConfig;
}

export function CanvasTile({ tile }: CanvasTileProps) {
  const { gridSize, selectedTileIds, selectTile, removeTile, resizeTile } = useCanvasStore();
  const isSelected = selectedTileIds.includes(tile.id);
  
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: tile.id,
    disabled: tile.styleConfig?.isLocked,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    top: tile.y * gridSize,
    left: tile.x * gridSize,
    width: tile.w * gridSize,
    height: tile.h * gridSize,
    zIndex: isSelected ? 1000 : tile.zIndex,
  };

  const renderContent = () => {
    switch (tile.type) {
      case 'KPI_CARD':
        return <KPICardTile tile={tile} />;
      case 'MAP':
        return <MapTile tile={tile} />;
      case 'DATA_TABLE':
        return <DataTableTile tile={tile} />;
      case 'BAR_CHART':
      case 'LINE_CHART':
      case 'AREA_CHART':
      case 'PIE_CHART':
      case 'RADAR_CHART':
      case 'GAUGE':
      case 'FUNNEL':
      case 'TREEMAP':
      case 'SANKEY':
      case 'HEATMAP':
      case 'SCATTER_PLOT':
        return <ChartTile tile={tile} />;
      default:
        return (
          <div className="flex h-full w-full items-center justify-center rounded border border-dashed text-muted-foreground/30">
            <span className="text-[10px] uppercase font-bold">{tile.type}</span>
          </div>
        );
    }
  };

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = tile.w;
    const startH = tile.h;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      const newW = Math.round((startW * gridSize + deltaX) / gridSize);
      const newH = Math.round((startH * gridSize + deltaY) / gridSize);
      
      resizeTile(tile.id, { w: newW, h: newH });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        selectTile(tile.id, e.shiftKey);
        useCanvasStore.getState().setNewCanvasOpen(true);
      }}
      className={cn(
        "absolute flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isDragging && "opacity-50 shadow-2xl",
        "group"
      )}
    >
      {/* Tile Header */}
      <div 
        {...listeners}
        {...attributes}
        className="flex h-10 shrink-0 cursor-grab items-center justify-between border-b bg-muted/30 px-3 active:cursor-grabbing"
      >
        <span className="text-xs font-semibold truncate pr-2">{tile.title}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 text-primary hover:bg-primary/10 rounded" title="AI Insights">
            <Sparkles size={14} />
          </button>
          <button className="p-1 text-muted-foreground hover:bg-accent rounded" title="Settings">
            <Settings2 size={14} />
          </button>
          <button 
            className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded" 
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              removeTile(tile.id);
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Tile Content */}
      <div className="flex-1 relative p-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Resize Handles (8 directions - simplified to 4 for now) */}
      {isSelected && (
        <>
          <div 
            className="absolute -right-1 -bottom-1 h-3 w-3 cursor-nwse-resize rounded-full bg-primary border-2 border-background"
            onMouseDown={handleResize}
          />
          <div 
            className="absolute -right-0.5 top-1/2 h-6 w-1.5 -translate-y-1/2 cursor-ew-resize rounded-full bg-primary/20 hover:bg-primary transition-colors" 
            onMouseDown={handleResize}
          />
          <div 
            className="absolute bottom-0.5 left-1/2 h-1.5 w-6 -translate-x-1/2 cursor-ns-resize rounded-full bg-primary/20 hover:bg-primary transition-colors" 
            onMouseDown={handleResize}
          />
        </>
      )}
    </div>
  );
}
