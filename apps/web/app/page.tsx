"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart2, Shield, Zap, Database, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
              <BarChart2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Lumina<span className="text-blue-400">BI</span></span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Features</Link>
            <Link href="#solutions" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Solutions</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Sign In</Link>
            <Link 
              href="/sign-up" 
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-200 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 -z-10 h-full w-full max-w-7xl opacity-30 blur-[120px]">
          <div className="absolute top-1/4 -left-1/4 h-96 w-96 rounded-full bg-blue-600"></div>
          <div className="absolute top-1/2 -right-1/4 h-96 w-96 rounded-full bg-purple-600"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-xs font-semibold tracking-wide text-blue-400 uppercase mb-6">
            <Zap size={14} className="fill-blue-400" /> Introducing LuminaBI v2.0
          </div>
          <h1 className="max-w-4xl bg-gradient-to-b from-white to-slate-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl lg:text-8xl leading-[1.1]">
            Insight at the speed of thought.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 sm:text-xl leading-relaxed">
            Experience ultra-premium analytics with high-fidelity visualizations, seamless data integration, and AI-driven exploration. Designed for the elite professional.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/sign-up" 
              className="group flex h-14 items-center gap-2 rounded-full bg-blue-600 px-8 text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
            >
              Start Building Now
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
            </Link>
            <Link 
              href="#demo" 
              className="flex h-14 items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800 active:scale-95"
            >
              Watch Demo
            </Link>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative mt-12 w-full max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl shadow-blue-500/10 max-h-[550px] lg:max-h-[650px]">
            <Image 
              src="/landing-hero.png" 
              alt="LuminaBI Dashboard Preview" 
              width={1200} 
              height={630} 
              className="w-full object-cover object-top"
              priority
            />
            {/* Glassmorphic overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
          
          {/* Floating UI Elements (Simulated) */}
          <div className="absolute -left-10 top-1/4 hidden lg:block animate-float">
            <div className="rounded-xl border border-slate-700/50 bg-[#0f172a]/80 p-4 backdrop-blur-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Zap size={16} className="text-green-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Real-time sync</div>
                  <div className="text-sm text-slate-200 font-bold">14ms latency</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-24 bg-[#010409]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-white sm:text-5xl">Engineered for precision.</h2>
            <p className="mt-4 text-slate-400">Everything you need to master your data architecture.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: <Database />, title: "Schema Detection", desc: "Instantly ingest CSV or Excel files with intelligent field mapping and type inference." },
              { icon: <Shield />, title: "Enterprise Security", desc: "Bank-grade encryption and granular access controls for your sensitive datasets." },
              { icon: <Zap />, title: "Instant Visuals", desc: "Generate complex ECharts visualizations in seconds with our drag-and-drop engine." },
              { icon: <Globe />, title: "Public Sharing", desc: "Share live interactive dashboards with your team or the public via secure links." },
              { icon: <BarChart2 />, title: "Advanced Analytics", desc: "Perform complex aggregations and cross-filtering across multiple data sources." },
              { icon: <Shield />, title: "SOC2 Compliant", desc: "Rest easy knowing your data is handled with the highest industry standards." }
            ].map((f, i) => (
              <div key={i} className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-blue-500/50 hover:bg-slate-900">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Login Section (Requested) */}
      <section className="px-6 py-24 border-t border-slate-800">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Join the elite network.</h2>
          <div className="space-y-4">
            <Link 
              href="/sign-in" 
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#1e293b] py-3 text-slate-200 transition-all hover:bg-[#334155] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Link>
            <Link 
              href="/sign-in" 
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#1e293b] py-3 text-slate-200 transition-all hover:bg-[#334155] active:scale-[0.98]"
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12" />
              </svg>
              Continue with GitHub
            </Link>
            <Link 
              href="/sign-in" 
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-[#1e293b] py-3 text-slate-200 transition-all hover:bg-[#334155] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Continue with LinkedIn
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            By continuing, you agree to LuminaBI's Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-800 bg-[#020617]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <BarChart2 className="text-blue-500" size={20} />
            <span className="text-lg font-bold text-white">LuminaBI</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-300">Privacy</Link>
            <Link href="#" className="hover:text-slate-300">Terms</Link>
            <Link href="#" className="hover:text-slate-300">Contact</Link>
          </div>
          <p className="text-sm text-slate-600">© 2026 LuminaBI Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Global CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
