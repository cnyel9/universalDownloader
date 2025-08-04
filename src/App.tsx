import React, { useState } from 'react';
import { Download, Video, Image, Music, ArrowRight, Smartphone, Globe, Shield, Zap, CheckCircle, Palette, Sun, Moon } from 'lucide-react';
import { TikTokDownloader } from './components/TikTokDownloader';
import { FacebookDownloader } from './components/FacebookDownloader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'tiktok' | 'facebook'>('tiktok');
  const { theme, setTheme, themes } = useTheme();

  const platforms = [
    {
      id: 'tiktok' as const,
      name: 'TikTok',
      icon: Video,
      gradient: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-700',
      description: 'Unduh video dan gambar TikTok dalam kualitas tinggi',
      category: 'Media Sosial'
    },
    {
      id: 'facebook' as const,
      name: 'Facebook',
      icon: Globe,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      description: 'Unduh video Facebook dalam berbagai kualitas',
      category: 'Media Sosial'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Sangat Cepat',
      description: 'Unduh video dalam hitungan detik dengan server yang dioptimalkan'
    },
    {
      icon: Shield,
      title: 'Aman & Terpercaya',
      description: 'Privasi Anda terlindungi. Tidak ada data yang disimpan atau dilacak'
    },
    {
      icon: Smartphone,
      title: 'Ramah Mobile',
      description: 'Bekerja sempurna di semua perangkat - mobile, tablet, dan desktop'
    },
    {
      icon: CheckCircle,
      title: 'Tanpa Registrasi',
      description: 'Mulai mengunduh langsung. Tidak perlu mendaftar'
    }
  ];

  const groupedPlatforms = platforms.reduce((acc, platform) => {
    if (!acc[platform.category]) {
      acc[platform.category] = [];
    }
    acc[platform.category].push(platform);
    return acc;
  }, {} as Record<string, typeof platforms>);

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.background}`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className={`absolute inset-0 ${theme.heroOverlay}`} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 ${theme.primaryGradient} rounded-full mb-6 sm:mb-8 shadow-lg`}>
              <Download className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${theme.text} mb-6 sm:mb-8`}>
              Universal
              <span className={`${theme.gradientText} bg-clip-text text-transparent`}>
                {' '}Downloader
              </span>
            </h1>
            <p className={`text-lg sm:text-xl ${theme.textSecondary} max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed`}>
              Unduh video, gambar, dan audio dari platform media sosial favorit Anda. 
              Cepat, gratis, dan aman - tanpa perlu registrasi.
            </p>

            {/* Theme Selector */}
            <div className="flex justify-center mb-8">
              <div className={`inline-flex items-center space-x-2 ${theme.cardBg} backdrop-blur-sm rounded-full p-2 shadow-lg border ${theme.border}`}>
                <Palette className={`w-4 h-4 ${theme.textSecondary} ml-2`} />
                {Object.entries(themes).map(([key, themeOption]) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key as keyof typeof themes)}
                    className={`w-8 h-8 rounded-full transition-all duration-300 transform hover:scale-110 ${
                      theme === themeOption 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' 
                        : 'hover:ring-2 hover:ring-white/50'
                    }`}
                    style={{ background: themeOption.themeColor }}
                    title={themeOption.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Categories */}
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.entries(groupedPlatforms).map(([category, categoryPlatforms]) => (
            <div key={category} className="mb-12">
              <div className="text-center mb-8">
                <h2 className={`text-2xl sm:text-3xl font-bold ${theme.text} mb-2`}>
                  {category}
                </h2>
                <div className={`w-20 h-1 ${theme.primaryGradient} rounded-full mx-auto`}></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {categoryPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setActiveTab(platform.id)}
                      className={`group relative p-6 sm:p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                        activeTab === platform.id
                          ? `${theme.cardBg} shadow-xl ring-2 ${theme.primaryRing} backdrop-blur-sm`
                          : `${theme.cardBg} hover:${theme.cardBg} shadow-lg backdrop-blur-sm border ${theme.border}`
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative">
                        <div className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${platform.gradient} rounded-xl mb-4 shadow-lg`}>
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h3 className={`text-xl sm:text-2xl font-bold ${theme.text} mb-2`}>{platform.name}</h3>
                        <p className={`${theme.textSecondary} text-sm sm:text-base leading-relaxed`}>{platform.description}</p>
                        <ArrowRight className={`absolute top-6 right-6 w-5 h-5 transition-all duration-300 ${
                          activeTab === platform.id ? `${theme.primary} opacity-100` : `${theme.textSecondary} opacity-0 group-hover:opacity-50`
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Downloader Component */}
          <div className={`${theme.cardBg} backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border ${theme.border}`}>
            {activeTab === 'tiktok' && <TikTokDownloader />}
            {activeTab === 'facebook' && <FacebookDownloader />}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 sm:py-24 ${theme.sectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.text} mb-4 sm:mb-6`}>
              Mengapa Memilih Universal Downloader?
            </h2>
            <p className={`text-lg sm:text-xl ${theme.textSecondary} max-w-3xl mx-auto`}>
              Rasakan cara tercepat dan paling terpercaya untuk mengunduh konten dari platform favorit Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`${theme.cardBg} backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border ${theme.border}`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${theme.primaryGradient} rounded-xl mb-4 sm:mb-6 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-bold ${theme.text} mb-2 sm:mb-3`}>{feature.title}</h3>
                  <p className={`${theme.textSecondary} text-sm sm:text-base leading-relaxed`}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${theme.text} mb-4 sm:mb-6`}>
              Cara Menggunakan
            </h2>
            <p className={`text-lg sm:text-xl ${theme.textSecondary}`}>
              Unduh video hanya dalam 3 langkah sederhana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              { step: '1', title: 'Tempel URL', description: 'Salin dan tempel URL video dari TikTok atau Facebook' },
              { step: '2', title: 'Pilih Kualitas', description: 'Pilih kualitas video dan format yang Anda inginkan' },
              { step: '3', title: 'Unduh', description: 'Klik unduh dan simpan video ke perangkat Anda' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${theme.primaryGradient} rounded-full text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 shadow-lg`}>
                  {item.step}
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${theme.text} mb-2 sm:mb-4`}>{item.title}</h3>
                <p className={`${theme.textSecondary} text-sm sm:text-base leading-relaxed`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;