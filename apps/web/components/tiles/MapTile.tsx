'use client';

import React from 'react';
import { TileConfig, useCanvasStore } from '@/store/useCanvasStore';
import { themes } from '@/lib/themes';
import { Map as MapIcon, Compass, Globe } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

interface MapTileProps {
  tile: TileConfig;
}

export function MapTile({ tile }: MapTileProps) {
  const currentThemeId = useCanvasStore((state) => state.currentThemeId);
  const theme = themes.find(t => t.id === currentThemeId) || themes[0];
  const dataset = useCanvasStore((state) => state.lastLoadedDataset);
  const fields = tile.visualConfig?.fields || [];

  if (!dataset || fields.length < 1) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-muted/5">
        <div className="rounded-3xl bg-muted/20 p-5 text-muted-foreground/40 mb-4 border-2 border-dashed border-muted-foreground/10 group-hover:border-primary/20 transition-colors">
          <MapIcon size={48} className="group-hover:text-primary/40 transition-colors" />
        </div>
        <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em]">GEOSPATIAL ENGINE READY</p>
        <p className="mt-2 text-[10px] text-muted-foreground/40 max-w-[180px] leading-relaxed">Map location fields (State, Region, City) to visualize spatial data</p>
      </div>
    );
  }

  // Mock Geospatial visual using a scatter chart on a coordinate plane
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderWidth: 0,
      textStyle: { color: '#1f2937', fontSize: 11 },
      extraCssText: 'shadow-2xl rounded-xl border border-muted-foreground/10',
      formatter: function(params: any) {
        return `<div class="p-2">
          <p class="font-bold text-primary">${params.data[3]}</p>
          <p class="text-muted-foreground">Performance: <span class="font-semibold text-foreground">${params.data[2]}</span></p>
        </div>`;
      }
    },
    grid: {
      left: '5%', right: '5%', bottom: '5%', top: '5%', containLabel: false
    },
    xAxis: { show: false, min: 0, max: 100 },
    yAxis: { show: false, min: 0, max: 100 },
    series: [
      {
        name: 'Market Performance',
        type: 'scatter',
        coordinateSystem: 'cartesian2d',
        data: [
          [20, 70, 8500, 'North America'],
          [55, 75, 6200, 'Europe'],
          [85, 65, 9400, 'Asia Pacific'],
          [30, 35, 4100, 'Latin America'],
          [52, 30, 3200, 'Africa'],
          [82, 35, 5800, 'Oceania']
        ],
        symbolSize: function (val: any) {
          return Math.sqrt(val[2]) * 0.8;
        },
        itemStyle: {
          color: theme.accentColor,
          opacity: 0.6,
          shadowBlur: 20,
          shadowColor: `${theme.accentColor}4D`
        },
        emphasis: {
          itemStyle: {
            opacity: 0.9,
            shadowBlur: 30,
            shadowColor: theme.accentColor
          }
        },
        label: {
          show: true,
          formatter: function(param: any) { return param.data[3]; },
          position: 'top',
          fontSize: 9,
          fontWeight: 'bold',
          color: '#6b7280',
          distance: 10
        }
      }
    ]
  };

  return (
    <div className="h-full w-full relative group">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <Globe size={300} />
      </div>
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
}
