import React from 'react';
import { Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Header() {
  const { theme } = useTheme();

  return (
    <header className={`${theme.cardBg} backdrop-blur-md border-b ${theme.border} sticky top-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 ${theme.primaryGradient} rounded-xl shadow-lg`}>
              <Download className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className={`text-lg sm:text-xl font-bold ${theme.text}`}>Universal Downloader</h1>
              <p className={`text-xs ${theme.textSecondary} hidden sm:block`}>Cepat & Gratis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}