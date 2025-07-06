'use client';

import {
  BarChart2,
  Package,
  FileText,
  Mail,
  ArrowRight,
  Users,
  Plus,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const pesanMasuk = [
    { id: 1, nama: 'Andi', email: 'andi@email.com', isi: 'Apakah kopi ini tersedia di Shopee?', tanggal: '2025-07-06' },
    { id: 2, nama: 'Sari', email: 'sari@email.com', isi: 'Tolong informasikan promo terbaru.', tanggal: '2025-07-05' },
  ];

  const quickActions = [
    { icon: ArrowRight, label: 'Ke Menu', color: 'bg-green-700 hover:bg-green-800' },
    { icon: Package, label: 'Kelola Produk', color: 'bg-[#4b2e2b] hover:bg-[#3d2624]' },
    { icon: FileText, label: 'Kelola News', color: 'bg-[#a1866f] hover:bg-[#92755e]' },
    { icon: Mail, label: 'Pesan Masuk', color: 'bg-green-600 hover:bg-green-700' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfaf6] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#4b2e2b] mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan data terkini.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Produk</p>
                <p className="text-2xl font-bold text-[#4b2e2b]">58</p>
              </div>
              <div className="bg-[#d8c1aa] text-[#4b2e2b] p-3 rounded-full">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total News</p>
                <p className="text-2xl font-bold text-[#4b2e2b]">14</p>
              </div>
              <div className="bg-[#d8c1aa] text-[#4b2e2b] p-3 rounded-full">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pesan Masuk</p>
                <p className="text-2xl font-bold text-[#4b2e2b]">23</p>
              </div>
              <div className="bg-green-100 text-green-700 p-3 rounded-full">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#4b2e2b] mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`${action.color} text-white p-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 flex flex-col items-center gap-2`}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#4b2e2b]">Pesan Masuk</h2>
            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Nama</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Pesan</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {pesanMasuk.map((pesan) => (
                  <tr key={pesan.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{pesan.nama}</td>
                    <td className="py-3 px-4 text-gray-700">{pesan.email}</td>
                    <td className="py-3 px-4 text-gray-700">{pesan.isi}</td>
                    <td className="py-3 px-4 text-gray-700">{pesan.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
