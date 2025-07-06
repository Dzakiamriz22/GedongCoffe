'use client'

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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
      <p>Penghargaan ini menjadi bukti konsistensi kualitas kopi yang dihasilkan oleh para petani lokal binaan Gedong Kopi. Proses seleksi yang ketat dan standar kualitas tinggi menjadi kunci utama dalam meraih prestasi ini.</p>
      <p>Direktur Gedong Kopi, Bapak Suryanto, menyampaikan rasa syukur dan bangga atas pencapaian ini. "Ini adalah hasil kerja keras seluruh tim, mulai dari petani hingga proses pengolahan akhir," ujarnya.</p>
      <p>Kami berharap prestasi ini bisa terus memotivasi pengembangan kopi lokal dan memperluas pasar ekspor. Dengan kualitas yang terus dijaga, Kopi Gedong siap bersaing di pasar internasional.</p>
    `,
    image: '/images/news1.jpg'
  },
  {
    slug: 'pelatihan-organik-petani-kopi',
    title: 'Petani Kopi Berdaya Lewat Pelatihan Organik',
    date: '2025-06-20',
    author: 'Maria Sari',
    readTime: '4 menit',
    category: 'Pelatihan',
    content: `
      <p>Pelatihan ini diadakan oleh Gedong Kopi dan diikuti oleh 60 petani dari desa sekitar. Fokus pelatihan adalah pengolahan organik dan ramah lingkungan.</p>
      <p>Tujuannya untuk meningkatkan kualitas panen sekaligus menjaga kelestarian alam sekitar. Para petani diajari teknik-teknik modern yang tetap mempertahankan kearifan lokal.</p>
      <p>Materi pelatihan mencakup pemilihan bibit unggul, teknik penanaman yang tepat, pengelolaan hama alami, hingga proses pasca panen yang optimal.</p>
      <p>"Pelatihan ini sangat bermanfaat bagi kami. Sekarang saya lebih paham cara mengolah kopi yang baik dan ramah lingkungan," ujar Pak Joko, salah satu peserta pelatihan.</p>
    `,
    image: '/images/news2.jpg'
  },
  {
    slug: 'ekspor-kopi-lokal-meningkat',
    title: 'Ekspor Kopi Lokal Meningkat 40%',
    date: '2025-06-15',
    author: 'Ahmad Rizki',
    readTime: '5 menit',
    category: 'Ekspor',
    content: `
      <p>Produk kopi lokal berhasil menembus pasar internasional dengan peningkatan ekspor yang signifikan mencapai 40% dibandingkan tahun sebelumnya.</p>
      <p>Keberhasilan ini tidak lepas dari upaya peningkatan kualitas dan konsistensi produk yang dilakukan secara berkelanjutan.</p>
    `,
    image: '/images/news3.jpg'
  },
  {
    slug: 'festival-kopi-nusantara-2025',
    title: 'Festival Kopi Nusantara 2025',
    date: '2025-06-10',
    author: 'Siti Nurhaliza',
    readTime: '3 menit',
    category: 'Festival',
    content: `
      <p>Festival tahunan yang menampilkan berbagai varian kopi dari seluruh Indonesia akan diselenggarakan pada bulan Agustus mendatang.</p>
      <p>Acara ini diharapkan dapat mempromosikan kekayaan kopi Indonesia di mata dunia.</p>
    `,
    image: '/images/news4.jpg'
  }
];

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = dummyNewsData.find(item => item.slug === params.slug);
  
  if (!article) return notFound();

  // Get related articles (exclude current article)
  const relatedArticles = dummyNewsData
    .filter(item => item.slug !== params.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/news" 
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-6 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Kembali ke Berita</span>
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-amber-100">
          {/* Hero Image */}
          <div className="relative w-full h-72 md:h-96">
            <Image 
              src={article.image} 
              alt={article.title} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Info */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-amber-600 mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{article.author}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{article.readTime}</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6 leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border border-amber-100">
          <div
            className="prose prose-lg prose-amber max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Share Buttons */}
          <div className="mt-8 pt-6 border-t border-amber-100">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Bagikan Artikel</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span>Twitter</span>
              </button>
              
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
              
              <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Berita Lainnya
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map(news => (
              <Link 
                key={news.slug} 
                href={`/news/${news.slug}`} 
                className="group border border-amber-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-amber-200"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                      {news.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-amber-900 line-clamp-2 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-xs text-amber-600">
                    <span>{new Date(news.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to News Button */}
        <div className="text-center mt-8">
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl hover:bg-amber-600 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Lihat Semua Berita
          </Link>
        </div>
      </div>
    </div>
  );
}