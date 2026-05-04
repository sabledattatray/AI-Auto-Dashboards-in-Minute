export interface ThemeConfig {
  id: string;
  name: string;
  colors: string[];
  background: string;
  cardBackground: string;
  textColor: string;
  accentColor: string;
}

export const themes: ThemeConfig[] = [
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#eff6ff'],
    background: '#020617',
    cardBackground: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#3b82f6',
  },
  {
    id: 'emerald-city',
    name: 'Emerald City',
    colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#ecfdf5'],
    background: '#064e3b',
    cardBackground: '#065f46',
    textColor: '#f0fdf4',
    accentColor: '#10b981',
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    colors: ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#fff7ed'],
    background: '#451a03',
    cardBackground: '#7c2d12',
    textColor: '#fff7ed',
    accentColor: '#f97316',
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#f5f3ff'],
    background: '#2e1065',
    cardBackground: '#4c1d95',
    textColor: '#f5f3ff',
    accentColor: '#8b5cf6',
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    colors: ['#fbbf24', '#fcd34d', '#fde68a', '#fef3c7', '#fffbeb'],
    background: '#000000',
    cardBackground: '#111111',
    textColor: '#ffffff',
    accentColor: '#fbbf24',
  },
  {
    id: 'soft-minimal',
    name: 'Soft Minimal',
    colors: ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'],
    background: '#f8fafc',
    cardBackground: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#6366f1',
  },
];
