import React, { useState } from 'react';
import { Download, Copy, ExternalLink, Video, Image, Music, Loader2, CheckCircle, AlertCircle, Clipboard, ClipboardCheck } from 'lucide-react';
import { downloadTikTok, downloadTikTokSlide } from '../utils/tiktokApi';
import type { TikTokVideoResult, TikTokSlideResult } from '../types/api';
import { useTheme } from '../contexts/ThemeContext';

export function TikTokDownloader() {
  const { theme } = useTheme();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TikTokVideoResult | TikTokSlideResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Silakan masukkan URL TikTok yang valid');
      return;
    }

    if (!url.includes('tiktok.com')) {
      setError('Silakan masukkan URL TikTok yang valid');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Try video download first
      try {
        const videoResult = await downloadTikTok(url);
        setResult(videoResult);
      } catch {
        // If video download fails, try slide download
        const slideResult = await downloadTikTokSlide(url);
        setResult(slideResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memproses URL TikTok');
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

  const isSlideResult = (result: TikTokVideoResult | TikTokSlideResult): result is TikTokSlideResult => {
    return 'image' in result;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-4 shadow-lg">
          <Video className="w-8 h-8 text-white" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-bold ${theme.text} mb-2`}>Pengunduh TikTok</h2>
        <p className={`${theme.textSecondary} text-sm sm:text-base`}>Unduh video dan slideshow foto TikTok dalam kualitas tinggi</p>
      </div>

      {/* URL Input */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tempel URL TikTok di sini (contoh: https://www.tiktok.com/@username/video/...)"
            className={`w-full px-4 py-4 pr-40 border ${theme.border} rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base ${theme.cardBg} ${theme.text}`}
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
              className="px-6 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
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
          <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
          <p className={theme.textSecondary}>Memproses URL TikTok Anda...</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Video Info */}
          <div className={`${theme.sectionBg} rounded-xl p-4 sm:p-6 border ${theme.border}`}>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${theme.text} mb-2`}>@{result.author}</h3>
                <p className={`${theme.textSecondary} text-sm sm:text-base leading-relaxed`}>{result.desc}</p>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="grid gap-4">
            {isSlideResult(result) ? (
              // Slide/Image Results
              <>
                <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-4 sm:p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image className="w-5 h-5 text-blue-500" />
                      <span className={`font-medium ${theme.text}`}>Slideshow Foto ({result.image.length} gambar)</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                    {result.image.slice(0, 8).map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-200 flex items-center justify-center">
                          <a
                            href={imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 bg-white rounded-full p-2 transition-all duration-200"
                          >
                            <ExternalLink className="w-4 h-4 text-gray-700" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={result.image[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      <span>Unduh Gambar Pertama</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(result.image.join('\n'), 'all-images')}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      {copiedStates['all-images'] ? (
                        <ClipboardCheck className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copiedStates['all-images'] ? 'Tersalin!' : 'Salin Semua URL'}</span>
                    </button>
                  </div>
                </div>

                {/* Audio */}
                <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-4 sm:p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Music className="w-5 h-5 text-green-500" />
                      <span className={`font-medium ${theme.text}`}>Audio Latar</span>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={result.audio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh Audio</span>
                      </a>
                      <button
                        onClick={() => copyToClipboard(result.audio, 'audio')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        {copiedStates['audio'] ? (
                          <ClipboardCheck className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Video Results
              <>
                <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-4 sm:p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Video className="w-5 h-5 text-red-500" />
                      <span className={`font-medium ${theme.text}`}>Video (MP4)</span>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={result.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh Video</span>
                      </a>
                      <button
                        onClick={() => copyToClipboard(result.video, 'video')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        {copiedStates['video'] ? (
                          <ClipboardCheck className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`${theme.cardBg} border ${theme.border} rounded-xl p-4 sm:p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Music className="w-5 h-5 text-green-500" />
                      <span className={`font-medium ${theme.text}`}>Audio Saja (MP3)</span>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={result.audio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh Audio</span>
                      </a>
                      <button
                        onClick={() => copyToClipboard(result.audio, 'audio')}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
                      >
                        {copiedStates['audio'] ? (
                          <ClipboardCheck className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tips Mengunduh</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Klik kanan tombol unduh dan pilih "Simpan tautan sebagai..." untuk unduhan langsung</li>
              <li>• Di mobile, tekan lama tombol unduh untuk menyimpan file</li>
              <li>• Gunakan "Salin URL" jika unduhan langsung tidak berfungsi di browser Anda</li>
              <li>• Gunakan tombol clipboard untuk menempel URL dengan cepat</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}