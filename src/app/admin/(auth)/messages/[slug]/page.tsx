'use client';

import { Mail, User, Calendar, ChevronRight, Star, Reply, Archive, Trash2, MessageCircle, Clock, CheckCircle2, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Mock data - in real app, this would come from API/database
const dummyMessages = [
  {
    id: 1,
    name: 'Andi Saputra',
    email: 'andi@email.com',
    message: 'Apakah kopi ini bisa dipesan dalam jumlah besar?',
    fullMessage: 'Halo, saya tertarik dengan produk kopi Anda. Apakah kopi ini bisa dipesan dalam jumlah besar untuk acara kantor? Berapa minimum order dan apakah ada diskon khusus untuk pembelian dalam jumlah banyak? Terima kasih.',
    date: '2025-07-06',
    time: '14:30',
    isRead: false,
    isStarred: false,
    priority: 'high',
    category: 'inquiry',
    slug: 'andi-saputra-1',
    avatar: 'AS'
  },
  {
    id: 2,
    name: 'Rina Lestari',
    email: 'rina@email.com',
    message: 'Kapan promo diskon berikutnya?',
    fullMessage: 'Selamat siang, saya sudah lama mengikuti brand kopi Anda dan sering membeli produk-produknya. Saya ingin tahu kapan promo diskon berikutnya akan dimulai? Saya berencana untuk membeli beberapa varian sekaligus.',
    date: '2025-07-05',
    time: '10:15',
    isRead: true,
    isStarred: true,
    priority: 'medium',
    category: 'promotion',
    slug: 'rina-lestari-2',
    avatar: 'RL'
  },
  {
    id: 3,
    name: 'Budi Santoso',
    email: 'budi@email.com',
    message: 'Saya suka packagingnya, sangat menarik!',
    fullMessage: 'Halo tim, saya baru saja menerima pesanan kopi dari Anda dan saya sangat terkesan dengan packaging-nya. Desainnya sangat menarik dan ramah lingkungan. Kualitas kopinya juga excellent! Akan saya rekomendasikan ke teman-teman.',
    date: '2025-07-04',
    time: '16:45',
    isRead: true,
    isStarred: false,
    priority: 'low',
    category: 'feedback',
    slug: 'budi-santoso-3',
    avatar: 'BS'
  },
  {
    id: 4,
    name: 'Maya Sari',
    email: 'maya@email.com',
    message: 'Pengiriman terlambat, mohon informasi status',
    fullMessage: 'Selamat pagi, saya sudah memesan kopi 3 hari yang lalu tapi sampai sekarang belum ada update pengiriman. Bisa tolong diinformasikan status pengiriman pesanan saya? Order ID: #KF2025001',
    date: '2025-07-06',
    time: '09:20',
    isRead: false,
    isStarred: false,
    priority: 'high',
    category: 'complaint',
    slug: 'maya-sari-4',
    avatar: 'MS'
  }
];

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch message by slug
    const slug = params.slug;
    const foundMessage = dummyMessages.find(msg => msg.slug === slug);
    
    setTimeout(() => {
      setMessage(foundMessage);
      setIsLoading(false);
    }, 500);
  }, [params.slug]);

  const handleMarkAsRead = () => {
    if (message) {
      setMessage({ ...message, isRead: true });
    }
  };

  const handleMarkAsUnread = () => {
    if (message) {
      setMessage({ ...message, isRead: false });
    }
  };

  const handleToggleStar = () => {
    if (message) {
      setMessage({ ...message, isStarred: !message.isStarred });
    }
  };

  const handleBackToMessages = () => {
    router.push('/messages');
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'inquiry': return <MessageCircle className="w-4 h-4" />;
      case 'complaint': return <AlertCircle className="w-4 h-4" />;
      case 'feedback': return <Star className="w-4 h-4" />;
      case 'promotion': return <Sparkles className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'inquiry': return 'text-blue-600 bg-blue-50';
      case 'complaint': return 'text-red-600 bg-red-50';
      case 'feedback': return 'text-green-600 bg-green-50';
      case 'promotion': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high': return 'Tinggi';
      case 'medium': return 'Sedang';
      case 'low': return 'Rendah';
      default: return 'Normal';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-[#fdfaf6] via-[#faf7f0] to-[#f6f3ed] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
            <div className="bg-white/70 rounded-2xl p-6 space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="p-6 bg-gradient-to-br from-[#fdfaf6] via-[#faf7f0] to-[#f6f3ed] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Pesan tidak ditemukan</h3>
            <p className="text-gray-500 mb-6">Pesan yang Anda cari tidak ada atau telah dihapus</p>
            <button
              onClick={handleBackToMessages}
              className="px-6 py-3 bg-gradient-to-r from-[#4b2e2b] to-[#6b3e3a] text-white rounded-xl hover:from-[#5c3530] hover:to-[#7c4a45] transition-all duration-300"
            >
              Kembali ke Daftar Pesan
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#fdfaf6] via-[#faf7f0] to-[#f6f3ed] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToMessages}
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 text-[#4b2e2b] font-medium shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Pesan
          </button>
        </div>

        {/* Message Detail Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#4b2e2b] to-[#6b3e3a] text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  {message.avatar}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">Detail Pesan</h1>
                  <p className="text-white/80">dari {message.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(message.category)}`}>
                  {getCategoryIcon(message.category)}
                  {message.category}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(message.priority)}`}></div>
                  <span className="text-white/90">{getPriorityText(message.priority)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-6 space-y-8">
            {/* Message Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <label className="block text-sm font-semibold text-blue-900 mb-2">
                    Nama Pengirim
                  </label>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-800 font-medium text-lg">{message.name}</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-800 text-lg">{message.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <label className="block text-sm font-semibold text-green-900 mb-2">
                    Tanggal & Waktu
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium text-lg">{message.date}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 text-lg">{message.time}</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                  <label className="block text-sm font-semibold text-orange-900 mb-2">
                    Status
                  </label>
                  <div className="flex items-center gap-2">
                    {message.isRead ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                    )}
                    <span className={`font-medium text-lg ${message.isRead ? 'text-green-800' : 'text-orange-800'}`}>
                      {message.isRead ? 'Sudah dibaca' : 'Belum dibaca'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                Isi Pesan
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed text-lg">{message.fullMessage}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={message.isRead ? handleMarkAsUnread : handleMarkAsRead}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  message.isRead 
                    ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {message.isRead ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                {message.isRead ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
              </button>

              <button
                onClick={handleToggleStar}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  message.isStarred 
                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className={`w-4 h-4 ${message.isStarred ? 'fill-current' : ''}`} />
                {message.isStarred ? 'Hapus dari favorit' : 'Tambah ke favorit'}
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300">
                <Reply className="w-4 h-4" />
                Balas
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-all duration-300">
                <Archive className="w-4 h-4" />
                Arsipkan
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-300">
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}