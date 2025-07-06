'use client';

import Link from 'next/link';
import { Pencil, Plus, Eye, Trash2, Calendar, User, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const initialNews = [
  { 
    id: 'kopi-terbaru-2024', 
    title: 'Peluncuran Kopi Arabica Premium Terbaru 2024', 
    category: 'Product Launch',
    author: 'Admin Coffee',
    publishDate: '2024-01-15',
    status: 'Published',
    views: 1245,
    isHighlight: true,
    excerpt: 'Kami dengan bangga memperkenalkan varian kopi arabica premium terbaru yang akan memanjakan lidah para pecinta kopi...'
  },
  { 
    id: 'tips-brewing-perfect', 
    title: 'Tips Brewing Kopi yang Sempurna di Rumah', 
    category: 'Tips & Tricks',
    author: 'Barista Expert',
    publishDate: '2024-01-10',
    status: 'Published',
    views: 892,
    isHighlight: false,
    excerpt: 'Belajar teknik brewing kopi yang tepat untuk menghasilkan secangkir kopi yang sempurna dengan aroma dan rasa yang maksimal...'
  },
  { 
    id: 'coffee-culture-indonesia', 
    title: 'Budaya Kopi Indonesia yang Mendunia', 
    category: 'Culture',
    author: 'Coffee Historian',
    publishDate: '2024-01-08',
    status: 'Draft',
    views: 0,
    isHighlight: false,
    excerpt: 'Menjelajahi perjalanan panjang budaya kopi Indonesia dari masa ke masa dan bagaimana pengaruhnya terhadap dunia...'
  },
  { 
    id: 'health-benefits-coffee', 
    title: 'Manfaat Kesehatan dari Minum Kopi Secara Teratur', 
    category: 'Health',
    author: 'Dr. Coffee',
    publishDate: '2024-01-05',
    status: 'Published',
    views: 1567,
    isHighlight: true,
    excerpt: 'Penelitian terbaru menunjukkan berbagai manfaat kesehatan yang bisa diperoleh dari konsumsi kopi secara teratur...'
  },
];

export default function NewsAdminPage() {
  const [news, setNews] = useState(initialNews);
  const [filter, setFilter] = useState('All');

  const toggleHighlight = (newsId) => {
    setNews(news.map(item => 
      item.id === newsId 
        ? { ...item, isHighlight: !item.isHighlight }
        : item
    ));
  };

  const toggleStatus = (newsId) => {
    setNews(news.map(item => 
      item.id === newsId 
        ? { ...item, status: item.status === 'Published' ? 'Draft' : 'Published' }
        : item
    ));
  };

  const deleteNews = (newsId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      setNews(news.filter(item => item.id !== newsId));
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Published') {
      return <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-sm">🟢 Published</span>;
    }
    return <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-xs font-semibold rounded-full shadow-sm">🟡 Draft</span>;
  };

  const getCategoryBadge = (category) => {
    const categoryStyles = {
      'Product Launch': 'from-purple-400 to-purple-600',
      'Tips & Tricks': 'from-blue-400 to-blue-600',
      'Culture': 'from-indigo-400 to-indigo-600',
      'Health': 'from-pink-400 to-pink-600',
      'News': 'from-gray-400 to-gray-600'
    };
    
    return (
      <span className={`px-3 py-1 bg-gradient-to-r ${categoryStyles[category] || categoryStyles['News']} text-white text-xs font-medium rounded-full shadow-sm`}>
        {category}
      </span>
    );
  };

  const filteredNews = filter === 'All' ? news : news.filter(item => item.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-3">
              📰 Manajemen Berita & Artikel
            </h1>
            <p className="text-gray-600 mt-2">Kelola konten berita dan artikel blog kopi Anda</p>
          </div>
          <Link href="/admin/news/new">
            <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <Plus className="w-5 h-5" />
              Buat Artikel Baru
            </button>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-sm border border-white/20">
            {['All', 'Published', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filter === status
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                {status === 'All' ? 'Semua' : status === 'Published' ? 'Terpublikasi' : 'Draft'}
                <span className="ml-2 text-sm">
                  ({status === 'All' ? news.length : news.filter(item => item.status === status).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* News List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-100 to-gray-100 text-gray-700">
                <tr>
                  <th className="text-left p-6 font-bold text-gray-800">Artikel</th>
                  <th className="text-left p-6 font-bold text-gray-800">Kategori</th>
                  <th className="text-left p-6 font-bold text-gray-800">Penulis</th>
                  <th className="text-left p-6 font-bold text-gray-800">Tanggal</th>
                  <th className="text-left p-6 font-bold text-gray-800">Status</th>
                  <th className="text-left p-6 font-bold text-gray-800">Views</th>
                  <th className="text-left p-6 font-bold text-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item, index) => (
                  <tr key={item.id} className={`border-t border-gray-100 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                    <td className="p-6">
                      <div className="flex items-start gap-4">
                        {item.isHighlight && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            ⭐ HOT
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 hover:text-amber-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{item.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">{getCategoryBadge(item.category)}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{item.author}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{new Date(item.publishDate).toLocaleDateString('id-ID')}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="cursor-pointer hover:scale-105 transition-transform"
                      >
                        {getStatusBadge(item.status)}
                      </button>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-700">{item.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <Link href={`/admin/news/${item.id}`}>
                          <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 px-3 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-md">
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => toggleHighlight(item.id)}
                          className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                            item.isHighlight
                              ? 'text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                              : 'text-yellow-600 bg-yellow-50 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 hover:text-white'
                          }`}
                        >
                          <TrendingUp className="w-4 h-4" />
                          {item.isHighlight ? 'Hot' : 'Highlight'}
                        </button>
                        <button
                          onClick={() => deleteNews(item.id)}
                          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 px-3 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mt-6">
            <div className="text-gray-400 mb-4">
              <Clock className="w-12 h-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'All' ? 'Belum ada artikel' : `Tidak ada artikel ${filter.toLowerCase()}`}
            </h3>
            <p className="text-gray-600 mb-4">
              {filter === 'All' ? 'Mulai dengan membuat artikel pertama Anda' : `Tidak ada artikel dengan status ${filter.toLowerCase()}`}
            </p>
            <Link href="/admin/news/new">
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Buat Artikel Pertama
              </button>
            </Link>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
          <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
            📊 Statistik Konten
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-slate-100 to-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="text-3xl font-bold text-gray-800 mb-2">{news.length}</div>
              <div className="text-sm font-medium text-gray-600">Total Artikel</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="text-3xl font-bold text-green-800 mb-2">{news.filter(item => item.status === 'Published').length}</div>
              <div className="text-sm font-medium text-green-700">📡 Terpublikasi</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="text-3xl font-bold text-orange-800 mb-2">{news.filter(item => item.status === 'Draft').length}</div>
              <div className="text-sm font-medium text-orange-700">📝 Draft</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <div className="text-3xl font-bold text-yellow-800 mb-2">{news.filter(item => item.isHighlight).length}</div>
              <div className="text-sm font-medium text-yellow-700">⭐ Hot Articles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}