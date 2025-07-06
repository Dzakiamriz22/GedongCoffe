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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      <div className="relative">
        {product.badge && (
          <div className="absolute z-10 top-2 left-2">
            <span
              className={`px-3 py-1 text-xs font-semibold flex items-center gap-1 text-white rounded-full shadow ${
                product.badge === "Best Seller"
                  ? "bg-green-600"
                  : product.badge === "Produk Unggulan"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            >
              {product.badge === "Best Seller" && "🔥"}
              {product.badge === "Produk Unggulan" && "🌟"}
              {product.badge === "Baru" && "🆕"}
              {product.badge}
            </span>
          </div>
        )}
        <div className="relative h-48 bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-amber-900 mb-2 line-clamp-2 flex-grow">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-xl font-bold text-amber-800">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
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
      <nav className="mt-12 flex justify-center">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Sebelumnya
            </button>
          </li>
          {pageNumbers.map(number => (
            <li key={number}>
              <button onClick={() => paginate(number)} className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${currentPage === number ? 'text-white bg-amber-800 border-amber-800' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'}`}>
                {number}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Selanjutnya
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
    
    // Filter berdasarkan kategori
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
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
  }, [selectedCategory, sortBy, searchTerm, allProducts]);

  // Fungsi untuk clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = regularProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Mendapatkan kategori unik untuk filter
  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  
  // Hitung total produk yang ditemukan
  const totalFoundProducts = bestSellers.length + highlights.length + regularProducts.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  return (
  <div className="bg-gray-50 min-h-screen pt-20">
    <div className="container mx-auto px-4 pb-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Temukan Kopi Pilihan Kami</h1>
        <p className="text-gray-600">Biji kopi berkualitas dari seluruh penjuru Nusantara.</p>
      </div>

      {/* Search, Filter, Sort */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cari Produk</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari kopi favorit Anda..."
                className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:ring-amber-500 focus:border-amber-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Urutkan Berdasarkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
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
        <div className="text-sm text-gray-600 mt-4 bg-gray-50 px-4 py-2 rounded-md w-fit">
          {searchTerm ? (
            <span>
              Ditemukan <strong>{totalFoundProducts}</strong> produk untuk "<strong>{searchTerm}</strong>"
            </span>
          ) : (
            <span>Menampilkan <strong>{totalFoundProducts}</strong> produk</span>
          )}
        </div>
      </div>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">👑 Best Seller</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
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
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">✨ Produk Unggulan</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
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
        <h2 className="text-2xl font-bold text-amber-900 mb-6">☕ Semua Kopi Kami</h2>
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.239 0-4.3-.726-5.966-1.957C3.886 11.408 2 8.898 2 6c0-1.657 1.343-3 3-3s3 1.343 3 3c0 .386-.079.754-.223 1.09C9.196 8.63 10.570 9 12 9s2.804-.37 4.223-1.91A2.991 2.991 0 0116 6c0-1.657 1.343-3 3-3s3 1.343 3 3c0 2.898-1.886 5.408-4.034 7.043z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">Tidak ada produk yang ditemukan</p>
            <p className="text-gray-400">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
          </div>
        )}
      </section>
    </div>
  </div>
);

}