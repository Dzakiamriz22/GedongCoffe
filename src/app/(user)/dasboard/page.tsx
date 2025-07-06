"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { products, newsItems } from "@/data/home-data"
import ProductCard from "@/components/ProductCard"

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [email, setEmail] = useState("")
  
  const googleMapsUrl = "https://maps.app.goo.gl/tEExMMB3qyL9x2mr8"
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.850422340361!2d110.3703923748956!3d-7.142823092858763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7089cc55555555%3A0x28935471a25dc5b5!2sGEDONG%20KOPI!5e0!3m2!1sen!2sid!4v1720016688569!5m2!1sen!2sid"

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Coffee Enthusiast",
      text: "Gedong Kopi memberikan pengalaman kopi robusta yang luar biasa. Kualitas biji kopi lokal yang dipadu dengan teknik roasting tradisional menghasilkan cita rasa yang tak terlupakan."
    },
    {
      name: "Sari Dewi",
      role: "Local Customer",
      text: "Sebagai pecinta kopi, saya sangat terkesan dengan konsistensi kualitas Gedong Kopi. Setiap tegukan memberikan kepuasan yang mendalam dan aroma yang menggugah selera."
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
    alert("Terima kasih telah berlangganan newsletter kami!")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/home-user/Home Image.png" 
            alt="Geographical Indication Kendal Robusta Coffee Indonesia" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-amber-300 text-lg mb-4 font-medium">
                We've got your morning covered with
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Geographical Indication<br />
                Kendal Robusta Coffee<br />
                <span className="text-amber-300">Indonesia</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                It is best to start your day with a cup of coffee. Our goal is to bring you the 
                best flavors come you will ever taste. We are your one-stop shop for 
                the best coffee experience.
              </p>
              <Link 
                href="/product" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Best Store is coffee shop that provides you with quality coffee 
                to help boost your productivity and helps build your mood. 
                Having a cup of coffee is a good as have a full meal, and it 
                perfect to have a coffee with coffee news. There is no doubt 
                that you will enjoy this coffee more than others you have ever tested.
              </p>
              <Link 
                href="/about" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative w-96 h-96">
                <Image 
                  src="/home-user/Home Image.png" 
                  alt="Coffee beans" 
                  fill 
                  className="object-cover rounded-full shadow-2xl" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MPIG Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">
            MPIG - Robusta Kendal Coffee
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            ROBUSTA - SPECIALTY COFFEE
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="text-6xl text-amber-600 mb-6">❝</div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
              {testimonials[activeTestimonial].text}
            </p>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button 
                onClick={() => setActiveTestimonial(0)}
                className="w-12 h-12 bg-amber-100 hover:bg-amber-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => setActiveTestimonial(1)}
                className="w-12 h-12 bg-amber-100 hover:bg-amber-200 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <h4 className="text-2xl font-bold text-amber-800 mb-2">
              {testimonials[activeTestimonial].name}
            </h4>
            <p className="text-gray-600">
              {testimonials[activeTestimonial].role}
            </p>
          </div>
        </div>
      </section>

      {/* Product Highlight Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              PRODUCT HIGHLIGHT
            </h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of Kendal Robusta coffee, 
              carefully crafted to deliver exceptional taste and quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* View All Products Button */}
          <div className="text-center mt-12">
            <Link 
              href="/product" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 border-b-4 border-blue-500 inline-block pb-2">
              News
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg mb-6">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.altText} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>Read More</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Contact Section */}
      <section 
        className="py-20 relative"
        style={{
          backgroundImage: 'url("/home-user/Home Image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-amber-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Reach Out to Us
              </h2>
              <p className="text-gray-600 mb-8">
                We'll help you find the perfect coffee for your preferences and 
                at the best price available.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
            
            <div className="bg-amber-800/90 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">
                Subscribe to get the Latest News
              </h2>
              <p className="text-amber-100 mb-8">
                Best Gedong Coffee deals, updates, vouchers and many more!
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}