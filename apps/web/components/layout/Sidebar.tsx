'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  BarChart3, 
  Database, 
  Settings, 
  Users, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  PieChart,
  LineChart,
  Map as MapIcon,
  Activity,
  Filter,
  Type,
  Image as ImageIcon,
  MousePointer2,
  LayoutGrid,
  GitBranch,
  Grid3X3,
  Globe,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Datasets', href: '/datasets', icon: Database },
  { name: 'Workspace', href: '/workspace', icon: Layers },
  { name: 'AI Insights', href: '/insights', icon: Sparkles },
];

const secondaryItems = [
  { name: 'Members', href: '/workspace/members', icon: Users },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/workspace/settings', icon: Settings },
];

import { useCanvasStore, TileType } from '@/store/useCanvasStore';

const visualTypes: { type: TileType; label: string; icon: any }[] = [
  { type: 'KPI_CARD', label: 'KPI Card', icon: LayoutDashboard },
  { type: 'BAR_CHART', label: 'Bar Chart', icon: BarChart3 },
  { type: 'LINE_CHART', label: 'Line Chart', icon: LineChart },
  { type: 'AREA_CHART', label: 'Area Chart', icon: Sparkles },
  { type: 'PIE_CHART', label: 'Pie Chart', icon: PieChart },
  { type: 'DATA_TABLE', label: 'Table', icon: Database },
  { type: 'MAP', label: 'Map', icon: MapIcon },
  { type: 'GAUGE', label: 'Gauge', icon: Activity },
  { type: 'FUNNEL', label: 'Funnel', icon: Filter },
  { type: 'TREEMAP', label: 'Treemap', icon: Grid3X3 },
  { type: 'SANKEY', label: 'Sankey', icon: GitBranch },
  { type: 'HEATMAP', label: 'Heatmap', icon: LayoutGrid },
  { type: 'SCATTER_PLOT', label: 'Scatter', icon: MousePointer2 },
  { type: 'RADAR_CHART', label: 'Radar', icon: Radio },
  { type: 'TEXT', label: 'Text Box', icon: Type },
  { type: 'IMAGE', label: 'Image', icon: ImageIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const addTile = useCanvasStore((state) => state.addTile);

  return (
    <aside 
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      {/* Brand Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <BarChart3 size={20} />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold tracking-tight text-foreground">
              Lumina<span className="text-primary">BI</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="p-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 shrink-0 transition-transform group-hover:scale-110",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </div>
      </nav>

      <div className="h-px bg-border mx-3 my-2" />

      {/* Visuals Catalog (Only if on reports/dashboard) */}
      {!isCollapsed && (
        <div id="sidebar-catalog" className="flex-1 overflow-auto p-4 no-scrollbar">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">AI Magic</h3>
          
          <button
              onClick={() => {
                const ds = useCanvasStore.getState().lastLoadedDataset;
                if (ds) {
                  useCanvasStore.getState().generateDashboardFromDataset(ds);
                  if (pathname !== '/') {
                    try {
                      router.push('/');
                    } catch (e) {
                      window.location.href = '/';
                    }
                  }
                } else {
                  alert('Please load a dataset first from the Datasets page!');
                }
              }}
            className="w-full mb-6 flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-purple-600 dark:from-sidebar-primary dark:via-sidebar-primary/90 dark:to-indigo-900 text-white shadow-lg shadow-primary/20 dark:shadow-sidebar-primary/40 hover:shadow-primary/40 dark:hover:shadow-sidebar-primary/60 hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold">Auto AI Generate</p>
              <p className="text-[9px] opacity-70">Build dashboard in seconds</p>
            </div>
          </button>

          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Visuals Catalog</h3>
          <div className="grid grid-cols-2 gap-2">
            {visualTypes.map((v) => (
              <button
                key={v.type}
                onClick={() => addTile(v.type)}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 p-3 text-center transition-all hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/20 hover:shadow-lg group"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 group-hover:border-primary/50 text-black dark:text-white transition-all group-hover:scale-110">
                  <v.icon size={20} className="text-black/70 dark:text-white/90 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-bold text-black/80 dark:text-white tracking-tight uppercase opacity-80 group-hover:opacity-100">{v.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="border-t p-3 bg-muted/10">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex w-full items-center justify-center rounded-md py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
