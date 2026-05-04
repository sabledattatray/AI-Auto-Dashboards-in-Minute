'use client';

import React from 'react';
import { TileConfig, useCanvasStore } from '@/store/useCanvasStore';
import { themes } from '@/lib/themes';
import { Table as TableIcon, Search, Filter, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataTableTileProps {
  tile: TileConfig;
}

export function DataTableTile({ tile }: DataTableTileProps) {
  const currentThemeId = useCanvasStore((state) => state.currentThemeId);
  const theme = themes.find(t => t.id === currentThemeId) || themes[0];
  const dataset = useCanvasStore((state) => state.lastLoadedDataset);
  const fields = tile.visualConfig?.fields || [];

  if (!dataset || fields.length < 1) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-muted/5">
        <div className="rounded-3xl bg-muted/20 p-5 text-muted-foreground/40 mb-4 border-2 border-dashed border-muted-foreground/10 group-hover:border-primary/20 transition-colors">
          <TableIcon size={48} className="group-hover:text-primary/40 transition-colors" />
        </div>
        <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em]">TABLE READY</p>
        <p className="mt-2 text-[10px] text-muted-foreground/40 max-w-[180px] leading-relaxed">Map any number of fields to generate a raw data drill-down view</p>
      </div>
    );
  }

  const columns = fields.length > 0 ? fields : dataset.columns.slice(0, 5);
  const data = dataset.data.slice(0, 50);

  return (
    <div className="h-full w-full flex flex-col bg-card overflow-hidden">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/10">
        <div className="relative flex-1 max-w-[200px]">
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="w-full pl-7 pr-2 py-1 text-[10px] bg-background border rounded-lg outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-accent rounded-lg text-muted-foreground">
            <Filter size={14} />
          </button>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="w-full text-[11px] border-collapse">
          <thead className="sticky top-0 bg-card border-b z-10">
            <tr className="text-left text-muted-foreground font-semibold">
              {columns.map((col: string) => (
                <th key={col} className="px-4 py-3 bg-muted/20 whitespace-nowrap group cursor-pointer hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-2">
                    {col.replace('_', ' ')}
                    <ArrowUpDown size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/10">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-primary/5 transition-colors group">
                {columns.map((col: string) => (
                  <td key={col} className="px-4 py-2.5 text-foreground/80 group-hover:text-foreground">
                    {String(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-3 py-2 border-t bg-muted/5 flex items-center justify-between text-[9px] text-muted-foreground font-medium">
        <span>Showing {data.length} of {dataset.data.length} records</span>
        <div className="flex items-center gap-2">
          <button className="px-2 py-0.5 rounded border bg-background hover:bg-accent">Prev</button>
          <button className="px-2 py-0.5 rounded border bg-background hover:bg-accent">Next</button>
        </div>
      </div>
    </div>
  );
}
