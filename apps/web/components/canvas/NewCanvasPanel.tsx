'use client';

import React, { useState } from 'react';
import { useCanvasStore } from '@/store/useCanvasStore';
import { 
  X, 
  Sparkles, 
  Plus, 
  BarChart3, 
  LineChart, 
  PieChart, 
  LayoutGrid,
  Database,
  Hash,
  Type,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Layout,
  Search,
  Filter,
  MoreHorizontal,
  Table as TableIcon,
  AreaChart,
  BarChart,
  ScatterChart,
  Map,
  Activity,
  Layers,
  Settings2,
  Monitor,
  Image as ImageIcon,
  Upload,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

const visualizationTypes = [
  { icon: LayoutGrid, type: 'KPI_CARD', label: 'Card' },
  { icon: BarChart3, type: 'BAR_CHART', label: 'Bar' },
  { icon: LineChart, type: 'LINE_CHART', label: 'Line' },
  { icon: PieChart, type: 'PIE_CHART', label: 'Pie' },
  { icon: AreaChart, type: 'AREA_CHART', label: 'Area' },
  { icon: TableIcon, type: 'DATA_TABLE', label: 'Table' },
  { icon: ScatterChart, type: 'SCATTER', label: 'Scatter' },
  { icon: Map, type: 'MAP', label: 'Map' },
  { icon: Layers, type: 'STACKED_BAR', label: 'Stacked Bar' },
];

export function NewCanvasPanel() {
  const { 
    isNewCanvasOpen, 
    setNewCanvasOpen, 
    lastLoadedDataset, 
    addTile,
    tiles,
    selectedTileIds,
    updateTile,
    generateDashboardFromDataset,
    canvasConfig,
    setCanvasConfig
  } = useCanvasStore();
  
  const [activePane, setActivePane] = useState<'build' | 'data' | 'canvas'>('build');
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCanvasConfig({ backgroundImage: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (mouseDownEvent: React.MouseEvent) => {
    setIsResizing(true);
    mouseDownEvent.preventDefault();
  };

  React.useEffect(() => {
    const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - mouseMoveEvent.clientX;
      if (newWidth > 280 && newWidth < 600) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (!isNewCanvasOpen) return null;

  const displayDataset = lastLoadedDataset || {
    name: 'Loan Collection (Sample)',
    columns: ['Customer_ID', 'Loan_ID', 'Loan_Amount', 'EMI_Amount', 'EMI_Number', 'Due_Date', 'Payment_Date', 'DPD', 'Bucket', 'Payment_Status', 'Agent_ID', 'Agent_Name', 'Region', 'State', 'Product_Type', 'Risk_Segment']
  };

  const selectedTile = tiles.find(t => selectedTileIds.includes(t.id));

  const toggleFieldOnTile = (field: string) => {
    if (!selectedTile) {
      addTile('KPI_CARD');
      return;
    }

    const currentFields = selectedTile.visualConfig?.fields || [];
    const newFields = currentFields.includes(field)
      ? currentFields.filter((f: string) => f !== field)
      : [...currentFields, field];

    updateTile(selectedTile.id, {
      visualConfig: { ...selectedTile.visualConfig, fields: newFields }
    });
  };

  return (
    <div 
      className={cn(
        "relative h-full bg-background border-l flex flex-col shadow-2xl transition-shadow",
        isResizing ? "shadow-primary/10 ring-1 ring-primary/20" : ""
      )}
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Resize Handle */}
      <div 
        className={cn(
          "absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-primary/50 transition-colors z-50",
          isResizing ? "bg-primary" : ""
        )}
        onMouseDown={startResizing}
      />

      {/* Pane Selector Tabs */}
      <div className="absolute -left-10 top-20 flex flex-col gap-2 z-40">
        <button 
          onClick={() => setActivePane('build')}
          className={cn(
            "p-2.5 rounded-l-lg border-l border-y transition-all shadow-sm",
            activePane === 'build' ? "bg-background text-primary translate-x-1" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Settings2 size={18} />
        </button>
        <button 
          onClick={() => setActivePane('data')}
          className={cn(
            "p-2.5 rounded-l-lg border-l border-y transition-all shadow-sm",
            activePane === 'data' ? "bg-background text-primary translate-x-1" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Database size={18} />
        </button>
        <button 
          onClick={() => setActivePane('canvas')}
          className={cn(
            "p-2.5 rounded-l-lg border-l border-y transition-all shadow-sm",
            activePane === 'canvas' ? "bg-background text-primary translate-x-1" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          <Monitor size={18} />
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20">
        <h3 className="text-sm font-bold capitalize flex items-center gap-2">
          {activePane === 'build' ? <Layout size={16} /> : 
           activePane === 'data' ? <Database size={16} /> : <Monitor size={16} />}
          {activePane === 'canvas' ? 'Canvas Settings' : activePane}
        </h3>
        <button onClick={() => setNewCanvasOpen(false)} className="p-1 hover:bg-muted rounded transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Canvas Pane */}
      {activePane === 'canvas' && (
        <div className="flex-1 overflow-auto p-4 space-y-6 animate-in fade-in slide-in-from-right-4">
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Background Style</h4>
              <button 
                onClick={() => setCanvasConfig({ backgroundColor: '#ffffff', backgroundImage: null, opacity: 1 })}
                className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1"
              >
                <RotateCcw size={10} /> Reset
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Background Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color"
                    value={canvasConfig.backgroundColor || '#ffffff'}
                    onChange={(e) => setCanvasConfig({ backgroundColor: e.target.value, backgroundImage: null })}
                    className="h-10 w-20 cursor-pointer rounded-lg border p-1 bg-background"
                  />
                  <input 
                    type="text"
                    value={canvasConfig.backgroundColor || '#ffffff'}
                    onChange={(e) => setCanvasConfig({ backgroundColor: e.target.value, backgroundImage: null })}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-background border rounded-lg uppercase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Background Image</label>
                <div 
                  className={cn(
                    "relative group h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all bg-muted/20 overflow-hidden",
                    canvasConfig.backgroundImage ? "border-primary/50" : "border-muted-foreground/20 hover:border-primary/30"
                  )}
                >
                  {canvasConfig.backgroundImage ? (
                    <>
                      <img 
                        src={canvasConfig.backgroundImage} 
                        className="absolute inset-0 w-full h-full object-cover opacity-50" 
                        alt="Background" 
                      />
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <button 
                          onClick={() => setCanvasConfig({ backgroundImage: null })}
                          className="p-2 bg-destructive/10 text-destructive rounded-full hover:bg-destructive hover:text-white transition-all shadow-lg backdrop-blur-md"
                        >
                          <X size={16} />
                        </button>
                        <span className="text-[10px] font-bold text-white drop-shadow-md">Image Active</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-background rounded-full border shadow-sm group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold">Drop image or click</p>
                        <p className="text-[8px] text-muted-foreground">PNG, JPG up to 5MB</p>
                      </div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Background Opacity</label>
                  <span className="text-[10px] font-mono">{Math.round(canvasConfig.opacity * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={canvasConfig.opacity}
                  onChange={(e) => setCanvasConfig({ opacity: parseFloat(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
             <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Page Size</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border bg-primary/5 border-primary/20 flex flex-col gap-1">
                <span className="text-[10px] font-bold">Standard</span>
                <span className="text-[9px] text-muted-foreground">16:9 Aspect Ratio</span>
              </div>
              <div className="p-3 rounded-xl border bg-muted/20 opacity-50 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-foreground">Custom</span>
                <span className="text-[9px] text-muted-foreground text-center">Coming Soon</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Build Pane */}
      {activePane === 'build' && (
        <div className="flex-1 overflow-auto p-4 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Visualizations</h4>
              <MoreHorizontal size={14} className="text-muted-foreground" />
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {visualizationTypes.map((v) => (
                <button
                  key={v.type}
                  onClick={() => addTile(v.type as any)}
                  title={v.label}
                  className={cn(
                    "flex items-center justify-center p-2 rounded border hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95",
                    selectedTile?.type === v.type ? "bg-primary/10 border-primary shadow-sm" : "bg-card border-transparent"
                  )}
                >
                  <v.icon size={18} className={cn(selectedTile?.type === v.type ? "text-primary" : "text-muted-foreground")} />
                </button>
              ))}
            </div>
          </section>

          {selectedTile && (
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Data Mapping</h4>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{selectedTile.type.replace('_', ' ')}</span>
              </div>
              
              <div className="space-y-3">
                <div className="rounded-xl border border-dashed p-3 bg-muted/30">
                  <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase">X-Axis / Category</p>
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {selectedTile.visualConfig?.fields?.slice(0, 1).map((f: string) => (
                      <span key={f} className="px-2 py-1 rounded bg-background border text-[10px] font-medium flex items-center gap-1">
                        {f} <X size={10} className="cursor-pointer" />
                      </span>
                    ))}
                    <p className="text-[10px] text-muted-foreground/50 italic self-center">Drag field here</p>
                  </div>
                </div>
                <div className="rounded-xl border border-dashed p-3 bg-muted/30">
                  <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase">Y-Axis / Value</p>
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {selectedTile.visualConfig?.fields?.slice(1).map((f: string) => (
                      <span key={f} className="px-2 py-1 rounded bg-background border text-[10px] font-medium flex items-center gap-1">
                        {f} <X size={10} className="cursor-pointer" />
                      </span>
                    ))}
                    <p className="text-[10px] text-muted-foreground/50 italic self-center">Add data fields here</p>
                  </div>
                </div>
              </div>

              {/* Visual Specific Properties */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Visual Properties</h4>
                </div>
                
                {selectedTile.type === 'KPI_CARD' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Aggregation</label>
                      <select 
                        value={selectedTile.visualConfig?.aggregation || 'SUM'}
                        onChange={(e) => updateTile(selectedTile.id, { 
                          visualConfig: { ...selectedTile.visualConfig, aggregation: e.target.value } 
                        })}
                        className="w-full bg-background border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 ring-primary/20"
                      >
                        <option value="SUM">Sum</option>
                        <option value="AVG">Average</option>
                        <option value="COUNT">Count</option>
                        <option value="MAX">Max</option>
                        <option value="MIN">Min</option>
                        <option value="NONE">None (First Value)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">Layout</label>
                        <select 
                          value={selectedTile.visualConfig?.layout || 'vertical'}
                          onChange={(e) => updateTile(selectedTile.id, { 
                            visualConfig: { ...selectedTile.visualConfig, layout: e.target.value } 
                          })}
                          className="w-full bg-background border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 ring-primary/20"
                        >
                          <option value="vertical">Vertical</option>
                          <option value="horizontal">Horizontal</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase">Columns</label>
                        <input 
                          type="number"
                          min="1"
                          max="4"
                          value={selectedTile.visualConfig?.columns || 1}
                          onChange={(e) => updateTile(selectedTile.id, { 
                            visualConfig: { ...selectedTile.visualConfig, columns: parseInt(e.target.value) } 
                          })}
                          className="w-full bg-background border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-2 ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Styling Properties */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Visual Styling</h4>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Background</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color"
                          value={selectedTile.styleConfig?.backgroundColor || '#ffffff'}
                          onChange={(e) => updateTile(selectedTile.id, { 
                            styleConfig: { ...selectedTile.styleConfig, backgroundColor: e.target.value } 
                          })}
                          className="h-6 w-full cursor-pointer rounded border p-0.5 bg-background"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Text Color</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="color"
                          value={selectedTile.styleConfig?.textColor || '#000000'}
                          onChange={(e) => updateTile(selectedTile.id, { 
                            styleConfig: { ...selectedTile.styleConfig, textColor: e.target.value } 
                          })}
                          className="h-6 w-full cursor-pointer rounded border p-0.5 bg-background"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Opacity</label>
                      <span className="text-[10px] font-mono">{selectedTile.styleConfig?.opacity || 100}%</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={selectedTile.styleConfig?.opacity || 100}
                      onChange={(e) => updateTile(selectedTile.id, { 
                        styleConfig: { ...selectedTile.styleConfig, opacity: parseInt(e.target.value) } 
                      })}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Corner Radius</label>
                      <span className="text-[10px] font-mono">{selectedTile.styleConfig?.borderRadius || 12}px</span>
                    </div>
                    <input 
                      type="range"
                      min="0"
                      max="40"
                      value={selectedTile.styleConfig?.borderRadius || 12}
                      onChange={(e) => updateTile(selectedTile.id, { 
                        styleConfig: { ...selectedTile.styleConfig, borderRadius: parseInt(e.target.value) } 
                      })}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Border</label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <input 
                          type="color"
                          value={selectedTile.styleConfig?.borderColor || '#e2e8f0'}
                          onChange={(e) => updateTile(selectedTile.id, { 
                            styleConfig: { ...selectedTile.styleConfig, borderColor: e.target.value } 
                          })}
                          className="h-6 w-full cursor-pointer rounded border p-0.5 bg-background"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <input 
                          type="number"
                          min="0"
                          max="10"
                          value={selectedTile.styleConfig?.borderWidth || 1}
                          onChange={(e) => updateTile(selectedTile.id, { 
                            styleConfig: { ...selectedTile.styleConfig, borderWidth: parseInt(e.target.value) } 
                          })}
                          className="h-6 w-full rounded border px-2 text-[10px] bg-background"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="pt-4">
             <button 
              onClick={() => generateDashboardFromDataset(displayDataset)}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-all"
            >
              <Sparkles size={16} />
              AI Auto-Generate Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Data Pane */}
      {activePane === 'data' && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b space-y-3 bg-muted/10">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search fields..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-background border rounded-lg focus:ring-2 ring-primary/20 outline-none"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
              <span>{displayDataset.name}</span>
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="flex-1 overflow-auto p-2">
            <div className="space-y-0.5">
              {displayDataset.columns
                ?.filter((col: string) => col.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((col: string) => (
                  <button
                    key={col}
                    onClick={() => toggleFieldOnTile(col)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all hover:bg-muted group/field",
                      selectedTile?.visualConfig?.fields?.includes(col) && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="checkbox" 
                        checked={selectedTile?.visualConfig?.fields?.includes(col) || false}
                        onChange={() => {}} // Controlled by button click
                        className="rounded border-muted-foreground/30 text-primary"
                      />
                      <div className={cn(
                        "p-1 rounded",
                        col === 'revenue' || col === 'val1' ? "text-green-600" :
                        col === 'date' ? "text-blue-600" : "text-orange-600"
                      )}>
                        {col === 'revenue' || col === 'val1' ? <Hash size={12} /> :
                         col === 'date' ? <Calendar size={12} /> : <Type size={12} />}
                      </div>
                      <span className={cn(
                        "text-xs font-medium capitalize",
                        selectedTile?.visualConfig?.fields?.includes(col) && "text-primary font-bold"
                      )}>{col.replace('_', ' ')}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t bg-muted/30 flex items-center justify-between">
        <button className="p-1.5 hover:bg-background rounded transition-colors text-muted-foreground"><Filter size={14} /></button>
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
          {activePane === 'build' ? 'Visual Configuration' : 'Dataset Fields'}
        </p>
        <button className="p-1.5 hover:bg-background rounded transition-colors text-muted-foreground"><Settings2 size={14} /></button>
      </div>
    </div>
  );
}
