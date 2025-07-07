'use client'

import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0)

  // Animated counter for years
  const [yearsCount, setYearsCount] = useState(0)
  const targetYears = new Date().getFullYear() - 1982

  // Parallax mouse effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Animated counter
  useEffect(() => {
    if (isVisible.history) {
      const timer = setInterval(() => {
        setYearsCount(prev => {
          if (prev < targetYears) return prev + 1
          clearInterval(timer)
          return targetYears
        })
      }, 50)
      return () => clearInterval(timer)
    }
  }, [isVisible.history, targetYears])

  // Auto-sliding testimonials
  const testimonials = [
    { name: "Sarah M.", text: "Kopi terbaik yang pernah saya coba! Aromanya luar biasa.", rating: 5 },
    { name: "Budi S.", text: "Rasa otentik Indonesia yang memukau. Highly recommended!", rating: 5 },
    { name: "Linda K.", text: "Pelayanan ramah dan kopi berkualitas tinggi. Perfect!", rating: 5 }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const handleInputChange = useCallback((field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }, [])

  const handleSendWhatsApp = useCallback(() => {
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Mohon isi nama dan pesan Anda')
      return
    }

    setIsSubmitting(true)
    
    try {
      const phoneNumber = '6281234567890'
      const text = `Halo, saya ${formData.name.trim()} ingin menghubungi Gedong Coffee:\n\n${formData.message.trim()}`
      const encoded = encodeURIComponent(text)
      window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank')
      
      setFormData({ name: '', message: '' })
    } catch (error) {
      console.error('Error opening WhatsApp:', error)
      alert('Terjadi kesalahan saat membuka WhatsApp')
    } finally {
      setIsSubmitting(false)
    }
  }, [formData])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            top: '10%',
            left: '70%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-orange-200/20 to-amber-200/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            top: '60%',
            left: '10%'
          }}
        />
      </div>

      {/* Floating Coffee Beans */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-amber-800 rounded-full animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              left: `${5 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4 space-y-32">

          {/* Hero Section */}
          <section className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent mb-6 animate-pulse">
              Gedong Coffee
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Perjalanan Cita Rasa dari Hati Indonesia
            </p>
            <div className="mt-8 flex justify-center">
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </section>

          {/* About Section with Parallax */}
          <section 
            id="about"
            data-animate
            className={`flex flex-col lg:flex-row items-center gap-16 transition-all duration-1000 ${
              isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex-1 space-y-6">
              <div className="inline-block">
                <h2 className="text-5xl font-bold text-amber-900 mb-2 relative">
                  Tentang Kami
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"></div>
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Gedong Coffee adalah pelopor kopi lokal dari Indonesia yang menyatukan cita rasa, tradisi, dan kualitas tinggi. Kami percaya bahwa secangkir kopi yang baik bukan hanya soal rasa, tapi juga tentang perjalanan—dari petani ke penikmat kopi.
              </p>
              <div className="flex gap-6 mt-8">
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="text-3xl font-bold text-amber-800">100+</div>
                  <div className="text-sm text-gray-600">Petani Mitra</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="text-3xl font-bold text-amber-800">50K+</div>
                  <div className="text-sm text-gray-600">Pelanggan</div>
                </div>
                <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-amber-200">
                  <div className="text-3xl font-bold text-amber-800">15+</div>
                  <div className="text-sm text-gray-600">Varian Kopi</div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative group">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/home-image.jpg" 
                  alt="Tentang Gedong Coffee - Suasana kedai kopi tradisional" 
                  fill 
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </section>

          {/* History Section with Counter */}
          <section 
            id="history"
            data-animate
            className={`flex flex-col-reverse lg:flex-row items-center gap-16 transition-all duration-1000 ${
              isVisible.history ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex-1 relative group">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src="/home-image.jpg" 
                  alt="Sejarah Pabrik Gedong Coffee - Proses pengolahan kopi tradisional" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
                <div className="text-3xl font-bold text-amber-800">{yearsCount}</div>
                <div className="text-sm text-gray-600">Tahun Berdiri</div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-block">
                <h2 className="text-5xl font-bold text-amber-900 mb-2 relative">
                  Sejarah Kami
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full"></div>
                </h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Sejak 1982, Pabrik Gedong Coffee berdiri kokoh di lereng pegunungan yang subur. Kami memadukan metode pengolahan tradisional dengan teknologi modern untuk menjaga cita rasa otentik kopi Nusantara.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                  <div className="text-2xl font-bold text-amber-800 mb-2">1982</div>
                  <div className="text-sm text-gray-700">Didirikan</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                  <div className="text-2xl font-bold text-amber-800 mb-2">1995</div>
                  <div className="text-sm text-gray-700">Ekspansi</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                  <div className="text-2xl font-bold text-amber-800 mb-2">2010</div>
                  <div className="text-sm text-gray-700">Modernisasi</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                  <div className="text-2xl font-bold text-amber-800 mb-2">2025</div>
                  <div className="text-sm text-gray-700">Go Digital</div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission with Cards */}
<section 
  id="vision"
  data-animate
  className={`transition-all duration-1000 ${
    isVisible.vision ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <div className="text-center mb-16">
    <h2 className="text-5xl font-bold text-amber-900 mb-4">Visi & Misi</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full mx-auto"></div>
  </div>
  
  <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 text-amber-800 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-amber-800">Visi</h3>
          <p className="text-lg leading-relaxed text-amber-700">
            Menjadi merek kopi lokal yang dikenal secara global tanpa menghilangkan akar tradisi dan kualitas lokal.
          </p>
        </div>
      </div>
    </div>
    
    <div className="group">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 p-8 text-orange-800 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-orange-800">Misi</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full mt-0.5">
                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-orange-700">Mendukung petani lokal melalui kemitraan berkelanjutan</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full mt-0.5">
                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-orange-700">Menghadirkan kopi berkualitas tinggi dengan proses etis</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full mt-0.5">
                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-orange-700">Mengedukasi konsumen tentang kopi berkelanjutan</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>


          {/* Contact Form with Glassmorphism */}
          <section 
            id="contact"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold text-amber-900 mb-4">Hubungi Kami</h2>
                  <p className="text-lg text-gray-600">Mari berkolaborasi untuk menciptakan pengalaman kopi yang tak terlupakan!</p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Nama Anda</label>
                      <input
                        type="text"
                        placeholder="Masukkan nama Anda"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        className="w-full bg-white/50 backdrop-blur-sm border border-amber-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Email (Opsional)</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        className="w-full bg-white/50 backdrop-blur-sm border border-amber-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Pesan Anda</label>
                    <textarea
                      rows={5}
                      placeholder="Ceritakan tentang kebutuhan atau pertanyaan Anda..."
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      className="w-full bg-white/50 backdrop-blur-sm border border-amber-200 px-4 py-3 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none resize-none"
                      required
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516z"/>
                        </svg>
                        Kirim via WhatsApp
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}