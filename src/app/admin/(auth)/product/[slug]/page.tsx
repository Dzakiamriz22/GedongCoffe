'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Upload, X, Coffee, Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function ProductFormPage() {
  const { slug } = useParams();
  const router = useRouter();

  const isEdit = slug !== 'new';

  const [formData, setFormData] = useState({
    name: '',
    category: 'Regular',
    price: '',
    description: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Simulasi fetch data berdasarkan slug
      setFormData({
        name: 'Kopi Arabica',
        category: 'Best Seller',
        price: '45000',
        description: 'Kopi arabica premium dengan cita rasa khas yang memukau. Dipetik langsung dari dataran tinggi dengan proses terbaik.',
        image: null,
      });
    }
  }, [slug, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData({ ...formData, image: file });
      
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
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit:', formData);
    router.push('/admin/product');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-3">
            <Coffee className="w-8 h-8 text-amber-600" />
            {isEdit ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEdit ? 'Perbarui informasi produk kopi Anda' : 'Buat produk kopi baru untuk ditambahkan ke menu'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Foto Produk
              </label>
              
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-2xl shadow-lg border-4 border-white"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-gray-300 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag & drop foto produk di sini, atau{' '}
                    <label className="text-amber-600 hover:text-amber-700 cursor-pointer font-medium">
                      klik untuk pilih file
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG hingga 10MB</p>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="Masukkan nama produk"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                >
                  <option value="Regular">Regular</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Highlight Product">Highlight Product</option>
                  <option value="Premium">Premium</option>
                  <option value="Limited Edition">Limited Edition</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Status
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-700">Best Seller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Highlight</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Deskripsi Produk
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                placeholder="Deskripsikan produk kopi Anda..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isEdit ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
            💡 Tips untuk Foto Produk yang Menarik
          </h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Gunakan pencahayaan yang baik dan natural</li>
            <li>• Tampilkan produk dari angle yang menarik</li>
            <li>• Pastikan background bersih dan tidak mengganggu</li>
            <li>• Gunakan resolusi tinggi untuk hasil terbaik</li>
          </ul>
        </div>
      </div>
    </div>
  );
}