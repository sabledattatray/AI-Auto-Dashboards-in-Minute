'use client';

import React from 'react';
import { 
  Sparkles, 
  X, 
  TrendingUp, 
  AlertCircle, 
  Info,
  ChevronRight,
  BrainCircuit,
  MessageSquareSparkles
} from 'lucide-react';
import { trpc } from '@/lib/trpc/client';
import { cn } from '@/lib/utils';

interface AIInsightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  tileId?: string;
}

export function AIInsightPanel({ isOpen, onClose, tileId }: AIInsightPanelProps) {
  const { mutate, data: result, isPending } = trpc.ai.generateInsights.useMutation();

  React.useEffect(() => {
    if (isOpen && tileId) {
      mutate({ tileId, data: {} });
    }
  }, [isOpen, tileId, mutate]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-y-0 right-0 w-[400px] bg-card border-l shadow-2xl z-[100] flex flex-col transition-transform duration-300">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BrainCircuit size={20} />
          </div>
          <h2 className="text-lg font-bold tracking-tight">AI Insights</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {isPending ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-20 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : result?.insights ? (
          <div className="space-y-6">
            <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
              <div className="flex items-center gap-2 text-primary mb-2">
                <MessageSquareSparkles size={18} />
                <span className="text-sm font-bold">Executive Summary</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on the current dataset, Lumina AI has detected strong positive correlation between marketing spend and user acquisition in the North region.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Detailed Findings</h3>
              {result.insights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-4 rounded-xl border transition-all hover:shadow-md",
                    insight.type === 'positive' && "bg-green-500/5 border-green-500/10",
                    insight.type === 'anomaly' && "bg-amber-500/5 border-amber-500/10",
                    insight.type === 'neutral' && "bg-muted/5 border-border"
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'positive' && <TrendingUp className="text-green-500" size={16} />}
                    {insight.type === 'anomaly' && <AlertCircle className="text-amber-500" size={16} />}
                    {insight.type === 'neutral' && <Info className="text-blue-500" size={16} />}
                    <span className="text-sm font-bold">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{insight.content}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 flex items-center justify-between rounded-xl border p-4 hover:bg-accent transition-all group">
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-primary">Next Step Recommendation</span>
                <span className="text-sm">Increase budget for North Region</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Sparkles size={32} className="text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground">Select a visual to generate AI-powered insights.</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t bg-muted/20">
        <p className="text-[10px] text-center text-muted-foreground">
          Powered by Lumina Intelligence & OpenAI GPT-4o
        </p>
      </div>
    </div>
  );
}
