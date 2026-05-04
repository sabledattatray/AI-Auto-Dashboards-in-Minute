'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Sparkles, Layout, MousePointer2 } from 'lucide-react';

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('lumina-tour-seen');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps = [
    {
      title: "Welcome to LuminaBI",
      description: "Experience the next generation of data storytelling. This is your personal high-performance analytics workspace.",
      icon: <Sparkles className="text-primary" size={32} />,
    },
    {
      title: "Interactive Canvas",
      description: "Drag visuals from the sidebar onto the canvas. Move, resize, and layer them with pixel-perfect precision.",
      icon: <MousePointer2 className="text-primary" size={32} />,
    },
    {
      title: "AI-Powered Insights",
      description: "Click the sparkle icon on any visual to generate automated analysis and anomaly detection.",
      icon: <Layout className="text-primary" size={32} />,
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('lumina-tour-seen', 'true');
  };

  if (!isVisible) return null;

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-background/60 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-[480px] overflow-hidden rounded-3xl border bg-card p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={handleClose}
          className="absolute right-6 top-6 rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20">
            {currentStep.icon}
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
            {currentStep.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed mb-8">
            {currentStep.description}
          </p>

          <div className="flex w-full items-center justify-between mt-4">
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-primary' : 'w-1.5 bg-muted'}`} 
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
            >
              <span>{step === steps.length - 1 ? "Get Started" : "Next"}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
