import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

export type TileType = 
  | 'BAR_CHART' | 'LINE_CHART' | 'AREA_CHART' | 'PIE_CHART' 
  | 'KPI_CARD' | 'DATA_TABLE' | 'TEXT' | 'IMAGE'
  | 'MAP' | 'GAUGE' | 'FUNNEL' | 'TREEMAP' | 'SANKEY' | 'HEATMAP' | 'SCATTER_PLOT' | 'RADAR_CHART';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface TileConfig {
  id: string;
  type: TileType;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  visualConfig: any;
  styleConfig: any;
}

interface CanvasState {
  tiles: TileConfig[];
  selectedTileIds: string[];
  zoom: number;
  gridSize: number;
  snapToGrid: boolean;
  filters: Record<string, any>;
  currentThemeId: string;
  lastLoadedDataset: {
    id: string;
    name: string;
    columns: string[];
    data: any[];
  } | null;
  isNewCanvasOpen: boolean;
  isDarkMode: boolean;
  canvasConfig: {
    backgroundColor: string;
    backgroundImage: string | null;
    opacity: number;
  };
  
  // History
  history: TileConfig[][];
  historyIndex: number;
  
  // Actions
  addTile: (type: TileType, pos?: Position) => void;
  updateTile: (id: string, updates: Partial<TileConfig>) => void;
  removeTile: (id: string) => void;
  selectTile: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  
  setTheme: (themeId: string) => void;
  toggleDarkMode: () => void;
  setCanvasConfig: (config: Partial<CanvasState['canvasConfig']>) => void;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  
  moveTile: (id: string, pos: Position) => void;
  resizeTile: (id: string, size: Size) => void;
  
  undo: () => void;
  redo: () => void;
  
  saveHistory: () => void;
  setLoadedDataset: (dataset: any) => void;
  setNewCanvasOpen: (open: boolean) => void;
  clearCanvas: () => void;
  resetStore: () => void;
  generateDashboardFromDataset: (dataset: any) => void;
}

export const useCanvasStore = create<CanvasState>()(
  persist(
    immer((set, get) => ({
      tiles: [],
      selectedTileIds: [],
      zoom: 1,
      gridSize: 20,
      snapToGrid: true,
      filters: {},
      currentThemeId: 'midnight-blue',
      lastLoadedDataset: null,
      isNewCanvasOpen: false,
      isDarkMode: true,
      canvasConfig: {
        backgroundColor: '#ffffff',
        backgroundImage: null,
        opacity: 1,
      },
      history: [[]],
      historyIndex: 0,

      setLoadedDataset: (dataset) => {
        set((state) => {
          state.lastLoadedDataset = dataset;
          state.isNewCanvasOpen = true;
        });
      },

      toggleDarkMode: () => {
        set((state) => {
          state.isDarkMode = !state.isDarkMode;
        });
      },

      setCanvasConfig: (config) => {
        set((state) => {
          state.canvasConfig = { ...state.canvasConfig, ...config };
        });
      },

      setNewCanvasOpen: (open) => {
        set((state) => {
          state.isNewCanvasOpen = open;
        });
      },

      saveHistory: () => {
        const { tiles, history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(tiles)));
        set((state) => {
          state.history = newHistory;
          state.historyIndex = newHistory.length - 1;
        });
      },

      addTile: (type, pos) => {
        const id = uuidv4();
        const newTile: TileConfig = {
          id,
          type,
          title: `New ${type.replace('_', ' ')}`,
          x: pos?.x ?? 2,
          y: pos?.y ?? 2,
          w: 12,
          h: 12,
          zIndex: get().tiles.length + 1,
          visualConfig: {},
          styleConfig: {
            background: '#ffffff',
            borderRadius: 8,
            padding: 16,
          },
        };
        
        set((state) => {
          state.tiles.push(newTile);
          state.selectedTileIds = [id];
        });
        get().saveHistory();
      },

      updateTile: (id, updates) => {
        set((state) => {
          const tile = state.tiles.find((t) => t.id === id);
          if (tile) {
            Object.assign(tile, updates);
          }
        });
        get().saveHistory();
      },

      moveTile: (id, pos) => {
        set((state) => {
          const tile = state.tiles.find((t) => t.id === id);
          if (tile) {
            tile.x = pos.x;
            tile.y = pos.y;
          }
        });
        get().saveHistory();
      },

      resizeTile: (id, size) => {
        set((state) => {
          const tile = state.tiles.find((t) => t.id === id);
          if (tile) {
            tile.w = Math.max(2, size.w);
            tile.h = Math.max(2, size.h);
          }
        });
        get().saveHistory();
      },

      removeTile: (id) => {
        set((state) => {
          state.tiles = state.tiles.filter((t) => t.id !== id);
          state.selectedTileIds = state.selectedTileIds.filter((sid) => sid !== id);
        });
        get().saveHistory();
      },

      selectTile: (id, multi) => {
        set((state) => {
          if (multi) {
            if (state.selectedTileIds.includes(id)) {
              state.selectedTileIds = state.selectedTileIds.filter((sid) => sid !== id);
            } else {
              state.selectedTileIds.push(id);
            }
          } else {
            state.selectedTileIds = [id];
          }
        });
      },

      clearSelection: () => {
        set((state) => {
          state.selectedTileIds = [];
        });
      },

      setTheme: (themeId) => {
        set((state) => {
          state.currentThemeId = themeId;
        });
      },

      setFilter: (key, value) => {
        set((state) => {
          state.filters[key] = value;
        });
      },

      clearFilters: () => {
        set((state) => {
          state.filters = {};
        });
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          set((state) => {
            state.historyIndex = historyIndex - 1;
            state.tiles = JSON.parse(JSON.stringify(history[historyIndex - 1]));
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          set((state) => {
            state.historyIndex = historyIndex + 1;
            state.tiles = JSON.parse(JSON.stringify(history[historyIndex + 1]));
          });
        }
      },

      clearCanvas: () => {
        set((state) => {
          state.tiles = [];
          state.selectedTileIds = [];
        });
        get().saveHistory();
      },

      resetStore: () => {
        set((state) => {
          state.tiles = [];
          state.selectedTileIds = [];
          state.lastLoadedDataset = null;
          state.history = [[]];
          state.historyIndex = 0;
          state.currentThemeId = 'midnight-blue';
        });
        localStorage.removeItem('lumina_datasets');
        localStorage.removeItem('lumina_explicitly_cleared');
      },

      generateDashboardFromDataset: (dataset: any) => {
        if (!dataset || !dataset.columns) {
          console.warn('AI Generation: No dataset or columns found');
          return;
        }

        set((state) => {
          const cols = dataset.columns;
          const data = dataset.data || [];
          const newTiles: TileConfig[] = [];
          
          console.log('AI Generating for dataset:', dataset.name, 'with columns:', cols);

          // Heuristic: Find numeric columns for KPIs
          const numericCols = cols.filter((c: string) => {
            const firstRowVal = data[0]?.[c];
            return typeof firstRowVal === 'number';
          });

          // Heuristic: Find categorical columns for Pie (low cardinality)
          const pieCategoricalCols = cols.filter((c: string) => {
            const val = data[0]?.[c];
            if (typeof val !== 'string') return false;
            // Count unique values in a sample
            const sample = data.slice(0, 50).map((r: any) => r[c]);
            const uniqueCount = new Set(sample).size;
            return uniqueCount > 1 && uniqueCount <= 12;
          });

          // Heuristic: Find general categorical columns (for Bar)
          const barCategoricalCols = cols.filter((c: string) => {
            const val = data[0]?.[c];
            return typeof val === 'string' && val.length < 50;
          });

          // 1. Add KPI Cards (Top Row - High Density)
          // 1. Add KPI Cards (Top Row - Wide Panorama)
          const kpiCount = Math.min(numericCols.length, 4);
          const kpiWidth = Math.floor(60 / kpiCount);
          numericCols.slice(0, 4).forEach((col: string, i: number) => {
            newTiles.push({
              id: uuidv4(),
              type: 'KPI_CARD',
              title: `Total ${col.replace('_', ' ')}`,
              x: 2 + (i * kpiWidth), y: 1, w: kpiWidth - 2, h: 8,
              zIndex: i + 1,
              visualConfig: { fields: [col] },
              styleConfig: { background: '#ffffff', borderRadius: 16, padding: 16 }
            });
          });

          // 2. Add Charts (Row 2 - Wide Screen Balance)
          const barDim = barCategoricalCols[0] || cols[0];
          const barMea = numericCols[0] || cols[1];
          // Bar Chart (60% width)
          newTiles.push({
            id: uuidv4(),
            type: 'BAR_CHART',
            title: `${String(barMea).replace('_', ' ')} by ${String(barDim).replace('_', ' ')}`,
            x: 2, y: 10, w: 35, h: 18,
            zIndex: 10,
            visualConfig: { fields: [barDim, barMea] },
            styleConfig: { background: '#ffffff', borderRadius: 20, padding: 20 }
          });

          // Pie Chart (40% width)
          if (pieCategoricalCols.length > 0 && numericCols.length > 0) {
            newTiles.push({
              id: uuidv4(),
              type: 'PIE_CHART',
              title: `${pieCategoricalCols[0].replace('_', ' ')} Distribution`,
              x: 38, y: 10, w: 22, h: 18,
              zIndex: 11,
              visualConfig: { fields: [pieCategoricalCols[0], numericCols[0]] },
              styleConfig: { background: '#ffffff', borderRadius: 20, padding: 20 }
            });
          }

          // 3. Add a Data Table (Row 3 - Wide Format)
          newTiles.push({
            id: uuidv4(),
            type: 'DATA_TABLE',
            title: 'Detailed Records Explorer',
            x: 2, y: 29, w: 58, h: 16,
            zIndex: 12,
            visualConfig: { fields: cols.slice(0, 8) },
            styleConfig: { background: '#ffffff', borderRadius: 20, padding: 20 }
          });

          // 4. Add a Map (Row 4 - High Fidelity Panorama)
          const locationKeywords = ['region', 'state', 'city', 'country', 'location', 'territory', 'province', 'area', 'zone', 'place'];
          const locationCol = cols.find((c: string) => 
            locationKeywords.some(kw => c.toLowerCase().includes(kw))
          );

          if (locationCol && numericCols.length > 0) {
            newTiles.push({
              id: uuidv4(),
              type: 'MAP',
              title: `${locationCol.replace('_', ' ')} Performance Heatmap`,
              x: 2, y: 46, w: 58, h: 22,
              zIndex: 13,
              visualConfig: { fields: [locationCol, numericCols[0]] },
              styleConfig: { background: '#ffffff', borderRadius: 20, padding: 20 }
            });
          }

          state.tiles = newTiles;
          state.isNewCanvasOpen = false;
        });
        get().saveHistory();
      },
    })),
    {
      name: 'lumina-canvas-storage',
      version: 4, // Increment for Canvas Config persistence
      migrate: (persistedState: any, version: number) => {
        if (version < 4) {
          return {
            tiles: [],
            currentThemeId: 'midnight-blue',
            lastLoadedDataset: null,
            zoom: 1,
            isDarkMode: true,
            canvasConfig: {
              backgroundColor: '#ffffff',
              backgroundImage: null,
              opacity: 1,
            }
          };
        }
        return persistedState;
      },
      partialize: (state) => ({
        tiles: state.tiles,
        currentThemeId: state.currentThemeId,
        lastLoadedDataset: state.lastLoadedDataset,
        zoom: state.zoom,
        isDarkMode: state.isDarkMode,
        canvasConfig: state.canvasConfig
      }),
    }
  )
);
