'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: 'Best Seller' | 'Produk Unggulan' | 'Baru';
}

const coffeeProductsData: Product[] = [
  { id: 1, name: "Kopi Arabika Gayo Aceh", slug: "kopi-arabika-gayo-aceh", price: 85000, originalPrice: 100000, image: "/images/kopi-gayo.jpg", category: "Arabika", rating: 4.9, reviews: 321, badge: "Best Seller" },
  { id: 2, name: "Kopi Robusta Lampung", slug: "kopi-robusta-lampung", price: 65000, image: "/images/kopi-lampung.jpg", category: "Robusta", rating: 4.7, reviews: 189, badge: "Baru" },
  { id: 3, name: 'House Blend "Senja"', slug: "house-blend-senja", price: 95000, image: "/images/kopi-blend.jpg", category: "Blend", rating: 4.8, reviews: 256, badge: "Produk Unggulan" },
  { id: 4, name: "Kopi Arabika Toraja Sapan", slug: "kopi-arabika-toraja-sapan", price: 90000, originalPrice: 110000, image: "/images/kopi-toraja.jpg", category: "Arabika", rating: 4.8, reviews: 215 },
  { id: 5, name: "Kopi Liberika Rangsang Meranti", slug: "kopi-liberika-rangsang-meranti", price: 75000, image: "/images/kopi-liberika.jpg", category: "Lainnya", rating: 4.6, reviews: 98 },
  { id: 6, name: "Kopi Arabika Mandailing", slug: "kopi-arabika-mandailing", price: 88000, image: "/images/kopi-mandailing.jpg", category: "Arabika", rating: 4.7, reviews: 150, badge: "Produk Unggulan" },
  { id: 7, name: "Kopi Arabika Kintamani Bali", slug: "kopi-arabika-kintamani-bali", price: 92000, image: "/images/kopi-kintamani.jpg", category: "Arabika", rating: 4.9, reviews: 280, badge: "Best Seller" },
  { id: 8, name: "Kopi Robusta Temanggung", slug: "kopi-robusta-temanggung", price: 68000, image: "/images/kopi-temanggung.jpg", category: "Robusta", rating: 4.6, reviews: 120 },
  { id: 9, name: "Espresso Blend 'Fajar'", slug: "espresso-blend-fajar", price: 99000, image: "/images/kopi-espresso-blend.jpg", category: "Blend", rating: 4.8, reviews: 199 },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

const ProductCard = ({ product }: { product: Product }) => (
  <Link href={`/product/${product.slug}`} className="group block h-full">
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-100">
      <div className="relative">
        {product.badge && (
          <div className="absolute z-10 top-3 left-3">
            <span
              className={`px-3 py-1.5 text-xs font-bold flex items-center gap-1 text-white rounded-full shadow-lg backdrop-blur-sm ${
                product.badge === "Best Seller"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : product.badge === "Produk Unggulan"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            >
              {product.badge === "Best Seller" && "🔥"}
              {product.badge === "Produk Unggulan" && "⭐"}
              {product.badge === "Baru" && "✨"}
              {product.badge}
            </span>
          </div>
        )}
        <div className="relative h-52 bg-gradient-to-br from-amber-50 to-orange-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-4 line-clamp-2 flex-grow leading-tight">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-amber-800">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  </Link>
);

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }: any) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    if (pageNumbers.length <= 1) return null;
    return (
      <nav className="mt-16 flex justify-center">
        <ul className="flex items-center gap-2">
          <li>
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              ← Sebelumnya
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number}>
              <button 
                onClick={() => paginate(number)} 
                className={`flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  currentPage === number 
                    ? 'text-white bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg' 
                    : 'text-gray-600 bg-white border border-gray-300 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === pageNumbers.length} 
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Selanjutnya →
            </button>
          </li>
        </ul>
      </nav>
    );
};

// --- Komponen Halaman Utama ---
export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [highlights, setHighlights] = useState<Product[]>([]);
  const [regularProducts, setRegularProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    setTimeout(() => {
      setAllProducts(coffeeProductsData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    
    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Set produk berdasarkan badge
    setBestSellers(filtered.filter(p => p.badge === 'Best Seller'));
    setHighlights(filtered.filter(p => p.badge === 'Produk Unggulan'));
    
    // Set produk regular dan sorting
    let regular = filtered.filter(p => p.badge !== 'Best Seller' && p.badge !== 'Produk Unggulan');
    regular.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    setRegularProducts(regular);
    setCurrentPage(1);
  }, [sortBy, searchTerm, allProducts]);

  // Fungsi untuk clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = regularProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Hitung total produk yang ditemukan
  const totalFoundProducts = bestSellers.length + highlights.length + regularProducts.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700 font-medium">Memuat produk kopi terbaik...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 pb-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-orange-700 mb-4">
            ☕ Temukan Kopi Pilihan Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Biji kopi berkualitas premium dari seluruh penjuru Nusantara, dipanggang dengan sempurna untuk cita rasa yang tak terlupakan.
          </p>
        </div>

        {/* Search and Sort Section */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-12 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-3">🔍 Cari Produk</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari kopi favorit Anda..."
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-3 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">📊 Urutkan Berdasarkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/80 backdrop-blur-sm transition-all duration-200"
              >
                <option value="name-asc">Nama (A-Z)</option>
                <option value="name-desc">Nama (Z-A)</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating-high">Rating Tertinggi</option>
                <option value="rating-low">Rating Terendah</option>
              </select>
            </div>
          </div>

          {/* Info Jumlah Produk */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-full border border-amber-200">
              <span className="text-amber-600">📦</span>
              {searchTerm ? (
                <span>
                  Ditemukan <strong className="text-amber-700">{totalFoundProducts}</strong> produk untuk "<strong className="text-amber-700">{searchTerm}</strong>"
                </span>
              ) : (
                <span>Menampilkan <strong className="text-amber-700">{totalFoundProducts}</strong> produk</span>
              )}
            </div>
          </div>
        </div>

        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-gray-800">🏆 Best Seller</h2>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                Terlaris
              </span>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {bestSellers.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-10/12 sm:w-2/3 md:w-5/12 lg:w-1/3 xl:w-1/4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Highlights Section */}
        {highlights.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-gray-800">⭐ Produk Unggulan</h2>
              <span className="text-sm font-medium text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                Rekomendasi
              </span>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {highlights.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-10/12 sm:w-2/3 md:w-5/12 lg:w-1/3 xl:w-1/4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Products Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">☕ Semua Kopi Kami</h2>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {regularProducts.length} Produk
            </span>
          </div>
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                productsPerPage={productsPerPage}
                totalProducts={regularProducts.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-xl border border-white/20">
                <div className="text-6xl mb-6">☕</div>
                <h3 className="text-xl font-bold text-gray-700 mb-4">Tidak ada produk yang ditemukan</h3>
                <p className="text-gray-500 mb-6">Coba ubah kata kunci pencarian atau hapus filter yang digunakan</p>
                <button
                  onClick={clearSearch}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full font-medium hover:from-amber-700 hover:to-amber-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Reset Pencarian
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}