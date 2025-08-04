import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Theme {
  name: string;
  themeColor: string;
  background: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryGradient: string;
  gradientText: string;
  border: string;
  primaryRing: string;
  heroOverlay: string;
  sectionBg: string;
}

export const themes = {
  blue: {
    name: 'Biru',
    themeColor: 'linear-gradient(135deg, #2563EB, #7C3AED)',
    background: 'bg-gradient-to-br from-slate-50 to-blue-50',
    cardBg: 'bg-white/80',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    primary: 'text-blue-500',
    primaryGradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    gradientText: 'bg-gradient-to-r from-blue-600 to-purple-600',
    border: 'border-gray-200/50',
    primaryRing: 'ring-blue-500/50',
    heroOverlay: 'bg-gradient-to-br from-blue-600/10 to-purple-600/10',
    sectionBg: 'bg-gradient-to-r from-gray-50/50 to-blue-50/50'
  },
  purple: {
    name: 'Ungu',
    themeColor: 'linear-gradient(135deg, #7C3AED, #EC4899)',
    background: 'bg-gradient-to-br from-purple-50 to-pink-50',
    cardBg: 'bg-white/80',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    primary: 'text-purple-500',
    primaryGradient: 'bg-gradient-to-r from-purple-600 to-pink-600',
    gradientText: 'bg-gradient-to-r from-purple-600 to-pink-600',
    border: 'border-purple-200/50',
    primaryRing: 'ring-purple-500/50',
    heroOverlay: 'bg-gradient-to-br from-purple-600/10 to-pink-600/10',
    sectionBg: 'bg-gradient-to-r from-purple-50/50 to-pink-50/50'
  },
  green: {
    name: 'Hijau',
    themeColor: 'linear-gradient(135deg, #059669, #0D9488)',
    background: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    cardBg: 'bg-white/80',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    primary: 'text-emerald-500',
    primaryGradient: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    gradientText: 'bg-gradient-to-r from-emerald-600 to-teal-600',
    border: 'border-emerald-200/50',
    primaryRing: 'ring-emerald-500/50',
    heroOverlay: 'bg-gradient-to-br from-emerald-600/10 to-teal-600/10',
    sectionBg: 'bg-gradient-to-r from-emerald-50/50 to-teal-50/50'
  },
  orange: {
    name: 'Oranye',
    themeColor: 'linear-gradient(135deg, #EA580C, #DC2626)',
    background: 'bg-gradient-to-br from-orange-50 to-red-50',
    cardBg: 'bg-white/80',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    primary: 'text-orange-500',
    primaryGradient: 'bg-gradient-to-r from-orange-600 to-red-600',
    gradientText: 'bg-gradient-to-r from-orange-600 to-red-600',
    border: 'border-orange-200/50',
    primaryRing: 'ring-orange-500/50',
    heroOverlay: 'bg-gradient-to-br from-orange-600/10 to-red-600/10',
    sectionBg: 'bg-gradient-to-r from-orange-50/50 to-red-50/50'
  },
  dark: {
    name: 'Gelap',
    themeColor: 'linear-gradient(135deg, #1F2937, #374151)',
    background: 'bg-gradient-to-br from-gray-900 to-gray-800',
    cardBg: 'bg-gray-800/80',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    primary: 'text-blue-400',
    primaryGradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
    gradientText: 'bg-gradient-to-r from-blue-400 to-purple-400',
    border: 'border-gray-700/50',
    primaryRing: 'ring-blue-500/50',
    heroOverlay: 'bg-gradient-to-br from-blue-600/20 to-purple-600/20',
    sectionBg: 'bg-gradient-to-r from-gray-800/50 to-gray-700/50'
  }
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: keyof typeof themes) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('blue');

  const setTheme = (themeName: keyof typeof themes) => {
    setCurrentTheme(themeName);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: themes[currentTheme], 
      setTheme,
      themes 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}