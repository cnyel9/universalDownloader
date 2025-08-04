import React from 'react';
import { Download, Heart, Globe, Shield, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: 'Pengunduh TikTok', href: '#' },
      { name: 'Pengunduh Facebook', href: '#' },
      { name: 'Pengunduh Instagram', href: '#' },
      { name: 'Pengunduh YouTube', href: '#' }
    ],
    support: [
      { name: 'FAQ', href: '#' },
      { name: 'Pusat Bantuan', href: '#' },
      { name: 'Hubungi Kami', href: '#' },
      { name: 'Laporkan Masalah', href: '#' }
    ],
    legal: [
      { name: 'Kebijakan Privasi', href: '#' },
      { name: 'Syarat Layanan', href: '#' },
      { name: 'Kebijakan Cookie', href: '#' },
      { name: 'Penafian', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Universal Downloader</h3>
                <p className="text-sm text-gray-400">Cepat & Gratis</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              Cara paling terpercaya dan tercepat untuk mengunduh video dari platform media sosial favorit Anda. 
              Gratis, aman, dan mudah digunakan.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-green-400">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">Aman</span>
              </div>
              <div className="flex items-center text-blue-400">
                <Zap className="w-4 h-4 mr-2" />
                <span className="text-sm">Cepat</span>
              </div>
              <div className="flex items-center text-purple-400">
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-sm">Global</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 sm:mb-6">Produk</h4>
              <ul className="space-y-3">
                {links.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 sm:mb-6">Dukungan</h4>
              <ul className="space-y-3">
                {links.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 sm:mb-6">Legal</h4>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © {currentYear} Universal Downloader. Semua hak dilindungi.
            </p>
            <p className="flex items-center text-gray-400 text-sm">
              Dibuat dengan <Heart className="w-4 h-4 text-red-500 mx-1" /> untuk kreator konten
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}