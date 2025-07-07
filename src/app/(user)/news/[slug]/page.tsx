'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// ✅ Tipe props sesuai konvensi Next.js App Router
interface PageProps {
  params: {
    slug: string;
  };
}

// ✅ Data dummy sementara (bisa diganti fetch)
const dummyNewsData = [
  {
    slug: 'kopi-gedong-raih-penghargaan',
    title: 'Kopi Gedong Raih Penghargaan Nasional',
    date: '2025-07-01',
    author: 'Tim Redaksi',
    readTime: '3 menit',
    category: 'Penghargaan',
    content: `
      <p>Kopi Gedong kembali menorehkan prestasi dengan meraih penghargaan dari Asosiasi Kopi Indonesia sebagai salah satu kopi terbaik nasional tahun ini.</p>
      <p>Penghargaan ini menjadi bukti konsistensi kualitas kopi yang dihasilkan oleh para petani lokal binaan Gedong Kopi.</p>
      <p>Direktur Gedong Kopi menyampaikan rasa bangga atas pencapaian ini. "Ini hasil kerja keras seluruh tim," ujarnya.</p>
      <p>Kami berharap prestasi ini terus memotivasi pengembangan kopi lokal dan memperluas pasar ekspor.</p>
    `,
    image: '/images/news1.jpg',
  },
  {
    slug: 'pelatihan-organik-petani-kopi',
    title: 'Petani Kopi Berdaya Lewat Pelatihan Organik',
    date: '2025-06-20',
    author: 'Maria Sari',
    readTime: '4 menit',
    category: 'Pelatihan',
    content: `
      <p>Pelatihan ini diadakan oleh Gedong Kopi dan diikuti oleh 60 petani dari desa sekitar.</p>
      <p>Tujuannya untuk meningkatkan kualitas panen sekaligus menjaga kelestarian alam sekitar.</p>
      <p>"Pelatihan ini sangat bermanfaat bagi kami," ujar Pak Joko, salah satu peserta pelatihan.</p>
    `,
    image: '/images/news2.jpg',
  },
  // ...tambahkan lainnya jika perlu
];

export default function NewsDetailPage({ params }: PageProps) {
  const article = dummyNewsData.find(item => item.slug === params.slug);

  if (!article) return notFound();

  const relatedArticles = dummyNewsData.filter(item => item.slug !== params.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-6 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Kembali ke Berita</span>
        </Link>

        {/* Header Artikel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-amber-100">
          <div className="relative w-full h-72 md:h-96">
            <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-amber-600 mb-4">
              <div className="flex items-center gap-1">
                📅 <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">✍️ <span>{article.author}</span></div>
              <div className="flex items-center gap-1">⏱️ <span>{article.readTime}</span></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6 leading-tight">{article.title}</h1>
          </div>
        </div>

        {/* Konten Artikel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-amber-100">
          <div className="prose prose-lg prose-amber max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Berita Lainnya */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Berita Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map(news => (
              <Link key={news.slug} href={`/news/${news.slug}`} className="group border border-amber-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-amber-200">
                <div className="relative h-40 overflow-hidden">
                  <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">{news.category}</span>
                  <h3 className="font-semibold text-amber-900 line-clamp-2 mt-2 group-hover:text-amber-700 transition-colors duration-300">{news.title}</h3>
                  <p className="text-xs text-amber-600 mt-1">{new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} • {news.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
