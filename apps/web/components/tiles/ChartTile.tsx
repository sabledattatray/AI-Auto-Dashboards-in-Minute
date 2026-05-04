'use client';

import React from 'react';
import ReactECharts from 'echarts-for-react';
import { TileConfig, useCanvasStore } from '@/store/useCanvasStore';
import { themes } from '@/lib/themes';
import { BarChart3, LineChart, PieChart, Radio, Activity, Filter, Grid3X3, GitBranch, LayoutGrid, MousePointer2 } from 'lucide-react';

interface ChartTileProps {
  tile: TileConfig;
}

export function ChartTile({ tile }: ChartTileProps) {
  const currentThemeId = useCanvasStore((state) => state.currentThemeId);
  const theme = themes.find(t => t.id === currentThemeId) || themes[0];
  const dataset = useCanvasStore((state) => state.lastLoadedDataset);
  const fields = tile.visualConfig?.fields || [];
  
  // If we have a dataset and mappings, use real data
  let xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let yAxisData = [120, 200, 150, 80, 70, 110, 130];
  let xAxisField = 'Category';
  let yAxisField = 'Value';

  if (dataset && dataset.data && fields.length >= 2) {
    xAxisField = fields[0];
    yAxisField = fields[1];
    
    // Sort by x-axis if it's a date or sequential
    const sortedData = [...dataset.data].sort((a, b) => {
      const valA = a[xAxisField];
      const valB = b[xAxisField];
      if (typeof valA === 'string' && !isNaN(Date.parse(valA))) {
        return new Date(valA).getTime() - new Date(valB).getTime();
      }
      return valA > valB ? 1 : -1;
    });

    xAxisData = sortedData.map(row => row[xAxisField]);
    yAxisData = sortedData.map(row => row[yAxisField]);
  } else if (fields.length > 0) {
    xAxisField = fields[0] || 'Category';
    yAxisField = fields[1] || 'Value';
  }

  const isLine = tile.type === 'LINE_CHART' || tile.type === 'AREA_CHART';
  
  if (!dataset || fields.length < 1) {
    const Icon = {
      'BAR_CHART': BarChart3,
      'LINE_CHART': LineChart,
      'AREA_CHART': LineChart,
      'PIE_CHART': PieChart,
      'RADAR_CHART': Radio,
      'GAUGE': Activity,
      'FUNNEL': Filter,
      'TREEMAP': Grid3X3,
      'SANKEY': GitBranch,
      'HEATMAP': LayoutGrid,
      'SCATTER_PLOT': MousePointer2,
    }[tile.type as string] || BarChart3;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-muted/5">
        <div className="rounded-3xl bg-muted/20 p-5 text-muted-foreground/40 mb-4 border-2 border-dashed border-muted-foreground/10 group-hover:border-primary/20 transition-colors">
          <Icon size={48} className="group-hover:text-primary/40 transition-colors" />
        </div>
        <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em]">{tile.type.replace('_', ' ')} READY</p>
        <p className="mt-2 text-[10px] text-muted-foreground/40 max-w-[180px] leading-relaxed">Map dimensions and measures from the data pane to render this visual</p>
      </div>
    );
  }

  const getSeriesType = () => {
    switch (tile.type) {
      case 'PIE_CHART': return 'pie';
      case 'FUNNEL': return 'funnel';
      case 'GAUGE': return 'gauge';
      case 'TREEMAP': return 'treemap';
      case 'SCATTER_PLOT': return 'scatter';
      case 'RADAR_CHART': return 'radar';
      case 'HEATMAP': return 'heatmap';
      default: return isLine ? 'line' : 'bar';
    }
  };

  const option: any = {
    tooltip: {
      trigger: tile.type === 'PIE_CHART' || tile.type === 'FUNNEL' ? 'item' : 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderWidth: 0,
      textStyle: { color: '#1f2937', fontSize: 11 },
      extraCssText: 'shadow-2xl rounded-xl border border-muted-foreground/10',
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '12%',
      top: '12%',
      containLabel: true,
    },
    xAxis: tile.type === 'PIE_CHART' || tile.type === 'FUNNEL' || tile.type === 'GAUGE' || tile.type === 'RADAR_CHART' ? undefined : {
      type: 'category',
      data: xAxisData,
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#9ca3af', fontSize: 10 },
    },
    yAxis: tile.type === 'PIE_CHART' || tile.type === 'FUNNEL' || tile.type === 'GAUGE' || tile.type === 'RADAR_CHART' ? undefined : {
      type: 'value',
      splitLine: { lineStyle: { color: '#f3f4f6', type: 'dashed' } },
      axisLabel: { color: '#9ca3af', fontSize: 10 },
    },
    series: [
      {
        name: yAxisField,
        type: getSeriesType(),
        smooth: true,
        data: tile.type === 'PIE_CHART' || tile.type === 'FUNNEL' 
          ? xAxisData.map((label, idx) => ({ name: label, value: yAxisData[idx] }))
          : yAxisData,
        itemStyle: {
          color: theme.accentColor,
          borderRadius: [6, 6, 0, 0],
        },
        areaStyle: tile.type === 'AREA_CHART' ? {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: `${theme.accentColor}4D` }, { offset: 1, color: `${theme.accentColor}00` }]
          }
        } : undefined,
        radius: tile.type === 'PIE_CHART' ? ['45%', '75%'] : undefined,
        avoidLabelOverlap: true,
        label: {
          show: tile.type === 'PIE_CHART',
          position: 'outside',
          formatter: '{b}: {d}%',
          fontSize: 10,
          color: '#6b7280'
        },
        labelLine: {
          show: tile.type === 'PIE_CHART',
          length: 15,
          length2: 10,
          smooth: true
        },
        minShowLabelAngle: 5, // Hide labels for very small slices
      },
    ],
  };

  return (
    <div className="h-full w-full p-2">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
}
