'use client';

import Link from 'next/link';
import { Pencil, Plus, Star, Award, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialProducts = [
  { id: 'kopi-arabica', name: 'Kopi Arabica', category: 'Best Seller', price: 45000, isBestSeller: true, isHighlight: false },
  { id: 'kopi-robusta', name: 'Kopi Robusta', category: 'Highlight Product', price: 38000, isBestSeller: false, isHighlight: true },
  { id: 'kopi-liberica', name: 'Kopi Liberica', category: 'Regular', price: 42000, isBestSeller: false, isHighlight: false },
  { id: 'kopi-blend', name: 'Kopi Blend Special', category: 'Regular', price: 40000, isBestSeller: false, isHighlight: false },
];

export default function ProductListPage() {
  const [products, setProducts] = useState(initialProducts);

  const toggleBestSeller = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isBestSeller: !product.isBestSeller }
        : product
    ));
  };

  const toggleHighlight = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isHighlight: !product.isHighlight }
        : product
    ));
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const getCategoryBadge = (product) => {
    if (product.isBestSeller) {
      return <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-sm">✨ Best Seller</span>;
    }
    if (product.isHighlight) {
      return <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-sm">🔥 Highlight</span>;
    }
    return <span className="px-3 py-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs font-medium rounded-full">Regular</span>;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">☕ Manajemen Produk</h1>
          <p className="text-gray-600 mt-2">Kelola produk kopi dan status promosi dengan mudah</p>
        </div>
        <Link href="/admin/product/new">
          <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            <Plus className="w-5 h-5" />
            Tambah Produk Baru
          </button>
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-slate-100 to-gray-100 text-gray-700">
            <tr>
              <th className="text-left p-6 font-bold text-gray-800">Nama Produk</th>
              <th className="text-left p-6 font-bold text-gray-800">Kategori</th>
              <th className="text-left p-6 font-bold text-gray-800">Harga</th>
              <th className="text-left p-6 font-bold text-gray-800">Status</th>
              <th className="text-left p-6 font-bold text-gray-800">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={`border-t border-gray-100 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white/50' : 'bg-gray-50/30'}`}>
                <td className="p-6 font-semibold text-gray-900">{product.name}</td>
                <td className="p-6">{getCategoryBadge(product)}</td>
                <td className="p-6 font-bold text-emerald-600">Rp {product.price.toLocaleString()}</td>
                <td className="p-6">
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleBestSeller(product.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                        product.isBestSeller
                          ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md hover:shadow-lg'
                          : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      Best Seller
                    </button>
                    <button
                      onClick={() => toggleHighlight(product.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                        product.isHighlight
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg'
                          : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      Highlight
                    </button>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex gap-3">
                    <Link href={`/admin/product/${product.id}`}>
                      <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-white bg-blue-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-md">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-md"
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

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="w-12 h-12 mx-auto mb-4" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada produk</h3>
          <p className="text-gray-600 mb-4">Mulai dengan menambahkan produk pertama Anda</p>
          <Link href="/admin/product/new">
            <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg">
              Tambah Produk Pertama
            </button>
          </Link>
        </div>
      )}

      <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
        <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
          📊 Statistik Produk
        </h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-gradient-to-br from-slate-100 to-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-3xl font-bold text-gray-800 mb-2">{products.length}</div>
            <div className="text-sm font-medium text-gray-600">Total Produk</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-800 mb-2">{products.filter(p => p.isBestSeller).length}</div>
            <div className="text-sm font-medium text-amber-700">⭐ Best Seller</div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-pink-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="text-3xl font-bold text-purple-800 mb-2">{products.filter(p => p.isHighlight).length}</div>
            <div className="text-sm font-medium text-purple-700">🔥 Highlight</div>
          </div>
        </div>
      </div>
    </div>
  );
}