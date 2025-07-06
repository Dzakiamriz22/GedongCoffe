'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface MarketplaceLink {
  name: 'Tokopedia' | 'Shopee' | 'WhatsApp';
  url: string;
  icon: string;
}

interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  badge?: 'Best Seller' | 'Produk Unggulan' | 'Baru';
  description: string[];
  tastingNotes: string[];
  specifications: { [key: string]: string };
  stock: number;
  sku: string;
  marketplaceLinks: MarketplaceLink[];
  brewRecommendations?: string[];
}

const productDetailData: { [key: string]: ProductDetail } = {
  'kopi-arabika-gayo-aceh': {
    id: 1,
    name: "Kopi Arabika Gayo Aceh",
    slug: "kopi-arabika-gayo-aceh",
    price: 85000,
    originalPrice: 100000,
    images: [
      "/images/gayo/gayo-1.jpg",
      "/images/gayo/gayo-2.jpg",
      "/images/gayo/gayo-3.jpg",
    ],
    category: "Arabika",
    rating: 4.9,
    reviews: 321,
    badge: "Best Seller",
    description: [
      "Biji kopi Arabika Gayo Aceh asli dari dataran tinggi Gayo, diproses secara semi-washed untuk menghasilkan cita rasa yang kompleks.",
      "Dengan body yang tebal dan keasaman yang seimbang, kopi ini cocok untuk manual brew maupun espresso.",
      "Dipetik secara manual dan diproses dengan standar kualitas tinggi untuk memastikan konsistensi rasa."
    ],
    tastingNotes: [
      "Citrusy & Fruity",
      "Hint of Spices",
      "Low Acidity",
      "Caramel & Chocolate Finish"
    ],
    specifications: {
      "Asal": "Takengon, Aceh Tengah",
      "Ketinggian": "1200-1500 MDPL",
      "Varietas": "Ateng, Tim-tim",
      "Proses": "Semi-Washed (Giling Basah)",
      "Tingkat Sangrai": "Medium Roast",
      "Berat Bersih": "250g",
      "Kemasan": "Kantong aluminium foil dengan katup udara"
    },
    stock: 25,
    sku: "Kopi-AG-001",
    brewRecommendations: [
      "V60: 15g kopi, 250ml air 92°C, waktu seduh 2:30 menit",
      "Aeropress: 17g kopi, 240ml air 90°C, waktu seduh 1:30 menit",
      "Espresso: 18g kopi, ekstraksi 25-30 detik menghasilkan 36g espresso"
    ],
    marketplaceLinks: [
      { 
        name: 'Tokopedia', 
        url: 'https://www.tokopedia.com/your-shop/kopi-arabika-gayo-aceh',
        icon: '/icons/tokopedia.svg'
      },
      { 
        name: 'Shopee', 
        url: 'https://shopee.co.id/your-shop/kopi-arabika-gayo-aceh',
        icon: '/icons/shopee.svg'
      },
      {
        name: 'WhatsApp',
        url: 'https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20Kopi%20Arabika%20Gayo%20Aceh',
        icon: '/icons/whatsapp.svg'
      }
    ]
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications'>('description'); // Tambahkan ini

  useEffect(() => {
    setTimeout(() => {
      const foundProduct = productDetailData[slug];
      setProduct(foundProduct);
      setLoading(false);
    }, 800);
  }, [slug]);


  const formatPrice = (price: number) => new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0 
  }).format(price);
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={`half-${i}`} className="text-yellow-400">½</span>);
      } else {
        stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-800 mb-4"></div>
        <p className="text-gray-600">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak tersedia.</p>
        <Link href="/products" className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
          Lihat Produk Lainnya
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <li><Link href="/" className="hover:text-amber-700 transition-colors">Beranda</Link></li>
          <li>›</li>
          <li><Link href="/products" className="hover:text-amber-700 transition-colors">Produk Kopi</Link></li>
          <li>›</li>
          <li className="font-semibold text-gray-800 line-clamp-1">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <Image 
              src={product.images[selectedImage]} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${
                  product.badge === 'Best Seller' ? 'bg-green-600' :
                  product.badge === 'Produk Unggulan' ? 'bg-blue-500' :
                  'bg-amber-500'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}
            {product.originalPrice && (
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((image, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedImage(index)} 
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-amber-600 scale-105' : 'border-gray-200 hover:border-gray-300'
                }`}
                aria-label={`Lihat gambar ${index + 1}`}
              >
                <Image 
                  src={image} 
                  alt={`${product.name} thumbnail ${index + 1}`} 
                  width={80} 
                  height={80} 
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span className={`font-medium ${
                product.stock > 10 ? 'text-green-600' : 
                product.stock > 0 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {product.stock > 10 ? 'Stok Tersedia' : 
                 product.stock > 0 ? 'Stok Terbatas' : 'Stok Habis'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="ml-2 text-lg font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
            </div>
            <a href="#reviews" className="text-gray-600 hover:text-amber-700 transition-colors">
              ({product.reviews} ulasan)
            </a>
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-bold text-amber-800">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-3 text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          
          {/* Tasting Notes */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <h3 className="font-semibold mb-3 text-amber-900 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Cita Rasa
            </h3>
            <ul className="flex flex-wrap gap-2">
              {product.tastingNotes.map((note, index) => (
                <li 
                  key={index} 
                  className="text-sm text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Brew Recommendations */}
          {product.brewRecommendations && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Rekomendasi Penyeduhan
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {product.brewRecommendations.map((method, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-amber-600 rounded-full"></span>
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Marketplace Links */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-4 text-lg">Beli Sekarang:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.marketplaceLinks.map(link => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-3 py-3 px-6 rounded-lg transition-all hover:shadow-md ${
                    link.name === 'Tokopedia' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                    link.name === 'Shopee' ? 'bg-orange-500 hover:bg-orange-600 text-white' :
                    'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <Image 
                    src={link.icon} 
                    alt={link.name} 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 object-contain"
                  />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Deskripsi Produk
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specifications'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Spesifikasi
            </button>
          </nav>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Tentang {product.name}</h3>
              <div className="space-y-4 text-gray-700">
                {Array.isArray(product.description) ? (
                  product.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{product.description}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Detail Produk</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-3 pr-4 font-medium text-gray-700">{key}</td>
                        <td className="py-3 pl-4 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}