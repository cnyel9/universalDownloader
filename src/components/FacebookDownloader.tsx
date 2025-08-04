import React, { useState } from 'react';
import { Download, Copy, ExternalLink, Video, Loader2, CheckCircle, AlertCircle, Globe, Clipboard, ClipboardCheck } from 'lucide-react';
import { downloadFacebook } from '../utils/facebookApi';
import type { FacebookResult } from '../types/api';
import { useTheme } from '../contexts/ThemeContext';

export function FacebookDownloader() {
  const { theme } = useTheme();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FacebookResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Silakan masukkan URL Facebook yang valid');
      return;
    }

    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
      setError('Silakan masukkan URL Facebook yang valid');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const downloadResult = await downloadFacebook(url);
      setResult(downloadResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memproses URL Facebook');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Gagal menyalin:', err);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Gagal menempel dari clipboard:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  const getQualityBadgeColor = (quality: string) => {
    if (quality.toLowerCase().includes('hd') || quality.toLowerCase().includes('720p') || quality.toLowerCase().includes('1080p')) {
      return 'bg-green-100 text-green-800';
    }
    if (quality.toLowerCase().includes('sd') || quality.toLowerCase().includes('480p')) {
      return 'bg-yellow-100 text-yellow-800';
    }
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4 shadow-lg">
          <Globe className="w-8 h-8 text-white" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${theme.text} mb-2`}>Pengunduh Facebook</h2>
        <p className={`${theme.textSecondary} text-sm sm:text-base`}>Unduh video Facebook dalam berbagai pilihan kualitas</p>
      </div>

      {/* URL Input */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tempel URL video Facebook di sini (contoh: https://www.facebook.com/...)"
            className={`w-full px-4 py-4 pr-40 border ${theme.border} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base ${theme.cardBg} ${theme.text}`}
            disabled={isLoading}
          />
          <div className="absolute right-2 top-2 bottom-2 flex space-x-2">
            <button
              onClick={pasteFromClipboard}
              className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center space-x-1 text-sm font-medium"
              title="Tempel dari clipboard"
            >
              <Clipboard className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              disabled={isLoading || !url.trim()}
              className="px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Unduh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className={theme.textSecondary}>Memproses URL Facebook Anda...</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900">Video berhasil ditemukan!</h3>
                <p className="text-green-700 text-sm">Pilih kualitas yang Anda inginkan untuk mengunduh</p>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${theme.text}`}>Pilihan Unduhan Tersedia</h3>
            <div className="grid gap-4">
              {result.links.map((link, index) => (
                <div key={index} className={`${theme.cardBg} border ${theme.border} rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-200`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Video className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`font-medium ${theme.text}`}>{link.quality}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityBadgeColor(link.quality)}`}>
                            {link.quality.includes('HD') ? 'HD' : link.quality.includes('SD') ? 'SD' : 'Standar'}
                          </span>
                        </div>
                        <p className={`text-sm ${theme.textSecondary}`}>Format Video MP4</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => copyToClipboard(link.href, `link-${index}`)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                        title="Salin tautan unduhan"
                      >
                        {copiedStates[`link-${index}`] ? (
                          <ClipboardCheck className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tips Mengunduh</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Pilih kualitas HD untuk pengalaman video terbaik</li>
              <li>• Klik kanan tombol unduh dan pilih "Simpan tautan sebagai..." untuk unduhan langsung</li>
              <li>• Di mobile, tekan lama tombol unduh untuk menyimpan file</li>
              <li>• Gunakan "Salin URL" jika unduhan langsung tidak berfungsi di browser Anda</li>
              <li>• Gunakan tombol clipboard untuk menempel URL dengan cepat</li>
            </ul>
          </div>

          {/* Quality Info */}
          <div className={`${theme.sectionBg} border ${theme.border} rounded-xl p-4 sm:p-6`}>
            <h4 className={`font-medium ${theme.text} mb-3`}>Panduan Kualitas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="text-center p-3 bg-green-100 rounded-lg">
                <div className="font-medium text-green-800">Kualitas HD</div>
                <div className="text-sm text-green-600">720p/1080p - Kualitas terbaik</div>
              </div>
              <div className="text-center p-3 bg-yellow-100 rounded-lg">
                <div className="font-medium text-yellow-800">Kualitas SD</div>
                <div className="text-sm text-yellow-600">480p - Kualitas baik</div>
              </div>
              <div className="text-center p-3 bg-blue-100 rounded-lg">
                <div className="font-medium text-blue-800">Standar</div>
                <div className="text-sm text-blue-600">360p - Ukuran file lebih kecil</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}