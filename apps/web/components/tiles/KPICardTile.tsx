'use client';

import React from 'react';
import { TileConfig, useCanvasStore } from '@/store/useCanvasStore';
import { cn } from '@/lib/utils';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Hash, 
  Calendar, 
  Type 
} from 'lucide-react';

interface KPICardTileProps {
  tile: TileConfig;
}

export function KPICardTile({ tile }: KPICardTileProps) {
  const dataset = useCanvasStore((state) => state.lastLoadedDataset);
  const fields = tile.visualConfig?.fields || [];
  const layout = tile.visualConfig?.layout || 'vertical'; // vertical, horizontal, grid
  const columns = tile.visualConfig?.columns || 1;
  const aggregation = tile.visualConfig?.aggregation || 'SUM';

  if (!dataset || fields.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center border-2 border-dashed border-muted rounded-xl m-1">
        <TrendingUp size={24} className="text-muted-foreground/30 mb-2" />
        <p className="text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">Connect Field</p>
      </div>
    );
  }

  const calculateValue = (fieldName: string) => {
    if (fieldName === 'Total Records') return dataset.data.length.toLocaleString();
    
    const numericData = dataset.data.map(row => {
      const val = row[fieldName];
      return typeof val === 'number' ? val : 0;
    });

    let result = 0;
    switch (aggregation) {
      case 'SUM':
        result = numericData.reduce((a, b) => a + b, 0);
        break;
      case 'AVG':
        result = numericData.length ? numericData.reduce((a, b) => a + b, 0) / numericData.length : 0;
        break;
      case 'MAX':
        result = Math.max(...numericData);
        break;
      case 'MIN':
        result = Math.min(...numericData);
        break;
      case 'COUNT':
        result = dataset.data.length;
        break;
      default: // NONE
        return dataset.data[0]?.[fieldName]?.toString() || 'N/A';
    }

    const isCurrency = fieldName.toLowerCase().includes('amount') || fieldName.toLowerCase().includes('price') || fieldName.toLowerCase().includes('value') || fieldName.toLowerCase().includes('principal');
    return isCurrency ? `$${result.toLocaleString()}` : result.toLocaleString();
  };

  const containerClass = cn(
    "grid gap-2 h-full w-full p-2",
    layout === 'horizontal' ? "grid-flow-col" : "grid-flow-row",
    `grid-cols-${columns}`
  );

  const cardStyle = {
    backgroundColor: tile.styleConfig?.backgroundColor || 'hsl(var(--card))',
    borderColor: tile.styleConfig?.borderColor || 'hsl(var(--border))',
    borderWidth: `${tile.styleConfig?.borderWidth || 1}px`,
    borderRadius: `${tile.styleConfig?.borderRadius || 12}px`,
    opacity: (tile.styleConfig?.opacity || 100) / 100,
    color: tile.styleConfig?.textColor || 'inherit',
  };

  return (
    <div className={containerClass} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {fields.map((field: string, idx: number) => {
        const value = calculateValue(field);
        const label = field.replace('_', ' ').toUpperCase();
        const isCurrency = field.toLowerCase().includes('amount') || field.toLowerCase().includes('price');

        return (
          <div 
            key={idx} 
            className="flex flex-col justify-between p-3 border shadow-sm transition-all hover:shadow-md"
            style={cardStyle}
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                {isCurrency ? <DollarSign size={16} /> : <Hash size={16} />}
              </div>
              <div className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold bg-green-500/10 text-green-600">
                +12%
                <ArrowUpRight size={8} />
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest truncate">{label}</p>
              <h4 className="mt-0.5 text-xl font-bold tracking-tight truncate" style={{ color: tile.styleConfig?.textColor }}>{value}</h4>
            </div>

            <div className="mt-2 h-1 w-full rounded-full bg-muted/30 overflow-hidden">
              <div className="h-full w-2/3 bg-primary" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
