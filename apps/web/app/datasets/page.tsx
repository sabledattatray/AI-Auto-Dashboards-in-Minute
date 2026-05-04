'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useCanvasStore } from '@/store/useCanvasStore';
import { 
  Database, 
  Plus, 
  Upload, 
  FileText, 
  Link as LinkIcon, 
  Table, 
  MoreHorizontal,
  CheckCircle2,
  Clock,
  HardDrive,
  Loader2,
  Trash2,
  Settings,
  Filter,
  Wand2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  X,
  Eye,
  Download,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Dataset {
  id: string;
  name: string;
  source: string;
  rows: string;
  status: 'Ready' | 'Processing' | 'Error' | 'Syncing' | 'Transforming';
  updated: string;
  iconName: string;
  columns?: string[];
  data?: any[];
}

const iconMap: Record<string, any> = {
  'FileText': FileText,
  'ShieldCheck': ShieldCheck,
  'Database': Database,
  'Table': Table,
};

const initialDatasets: Dataset[] = [
  {
    id: 'ds-1',
    name: 'Q1 Sales Performance',
    source: 'CSV Upload',
    rows: '10',
    status: 'Ready',
    updated: '2 hours ago',
    iconName: 'FileText',
    columns: ['order_id', 'customer', 'date', 'amount', 'region', 'category'],
    data: [
      { order_id: 101, customer: 'Acme Corp', date: '2024-01-15', amount: 4500, region: 'North', category: 'Software' },
      { order_id: 102, customer: 'Globex', date: '2024-01-20', amount: 2800, region: 'South', category: 'Hardware' },
      { order_id: 103, customer: 'Soylent', date: '2024-02-05', amount: 3200, region: 'East', category: 'Software' },
      { order_id: 104, customer: 'Initech', date: '2024-02-12', amount: 1500, region: 'West', category: 'Services' },
      { order_id: 105, customer: 'Umbrella', date: '2024-02-28', amount: 6000, region: 'North', category: 'Hardware' },
      { order_id: 106, customer: 'Hooli', date: '2024-03-05', amount: 4200, region: 'East', category: 'Software' },
      { order_id: 107, customer: 'Pied Piper', date: '2024-03-15', amount: 1200, region: 'West', category: 'Services' },
      { order_id: 108, customer: 'Wayne Ent', date: '2024-03-20', amount: 8500, region: 'North', category: 'Hardware' },
      { order_id: 109, customer: 'Stark Ind', date: '2024-03-25', amount: 7200, region: 'East', category: 'Software' },
      { order_id: 110, customer: 'Oscorp', date: '2024-03-30', amount: 3100, region: 'South', category: 'Hardware' }
    ]
  },
  {
    id: 'ds-3',
    name: 'Loan Collection Master',
    source: 'BFSI Database',
    rows: '1,240',
    status: 'Ready',
    updated: 'Just now',
    iconName: 'ShieldCheck',
    columns: ['Customer_ID', 'Loan_ID', 'Loan_Amount', 'EMI_Amount', 'EMI_Number', 'Due_Date', 'Payment_Date', 'DPD', 'Bucket', 'Payment_Status', 'Agent_ID', 'Agent_Name', 'Region', 'State', 'Product_Type', 'Risk_Segment'],
    data: [
      { Customer_ID: 'C001', Loan_ID: 'L001', Loan_Amount: 50000, EMI_Amount: 2500, EMI_Number: 1, Due_Date: '2024-01-05', Payment_Date: '2024-01-04', DPD: 0, Bucket: 'Current', Payment_Status: 'Paid', Agent_ID: 'A01', Agent_Name: 'John Doe', Region: 'North', State: 'Delhi', Product_Type: 'Personal Loan', Risk_Segment: 'Low' },
      { Customer_ID: 'C002', Loan_ID: 'L002', Loan_Amount: 75000, EMI_Amount: 3500, EMI_Number: 2, Due_Date: '2024-01-10', Payment_Date: '2024-01-12', DPD: 2, Bucket: '0-30 DPD', Payment_Status: 'Paid', Agent_ID: 'A02', Agent_Name: 'Jane Smith', Region: 'South', State: 'Karnataka', Product_Type: 'Home Loan', Risk_Segment: 'Medium' },
      { Customer_ID: 'C003', Loan_ID: 'L003', Loan_Amount: 25000, EMI_Amount: 1200, EMI_Number: 5, Due_Date: '2024-01-15', Payment_Date: null, DPD: 15, Bucket: '0-30 DPD', Payment_Status: 'Pending', Agent_ID: 'A01', Agent_Name: 'John Doe', Region: 'North', State: 'UP', Product_Type: 'Vehicle Loan', Risk_Segment: 'High' },
      { Customer_ID: 'C004', Loan_ID: 'L004', Loan_Amount: 100000, EMI_Amount: 5000, EMI_Number: 1, Due_Date: '2024-01-20', Payment_Date: '2024-01-20', DPD: 0, Bucket: 'Current', Payment_Status: 'Paid', Agent_ID: 'A03', Agent_Name: 'Bob Wilson', Region: 'East', State: 'WB', Product_Type: 'Home Loan', Risk_Segment: 'Low' },
      { Customer_ID: 'C005', Loan_ID: 'L005', Loan_Amount: 40000, EMI_Amount: 2000, EMI_Number: 3, Due_Date: '2024-01-25', Payment_Date: null, DPD: 35, Bucket: '31-60 DPD', Payment_Status: 'Pending', Agent_ID: 'A02', Agent_Name: 'Jane Smith', Region: 'South', State: 'Tamil Nadu', Product_Type: 'Personal Loan', Risk_Segment: 'Medium' }
    ]
  }
];

export default function DatasetsPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transformingDataset, setTransformingDataset] = useState<Dataset | null>(null);
  const [viewingDataset, setViewingDataset] = useState<Dataset | null>(null);
  const [activeTab, setActiveTab] = useState<'clean' | 'schema' | 'preview'>('clean');
  const [showSourceModal, setShowSourceModal] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setLoadedDataset } = useCanvasStore();
  const router = useRouter();

  // Load datasets on mount and handle query params
  React.useEffect(() => {
    const saved = localStorage.getItem('lumina_datasets');
    const explicitlyCleared = localStorage.getItem('lumina_explicitly_cleared');
    
    if (saved) {
      try {
        setDatasets(JSON.parse(saved));
      } catch (e) {
        setDatasets(explicitlyCleared === 'true' ? [] : initialDatasets);
      }
    } else if (explicitlyCleared !== 'true') {
      setDatasets(initialDatasets);
    } else {
      setDatasets([]);
    }

    // Handle deep-link actions from Topbar
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'upload') {
      handleBrowseClick();
    } else if (params.get('action') === 'connect') {
      setShowSourceModal(true);
    }
  }, []);

  // Save datasets on change
  React.useEffect(() => {
    if (datasets.length > 0 || localStorage.getItem('lumina_datasets')) {
      localStorage.setItem('lumina_datasets', JSON.stringify(datasets));
    }
  }, [datasets]);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        simulateUpload(file, text);
      };
      reader.readAsText(file);
    }
  };

  const simulateUpload = (file: File, text: string) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishUpload(file, text);
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const finishUpload = (file: File, text: string) => {
    // Simple CSV parser
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj: any = {};
      headers.forEach((h, i) => {
        const val = values[i];
        // Try to parse as number
        if (!isNaN(val as any) && val !== '') {
          obj[h] = Number(val);
        } else {
          obj[h] = val;
        }
      });
      return obj;
    });

    const newDataset: Dataset = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      source: 'CSV Upload',
      rows: data.length.toLocaleString(),
      status: 'Ready',
      updated: 'Just now',
      iconName: 'FileText',
      columns: headers,
      data: data as any // Storing data in dataset object for internal use
    };

    setDatasets(prev => [newDataset, ...prev]);
    localStorage.removeItem('lumina_explicitly_cleared');
    setIsUploading(false);
  };

  const startTransform = (ds: Dataset) => {
    setTransformingDataset(ds);
    setActiveTab('clean');
  };

  const handleFinalLoad = () => {
    if (!transformingDataset) return;
    setLoadedDataset(transformingDataset);
    router.push('/');
  };

  const handleDeleteDataset = (id: string) => {
    setDatasets(prev => {
      const filtered = prev.filter(d => d.id !== id);
      // Mark as explicitly cleared if empty
      if (filtered.length === 0) {
        localStorage.setItem('lumina_explicitly_cleared', 'true');
      }
      return filtered;
    });
    
    // Clear engine memory if this was the active dataset
    const currentDS = useCanvasStore.getState().lastLoadedDataset;
    if (currentDS?.id === id) {
      useCanvasStore.getState().setLoadedDataset(null);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all datasets? This cannot be undone.')) {
      setDatasets([]);
      localStorage.setItem('lumina_explicitly_cleared', 'true');
      useCanvasStore.getState().setLoadedDataset(null);
    }
  };

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".csv,.xlsx,.json"
        />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Workspace</h1>
            <p className="text-muted-foreground mt-1">Ingest, explore, and transform your datasets for analysis.</p>
          </div>
          <button 
            onClick={() => setShowSourceModal(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span>Connect New Source</span>
          </button>
        </div>

        {/* Upload Zone & ETL Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 rounded-3xl border-2 border-dashed bg-muted/30 p-12 text-center transition-colors hover:bg-muted/50 flex flex-col items-center justify-center relative overflow-hidden">
            {isUploading && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 animate-in fade-in">
                <Loader2 className="animate-spin text-primary mb-4" size={48} />
                <h4 className="text-xl font-bold">Uploading File...</h4>
                <div className="w-full max-w-xs h-2 bg-muted rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">{uploadProgress}% Complete</p>
              </div>
            )}

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground">Quick Ingest</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Drag and drop your data files. Our ETL engine will automatically clean, transform, and map your schema.
            </p>
            <button 
              onClick={handleBrowseClick}
              className="mt-6 rounded-lg border bg-background px-6 py-2.5 text-sm font-semibold hover:bg-accent transition-all active:scale-95"
            >
              Browse Files
            </button>
          </div>

          <div className="rounded-3xl border bg-card p-6 flex flex-col gap-6">
            <h3 className="font-bold flex items-center gap-2">
              <Zap size={18} className="text-yellow-500" />
              Ingestion Hub
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-muted/30 border">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span>sales_data.csv loaded</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Loader2 size={12} className="text-blue-500 animate-spin" />
                    <span>Syncing PostgreSQL...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dataset List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Active Datasets</h3>
            <div className="text-xs text-muted-foreground">{datasets.length} sources connected</div>
          </div>
          <div className="grid gap-4">
            {datasets.map((ds) => {
              const Icon = iconMap[ds.iconName] || Database;
              return (
                <div 
                  key={ds.id}
                  className="group flex items-center justify-between rounded-2xl border bg-card p-4 transition-all hover:shadow-md hover:border-primary/20"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset",
                      ds.status === 'Ready' ? "bg-green-500/10 text-green-600 ring-green-500/20" :
                      ds.status === 'Processing' || ds.status === 'Syncing' ? "bg-blue-500/10 text-blue-600 ring-blue-500/20" :
                      "bg-red-500/10 text-red-600 ring-red-500/20"
                    )}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{ds.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><LinkIcon size={12} />{ds.source}</span>
                        <span className="flex items-center gap-1"><HardDrive size={12} />{ds.rows} rows</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setViewingDataset(ds)}
                      className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-accent transition-colors"
                    >
                      <Eye size={14} />
                      View Data
                    </button>
                    <button 
                      onClick={() => startTransform(ds)}
                      className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/20 transition-colors"
                    >
                      <Wand2 size={14} />
                      Transform & Load
                    </button>
                    <button 
                      onClick={() => handleDeleteDataset(ds.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Data Modal */}
      {viewingDataset && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-[1200px] max-w-[95vw] h-[800px] rounded-3xl border bg-card shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <Table size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{viewingDataset.name}</h2>
                  <p className="text-xs text-muted-foreground">Exploring raw data records</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold hover:bg-accent transition-all">
                  <Download size={14} />
                  Export CSV
                </button>
                <button onClick={() => setViewingDataset(null)} className="p-2 hover:bg-accent rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card z-10 border-b">
                  <tr className="text-muted-foreground text-left">
                    {viewingDataset.columns?.map(col => (
                      <th key={col} className="px-6 py-4 font-semibold capitalize bg-muted/30">{col.replace('_', ' ')}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[...Array(20)].map((_, i) => (
                    <tr key={i} className="hover:bg-muted/10 transition-colors">
                      {viewingDataset.columns?.map(col => (
                        <td key={col} className="px-6 py-4 text-muted-foreground">
                          {col === 'amount' ? `$${(Math.random() * 5000).toFixed(2)}` : 
                           col === 'date' ? '2024-05-03' : 
                           col === 'status' ? 'Ready' : 
                           `Value_${i}_${col}`}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="border-t px-8 py-4 bg-muted/5 text-xs text-muted-foreground flex justify-between items-center">
              <span>Showing first 50 of {viewingDataset.rows} rows</span>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded border hover:bg-accent disabled:opacity-50" disabled>Previous</button>
                <button className="px-2 py-1 rounded border hover:bg-accent">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transformation Modal */}
      {transformingDataset && (
        <div className="fixed inset-0 z-[6000] flex items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-[1000px] max-w-[95vw] h-[700px] rounded-3xl border bg-card shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <Wand2 size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Data Transformation Studio</h2>
                  <p className="text-xs text-muted-foreground">Cleaning & Mapping: <span className="text-foreground font-medium">{transformingDataset.name}</span></p>
                </div>
              </div>
              <button onClick={() => setTransformingDataset(null)} className="p-2 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-8">
              {['clean', 'schema', 'preview'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "px-6 py-4 text-sm font-medium border-b-2 transition-all capitalize",
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === 'clean' ? '1. Clean & Refine' : tab === 'schema' ? '2. Schema Mapping' : '3. Final Preview'}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-8">
              {activeTab === 'clean' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border p-4 bg-muted/10 space-y-3">
                      <h4 className="text-sm font-bold flex items-center gap-2"><Filter size={16} /> Filters & Cleaning</h4>
                      <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                        <input type="checkbox" defaultChecked className="rounded border-primary text-primary" />
                        <span>Remove null/empty rows</span>
                      </label>
                      <label className="flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 p-2 rounded-md transition-colors">
                        <input type="checkbox" defaultChecked className="rounded border-primary text-primary" />
                        <span>Trim whitespace from text columns</span>
                      </label>
                    </div>
                    <div className="rounded-2xl border p-4 bg-muted/10 space-y-3">
                      <h4 className="text-sm font-bold flex items-center gap-2"><ShieldCheck size={16} /> Validation</h4>
                      <div className="text-xs text-muted-foreground p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600">
                        Auto-detected: {transformingDataset.columns?.length} columns, 12,450 records. No corrupted data found.
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'schema' && (
                <div className="space-y-4">
                   <h3 className="text-lg font-bold">Schema Mapping Ready</h3>
                   <div className="grid grid-cols-2 gap-3">
                     {transformingDataset.columns?.map(col => (
                       <div key={col} className="flex items-center justify-between p-3 rounded-xl border bg-muted/10">
                         <span className="text-sm font-medium capitalize">{col.replace('_', ' ')}</span>
                         <select className="text-xs bg-background border rounded px-2 py-1 outline-none">
                            <option>String</option>
                            <option>Number</option>
                            <option>Date</option>
                            <option>Boolean</option>
                         </select>
                       </div>
                     ))}
                   </div>
                </div>
              )}
              {activeTab === 'preview' && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-bold">Transformation Successful</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Your data is refined and ready to be loaded into the LuminaBI Intelligence Engine.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t px-8 py-6 flex items-center justify-between bg-muted/5">
              <button onClick={() => setTransformingDataset(null)} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Cancel
              </button>
              <div className="flex items-center gap-3">
                {activeTab !== 'preview' ? (
                  <button 
                    onClick={() => setActiveTab(activeTab === 'clean' ? 'schema' : 'preview')}
                    className="flex items-center gap-2 rounded-xl bg-muted border px-6 py-2.5 text-sm font-semibold hover:bg-accent"
                  >
                    <span>Next Step</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button 
                    onClick={handleFinalLoad}
                    className="flex items-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                  >
                    <span>Load to Engine</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Source Selection Modal */}
      {showSourceModal && (
        <div className="fixed inset-0 z-[7000] flex items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-[800px] max-w-[95vw] rounded-3xl border bg-card shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between border-b px-8 py-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Connect Data Source</h2>
                <p className="text-xs text-muted-foreground">Select a source to begin your analytical journey.</p>
              </div>
              <button onClick={() => setShowSourceModal(false)} className="p-2 hover:bg-accent rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 grid grid-cols-2 gap-4">
              {[
                { name: 'Excel Workbook', icon: Table, desc: 'Connect to .xlsx or .xls files', color: 'bg-green-500' },
                { name: 'CSV / Text File', icon: FileText, desc: 'Import flat files instantly', color: 'bg-blue-500', action: handleBrowseClick },
                { name: 'SQL Server', icon: Zap, desc: 'Connect to enterprise databases', color: 'bg-red-500' },
                { name: 'Web / API', icon: Globe, desc: 'Fetch data from live endpoints', color: 'bg-purple-500' },
                { name: 'PostgreSQL', icon: Database, desc: 'Direct cloud database sync', color: 'bg-indigo-500' },
                { name: 'SharePoint', icon: LinkIcon, desc: 'Sync from shared team drives', color: 'bg-sky-500' }
              ].map((source, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    if (source.action) {
                      source.action();
                      setShowSourceModal(false);
                    } else {
                      alert(`Coming Soon: ${source.name} connection will be available in the next release!`);
                    }
                  }}
                  className="flex items-center gap-4 p-4 rounded-2xl border bg-muted/20 hover:border-primary hover:bg-primary/5 transition-all group text-left"
                >
                  <div className={cn("h-12 w-12 shrink-0 rounded-xl flex items-center justify-center text-white shadow-lg", source.color)}>
                    <source.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{source.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{source.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-muted/30 p-6 border-t flex justify-end">
              <button onClick={() => setShowSourceModal(false)} className="px-6 py-2 text-sm font-medium hover:text-primary transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
