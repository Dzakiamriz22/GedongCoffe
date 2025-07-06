'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Upload, X, ArrowLeft, Save, Eye, Calendar, Tag, User, FileText, TrendingUp } from 'lucide-react';

export default function NewsFormPage() {
  const { slug } = useParams();
  const router = useRouter();

  const isEdit = slug !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    category: 'News',
    author: '',
    content: '',
    excerpt: '',
    publishDate: '',
    status: 'Draft',
    isHighlight: false,
    featuredImage: null,
    tags: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (isEdit) {
      // Simulasi fetch data berdasarkan slug
      setFormData({
        title: 'Peluncuran Kopi Arabica Premium Terbaru 2024',
        category: 'Product Launch',
        author: 'Admin Coffee',
        content: 'Kami dengan bangga memperkenalkan varian kopi arabica premium terbaru yang akan memanjakan lidah para pecinta kopi. Produk ini merupakan hasil seleksi ketat dari biji kopi terbaik yang dipetik langsung dari dataran tinggi.\n\nKopi arabica premium ini memiliki karakteristik yang unik dengan aroma yang kaya dan rasa yang seimbang. Proses pengolahan yang teliti memastikan kualitas terbaik untuk setiap cangkir kopi yang Anda nikmati.',
        excerpt: 'Kami dengan bangga memperkenalkan varian kopi arabica premium terbaru yang akan memanjakan lidah para pecinta kopi...',
        publishDate: '2024-01-15',
        status: 'Published',
        isHighlight: true,
        featuredImage: null,
        tags: 'kopi arabica, premium, product launch',
      });
    } else {
      // Set default publish date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, publishDate: today }));
    }
  }, [slug, isEdit]);

  useEffect(() => {
    // Count words in content
    const words = formData.content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [formData.content]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, featuredImage: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, featuredImage: null }));
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', formData);
    router.push('/admin/news');
  };

  const handlePreview = () => {
    console.log('Preview:', formData);
    // Implement preview functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-neutral-50 to-stone-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Daftar Artikel
          </button>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-slate-600" />
            {isEdit ? 'Edit Artikel' : 'Buat Artikel Baru'}
          </h1>
          <p className="text-slate-600 mt-2">
            {isEdit ? 'Perbarui konten artikel Anda' : 'Tulis artikel menarik untuk para pecinta kopi'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder="Masukkan judul artikel yang menarik..."
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Ringkasan Artikel *
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder="Tulis ringkasan singkat artikel (maks 200 karakter)..."
                    maxLength={200}
                    required
                  />
                  <div className="text-right text-sm text-slate-500">
                    {formData.excerpt.length}/200 karakter
                  </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Gambar Utama
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg shadow-sm border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-sm transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                        dragActive
                          ? 'border-slate-400 bg-slate-50'
                          : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-4">
                        Drag & drop gambar di sini, atau{' '}
                        <label className="text-slate-700 hover:text-slate-900 cursor-pointer font-medium">
                          klik untuk pilih file
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-sm text-slate-500">PNG, JPG, JPEG hingga 5MB</p>
                    </div>
                  )}
                </div>

                {/* Content Editor */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center justify-between">
                    <span>Isi Artikel *</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {wordCount} kata
                    </span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={15}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all font-mono text-sm"
                    placeholder="Tulis isi artikel Anda di sini..."
                    required
                  />
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder="kopi, arabica, premium, tips..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Pengaturan Publikasi
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                  >
                    <option value="News">News</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Tips & Tricks">Tips & Tricks</option>
                    <option value="Culture">Culture</option>
                    <option value="Health">Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Penulis
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                    placeholder="Nama penulis..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Publikasi</label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isHighlight"
                    checked={formData.isHighlight}
                    onChange={handleChange}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Jadikan artikel unggulan
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-lg text-slate-800 mb-4">Aksi</h3>
              
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isEdit ? 'Perbarui Artikel' : 'Simpan Artikel'}
                </button>
              </div>
            </div>

            {/* Article Statistics (if editing) */}
            {isEdit && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-lg text-slate-800 mb-4">Statistik Artikel</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Views</span>
                    <span className="font-semibold text-slate-800">1,245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Likes</span>
                    <span className="font-semibold text-slate-800">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Shares</span>
                    <span className="font-semibold text-slate-800">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Comments</span>
                    <span className="font-semibold text-slate-800">12</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-bold text-lg text-blue-800 mb-3">💡 Tips Menulis</h3>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Gunakan judul yang menarik dan deskriptif</li>
                <li>• Tulis ringkasan yang menggambarkan isi artikel</li>
                <li>• Pilih gambar utama yang berkualitas tinggi</li>
                <li>• Gunakan paragraf pendek untuk keterbacaan</li>
                <li>• Tambahkan tags relevan untuk SEO</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}