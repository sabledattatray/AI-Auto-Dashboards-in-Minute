'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCanvasStore } from '@/store/useCanvasStore';
import { 
  FileText, 
  Database, 
  Table, 
  BarChart3, 
  Layout, 
  Settings, 
  Share2, 
  Download,
  Zap,
  Grid,
  Filter,
  Plus,
  ArrowDownToLine,
  RefreshCw,
  Search,
  MoreHorizontal,
  ChevronDown,
  LineChart,
  PieChart,
  HardDrive,
  Globe,
  Trash2,
  X,
  Copy,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportToPDF } from '@/lib/export';

interface ToolItem {
  icon: any;
  label: string;
  primary?: boolean;
  sub?: boolean;
}

interface ToolGroup {
  group: string;
  items: ToolItem[];
}

const tools: ToolGroup[] = [
  { group: 'Clipboard', items: [{ icon: FileText, label: 'Paste' }, { icon: Table, label: 'Copy' }] },
  { group: 'Data', items: [
    { icon: Database, label: 'Get data', primary: true }, 
    { icon: Table, label: 'Excel', sub: true }, 
    { icon: Zap, label: 'SQL Server', sub: true },
    { icon: HardDrive, label: 'Dataverse', sub: true }
  ] },
  { group: 'Queries', items: [{ icon: RefreshCw, label: 'Transform data' }, { icon: RefreshCw, label: 'Refresh' }] },
  { group: 'Insert', items: [
    { icon: Plus, label: 'New visual' }, 
    { icon: Table, label: 'Text box' }, 
    { icon: BarChart3, label: 'More visuals' }
  ] },
];

export function Topbar() {
  const { resetStore, addTile, isDarkMode, toggleDarkMode } = useCanvasStore();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/share/${Math.random().toString(36).substring(7)}`;
    setGeneratedLink(shareUrl);
    navigator.clipboard.writeText(shareUrl);
    setShowShareModal(true);
  };

  const handleAction = (label: string) => {
    switch (label) {
      case 'Share':
      case 'Publish':
        handleShare();
        break;
      case 'New visual':
        addTile('BAR_CHART');
        break;
      case 'KPI Card':
        addTile('KPI_CARD');
        break;
      case 'Text box':
        // For now, let's treat text box as a specific KPI card or we could add a TEXT type
        addTile('KPI_CARD'); 
        break;
      case 'Get data':
      case 'More Sources...':
        router.push('/datasets?action=connect');
        break;
      case 'Excel Workbook':
      case 'CSV / Text':
      case 'Excel':
        router.push('/datasets?action=upload');
        break;
      case 'SQL Server':
      case 'Dataverse':
      case 'Transform data':
        router.push('/datasets');
        break;
      case 'Refresh':
        // Simulate refresh
        console.log('Refreshing data sources...');
        break;
      case 'Export to PDF':
        exportToPDF('canvas-root', 'LuminaBI-Dashboard.pdf');
        break;
      default:
        console.log('Action not implemented:', label);
    }
    setActiveMenu(null);
  };

  return (
    <div className="flex flex-col border-b bg-card z-50">
      {/* Upper Menu Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-muted/30 border-b">
        <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground overflow-x-auto no-scrollbar whitespace-nowrap pr-4">
          {['File', 'Home', 'Insert', 'Modeling', 'View', 'Optimize', 'Help'].map((menu) => (
            <div key={menu} className="relative">
              <button 
                onMouseEnter={() => activeMenu && setActiveMenu(menu)}
                onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                className={cn(
                  "px-3 py-1 rounded transition-colors",
                  (menu === 'Home' && !activeMenu) ? "bg-background text-foreground font-bold shadow-sm" : "hover:bg-muted hover:text-foreground",
                  activeMenu === menu && "bg-primary text-primary-foreground shadow-sm"
                )}
              >
                {menu}
              </button>
              
              {activeMenu === menu && (
                <div 
                  className="absolute left-0 top-full mt-1 w-48 bg-card border rounded-lg shadow-xl py-2 z-[60] animate-in fade-in slide-in-from-top-1 duration-200"
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <div 
                    onClick={() => handleAction(`New ${menu} item`)}
                    className="px-3 py-1 hover:bg-muted cursor-pointer text-foreground text-[11px] flex items-center justify-between group"
                  >
                    <span>New {menu} item</span>
                    <ChevronDown size={10} className="-rotate-90 opacity-50 group-hover:opacity-100" />
                  </div>
                  {menu === 'File' && (
                    <div 
                      onClick={() => handleAction('Export to PDF')}
                      className="px-3 py-1 hover:bg-muted cursor-pointer text-foreground text-[11px] flex items-center justify-between group"
                    >
                      <span>Export as PDF</span>
                    </div>
                  )}
                  <div className="px-3 py-1 hover:bg-muted cursor-pointer text-foreground text-[11px] flex items-center justify-between group">
                    <span>Options...</span>
                    <ChevronDown size={10} className="-rotate-90 opacity-50 group-hover:opacity-100" />
                  </div>
                  <div className="h-px bg-border my-1 mx-2" />
                  <div className="px-3 py-1 hover:bg-muted cursor-pointer text-foreground text-[11px]">Settings</div>
                </div>
              )}
            </div>
          ))}
          <div className="w-px h-4 bg-border mx-2" />
          <button 
            onClick={resetStore}
            className="px-2 py-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={12} />
            Start Fresh
          </button>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-background border shadow-sm hover:bg-accent transition-all active:scale-95 text-muted-foreground hover:text-primary"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-background rounded-full border shadow-sm max-w-xs">
            <Search size={12} className="text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search features..." 
              className="bg-transparent border-none text-[10px] outline-none w-32"
            />
          </div>
          <button 
            onClick={() => handleAction('Share')}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
            <Share2 size={12} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Ribbon */}
      <div className="flex items-center h-22 px-2 overflow-x-auto no-scrollbar scroll-smooth bg-muted/5">
        {tools.map((group, i) => (
          <div key={i} className="flex flex-col items-center h-full px-4 border-r last:border-r-0 shrink-0">
            <div className="flex items-center gap-2 flex-1 py-3">
              {group.items.map((item, j) => (
                <div key={j} className="relative group/tool">
                  <button 
                    onClick={() => handleAction(item.label)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 px-3 py-2 rounded-xl transition-all active:scale-95 whitespace-nowrap",
                      item.primary ? "bg-background border shadow-sm hover:border-primary/50" : "hover:bg-muted",
                      item.sub && "hidden lg:flex"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-xl transition-colors",
                      item.primary ? "bg-primary/10 text-primary" : "text-muted-foreground group-hover/tool:text-foreground group-hover/tool:bg-muted-foreground/10"
                    )}>
                      <item.icon size={item.primary ? 24 : 20} />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={cn(
                        "text-[10px] font-medium leading-none tracking-tight",
                        item.primary ? "font-bold text-foreground" : "text-muted-foreground group-hover/tool:text-foreground"
                      )}>{item.label}</span>
                      {(item.primary || item.label.includes('More')) && <ChevronDown size={8} className="opacity-50" />}
                    </div>
                  </button>

                  {/* Dropdown for Get Data / More Visuals */}
                  {item.primary && item.label === 'Get data' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card border rounded-xl shadow-2xl py-3 z-[100] hidden group-hover/tool:block animate-in fade-in zoom-in-95 duration-150">
                      <p className="px-4 py-1 text-[9px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Common Sources</p>
                      {[
                        { label: 'Excel Workbook', icon: Table },
                        { label: 'CSV / Text', icon: FileText },
                        { label: 'SQL Server', icon: Zap },
                        { label: 'Web / URL', icon: Globe },
                        { label: 'More Sources...', icon: Database }
                      ].map((source, k) => (
                        <div 
                          key={k}
                          onClick={() => handleAction(source.label)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                        >
                          <source.icon size={16} className="opacity-70" />
                          <span className="text-[11px] font-medium">{source.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/30 pb-2">
              {group.group}
            </span>
          </div>
        ))}
        
        {/* Extra Actions */}
        <div className="flex items-center gap-6 ml-auto px-6 shrink-0 border-l bg-background/50 h-full">
          <div 
            onClick={() => handleAction('Refresh')}
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary cursor-pointer transition-all active:scale-95"
          >
            <RefreshCw size={20} />
            <span className="text-[10px] font-bold tracking-tight">Refresh</span>
          </div>
          <div 
            onClick={() => handleAction('Share')}
            className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary cursor-pointer transition-all active:scale-95"
          >
            <Share2 size={20} />
            <span className="text-[10px] font-bold tracking-tight">Publish</span>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-[500px] max-w-[90vw] rounded-3xl border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b px-8 py-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Dashboard Published!</h2>
                <p className="text-xs text-muted-foreground">Your analytical insights are now live and shareable.</p>
              </div>
              <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-accent rounded-full transition-colors text-muted-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Share2 size={32} />
                </div>
                <h3 className="font-bold text-lg">Public Share Link</h3>
                <p className="text-xs text-muted-foreground max-w-[300px]">
                  Anyone with this link can view the live dashboard. No login required.
                </p>
              </div>

              <div className="relative group">
                <input 
                  readOnly 
                  value={generatedLink}
                  className="w-full bg-muted/30 border rounded-xl px-4 py-3 text-xs font-mono text-primary outline-none pr-24"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink);
                  }}
                  className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <Copy size={12} />
                  Copy Link
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {['Teams', 'Slack', 'Email'].map((platform) => (
                  <button key={platform} className="flex flex-col items-center gap-2 p-3 rounded-xl border hover:bg-muted transition-all grayscale hover:grayscale-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Globe size={16} />
                    </div>
                    <span className="text-[10px] font-medium">{platform}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/30 p-6 border-t flex justify-end">
              <button 
                onClick={() => setShowShareModal(false)}
                className="px-8 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
