import React from 'react';
import Sidebar from '@/components/Sidebar'; // pastikan ini sesuai path folder kamu

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#fdfaf6] text-gray-800">
      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten utama */}
      <main className="flex-1 p-6 bg-[#fffdfb]">
        {children}
      </main>
    </div>
  );
}
