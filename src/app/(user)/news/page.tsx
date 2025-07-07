'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

interface News {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  date: string;
}

const newsList: News[] = [
  {
    id: 1,
    title: 'Kopi Gedong Raih Penghargaan Nasional',
    slug: 'kopi-gedong-raih-penghargaan',
    thumbnail: '/images/news1.jpg',
    excerpt: 'Kopi Gedong mendapatkan penghargaan dari Asosiasi Kopi Indonesia atas kualitas biji kopi terbaik tahun ini...',
    date: '2025-07-01'
  },
  {
    id: 2,
    title: 'Petani Kopi Berdaya Lewat Pelatihan Organik',
    slug: 'pelatihan-organik-petani-kopi',
    thumbnail: '/images/news2.jpg',
    excerpt: 'Pelatihan ini diikuti oleh 60 petani dari desa sekitar untuk meningkatkan kualitas panen kopi berkelanjutan...',
    date: '2025-06-20'
  },
  {
    id: 3,
    title: 'Ekspor Kopi Lokal Meningkat 40%',
    slug: 'ekspor-kopi-lokal-meningkat',
    thumbnail: '/images/news3.jpg',
    excerpt: 'Produk kopi lokal berhasil menembus pasar internasional dengan peningkatan ekspor yang signifikan...',
    date: '2025-06-15'
  },
  {
    id: 4,
    title: 'Festival Kopi Nusantara 2025',
    slug: 'festival-kopi-nusantara-2025',
    thumbnail: '/images/news4.jpg',
    excerpt: 'Festival tahunan yang menampilkan berbagai varian kopi dari seluruh Indonesia akan diselenggarakan...',
    date: '2025-06-10'
  },
  {
    id: 5,
    title: 'Teknologi Baru Pengolahan Kopi',
    slug: 'teknologi-baru-pengolahan-kopi',
    thumbnail: '/images/news5.jpg',
    excerpt: 'Inovasi teknologi terbaru dalam pengolahan kopi membantu meningkatkan kualitas dan efisiensi produksi...',
    date: '2025-06-05'
  },
  {
    id: 6,
    title: 'Kemitraan Strategis Petani dan Roaster',
    slug: 'kemitraan-strategis-petani-roaster',
    thumbnail: '/images/news6.jpg',
    excerpt: 'Program kemitraan antara petani kopi dan roaster lokal menciptakan ekosistem bisnis yang berkelanjutan...',
    date: '2025-05-30'
  },
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNews = useMemo(() => {
    return newsList.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Berita Terbaru
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Ikuti perkembangan terkini seputar dunia kopi dan komunitas petani kopi Indonesia
          </p>
        </div>

        {/* Search Section */}
        <div className="relative mb-12">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl shadow-2xl p-8 border border-amber-200">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-amber-900 mb-2">
                Temukan Berita Terbaru
              </h2>
              <p className="text-amber-800 text-sm">
                Cari informasi terkini tentang dunia kopi Indonesia
              </p>
            </div>
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ketik kata kunci untuk mencari berita..."
                className="w-full pl-12 pr-16 py-4 text-lg bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-200/50 focus:border-amber-300/50 transition-all duration-300 placeholder-gray-500 shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-orange-400 rounded-full opacity-20 animate-pulse delay-700"></div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-amber-700 text-sm">
              Menampilkan {filteredNews.length} hasil untuk "{searchTerm}"
            </p>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(news => (
            <Link 
              key={news.id} 
              href={`/news/${news.slug}`} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-100 hover:border-amber-200"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={news.thumbnail} 
                  alt={news.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <p className="text-sm text-amber-600 font-medium">
                    {new Date(news.date).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                
                <h2 className="text-lg font-bold text-amber-900 line-clamp-2 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  {news.title}
                </h2>
                
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {news.excerpt}
                </p>
                
                <div className="flex items-center mt-4 text-amber-600 group-hover:text-amber-800 transition-colors duration-300">
                  <span className="text-sm font-medium">Baca selengkapnya</span>
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-amber-700">Coba ubah kata kunci pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
}