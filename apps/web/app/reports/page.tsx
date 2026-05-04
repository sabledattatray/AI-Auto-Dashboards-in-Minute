'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { FileText, Plus, Search, Filter, Grid, List } from 'lucide-react';

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Manage and share your analytics reports.</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus size={18} />
            <span>Create New Report</span>
          </button>
        </div>

        <div className="flex items-center gap-4 border-b pb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Filter reports..." 
              className="h-10 w-full rounded-lg border bg-muted/30 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-muted/10 p-1">
            <button className="p-1.5 rounded bg-background shadow-sm"><Grid size={16} /></button>
            <button className="p-1.5 rounded text-muted-foreground"><List size={16} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group rounded-2xl border bg-card overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="aspect-video bg-muted/30 flex items-center justify-center border-b">
                <FileText size={48} className="text-muted-foreground/20 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-foreground">Marketing Performance Q{i}</h4>
                <p className="text-xs text-muted-foreground mt-1">Last edited 2 days ago by You</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
