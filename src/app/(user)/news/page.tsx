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
  const [selectedCategory, setSelectedCategory] = useState('semua');

  const filteredNews = useMemo(() => {
    return newsList.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           news.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (selectedCategory === 'semua') return matchesSearch;
      
      // Simple category filtering based on keywords
      const categoryKeywords = {
        'penghargaan': ['penghargaan', 'award'],
        'pelatihan': ['pelatihan', 'training'],
        'ekspor': ['ekspor', 'export'],
        'festival': ['festival', 'event'],
        'teknologi': ['teknologi', 'inovasi'],
        'kemitraan': ['kemitraan', 'partnership']
      };
      
      const keywords = categoryKeywords[selectedCategory as keyof typeof categoryKeywords] || [];
      const matchesCategory = keywords.some(keyword => 
        news.title.toLowerCase().includes(keyword) || 
        news.excerpt.toLowerCase().includes(keyword)
      );
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = [
    { value: 'semua', label: 'Semua' },
    { value: 'penghargaan', label: 'Penghargaan' },
    { value: 'pelatihan', label: 'Pelatihan' },
    { value: 'ekspor', label: 'Ekspor' },
    { value: 'festival', label: 'Festival' },
    { value: 'teknologi', label: 'Teknologi' },
    { value: 'kemitraan', label: 'Kemitraan' }
  ];

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

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Cari berita..."
                className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Tidak ada berita ditemukan</h3>
            <p className="text-amber-700">Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        )}
      </div>
    </div>
  );
}