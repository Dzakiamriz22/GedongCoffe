'use client';

import { Mail, User, Calendar, Eye, MoreHorizontal, Star, Reply, Archive, Trash2, Search, Filter, ChevronRight, MessageCircle, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

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

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(dummyMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [animatingId, setAnimatingId] = useState(null);

  const handleViewDetail = (message) => {
    setAnimatingId(message.id);
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, isRead: true } : msg
        )
      );
      setSelectedMessage(message);
      setAnimatingId(null);
    }, 300);
  };

  const handleMarkAsRead = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      )
    );
  };

  const handleMarkAsUnread = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: false } : msg
      )
    );
  };

  const handleToggleStar = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'unread' && !msg.isRead) ||
                         (filterStatus === 'read' && msg.isRead) ||
                         (filterStatus === 'starred' && msg.isStarred);
    
    const matchesPriority = filterPriority === 'all' || msg.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const starredCount = messages.filter(msg => msg.isStarred).length;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
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

  if (selectedMessage) {
    return (
      <div className="p-6 bg-gradient-to-br from-[#fdfaf6] via-[#faf7f0] to-[#f6f3ed] min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setSelectedMessage(null)}
              className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/90 transition-all duration-300 text-[#4b2e2b] font-medium shadow-sm hover:shadow-md"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Pesan
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-[#4b2e2b] to-[#6b3e3a] text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                    {selectedMessage.avatar}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Detail Pesan</h1>
                    <p className="text-white/80 text-sm">dari {selectedMessage.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedMessage.category)}`}>
                    {getCategoryIcon(selectedMessage.category)}
                    {selectedMessage.category}
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedMessage.priority)}`}></div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedMessage.isRead 
                      ? 'bg-green-500/20 text-green-100' 
                      : 'bg-blue-500/20 text-blue-100'
                  }`}>
                    {selectedMessage.isRead ? 'Sudah Dibaca' : 'Belum Dibaca'}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <label className="block text-sm font-semibold text-blue-900 mb-2">
                      Nama Pengirim
                    </label>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-800 font-medium">{selectedMessage.name}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Email
                    </label>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-800">{selectedMessage.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <label className="block text-sm font-semibold text-green-900 mb-2">
                      Tanggal & Waktu
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-green-800">{selectedMessage.date}</span>
                      <Clock className="w-4 h-4 text-green-600 ml-2" />
                      <span className="text-green-800">{selectedMessage.time}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                    <label className="block text-sm font-semibold text-orange-900 mb-2">
                      Slug
                    </label>
                    <span className="text-orange-800 text-sm bg-orange-100 px-3 py-1 rounded-full">
                      {selectedMessage.slug}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Pesan Lengkap
                </label>
                <div className="bg-white rounded-lg p-4 border shadow-sm">
                  <p className="text-gray-800 leading-relaxed text-base">{selectedMessage.fullMessage}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => handleMarkAsRead(selectedMessage.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Tandai Sudah Dibaca
                </button>
                <button
                  onClick={() => handleMarkAsUnread(selectedMessage.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Clock className="w-4 h-4" />
                  Tandai Belum Dibaca
                </button>
                <button
                  onClick={() => handleToggleStar(selectedMessage.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    selectedMessage.isStarred 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' 
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-yellow-400 hover:to-yellow-500 hover:text-white'
                  }`}
                >
                  <Star className={`w-4 h-4 ${selectedMessage.isStarred ? 'fill-current' : ''}`} />
                  {selectedMessage.isStarred ? 'Hapus Bintang' : 'Beri Bintang'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#fdfaf6] via-[#faf7f0] to-[#f6f3ed] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4b2e2b] to-[#6b3e3a] bg-clip-text text-transparent">
                Pesan Masuk
              </h1>
              <p className="text-gray-600 mt-1">Kelola dan pantau semua pesan dari pelanggan</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 font-medium">{unreadCount} Belum Dibaca</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-yellow-700 font-medium">{starredCount} Berbintang</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pesan, nama, atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]/20 focus:border-[#4b2e2b]/30 transition-all duration-300"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]/20 transition-all duration-300"
              >
                <option value="all">Semua Status</option>
                <option value="unread">Belum Dibaca</option>
                <option value="read">Sudah Dibaca</option>
                <option value="starred">Berbintang</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-3 bg-white/70 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4b2e2b]/20 transition-all duration-300"
              >
                <option value="all">Semua Prioritas</option>
                <option value="high">Tinggi</option>
                <option value="medium">Sedang</option>
                <option value="low">Rendah</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid gap-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`group relative bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                !msg.isRead ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
              } ${animatingId === msg.id ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    !msg.isRead ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    {msg.avatar}
                  </div>

                  {/* Message Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{msg.name}</h3>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(msg.category)}`}>
                        {getCategoryIcon(msg.category)}
                        {msg.category}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(msg.priority)}`}></div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{msg.email}</p>
                    <p className="text-gray-800 line-clamp-2">{msg.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 ml-4">
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {msg.date}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {msg.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStar(msg.id)}
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                        msg.isStarred 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${msg.isStarred ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => handleViewDetail(msg)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4b2e2b] to-[#6b3e3a] text-white rounded-lg hover:from-[#5c3530] hover:to-[#7c4a45] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                    >
                      <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Detail
                    </button>

                    <button
                      onClick={() => msg.isRead ? handleMarkAsUnread(msg.id) : handleMarkAsRead(msg.id)}
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                        msg.isRead 
                          ? 'text-gray-400 hover:text-blue-500' 
                          : 'text-blue-500 hover:text-green-500'
                      }`}
                    >
                      {msg.isRead ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${
                !msg.isRead ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 'bg-gradient-to-b from-green-400 to-green-600'
              }`}></div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada pesan ditemukan</h3>
            <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
          </div>
        )}
      </div>
    </div>
  );
}