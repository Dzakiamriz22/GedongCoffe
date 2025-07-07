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
            src="/home-image.jpg" 
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

{/* Arabica Flores Manggarai Coffee Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Coffee Bean Icon */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-amber-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.5c-3.81 0-6.5 2.69-6.5 6.5 0 4.31 6.5 11.5 6.5 11.5s6.5-7.19 6.5-11.5c0-3.81-2.69-6.5-6.5-6.5zm0 8.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  <ellipse cx="12" cy="6" rx="1.5" ry="2" fill="#92400e"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 leading-tight">
              Arabica Flores Manggarai Coffee
            </h2>
            <div className="inline-block bg-amber-800 text-white px-8 py-3 rounded-full font-semibold text-lg tracking-wide">
              ARABICA - SPECIALTY COFFEE
            </div>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              {/* Description */}
              <div className="mb-12">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-5xl mx-auto">
                  Manggarai is one of the regions on the island of Flores, Indonesia, which is famous for its high-quality coffee production. 
                  Geographically, Kabupaten Manggarai lies at highland areas dominated by undulating hills with surface area of about 8,000 m² 
                  - 40% (mountainous), covering 38.36% and a land slope between 15% - 40%, covering 55.8% of the area of Kabupaten 
                  Manggarai. Manggarai Arabica Flores Coffee farmers have applied the principles of good agricultural practices.
                </p>
              </div>
              
              {/* Indonesia Map Section */}
              <div className="mb-16 relative">
                <div className="text-center">
                  <div className="relative inline-block bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
                    {/* Stylized Indonesia Map */}
                    <div className="relative">
                      <svg className="w-full max-w-2xl h-32 mx-auto" viewBox="0 0 600 150" fill="none">
                        {/* Main islands outline */}
                        <path d="M50 75 Q100 60 150 70 Q200 65 250 75 Q300 70 350 80 Q400 75 450 85 Q500 80 550 90" 
                              stroke="#92400e" strokeWidth="3" fill="none"/>
                        <path d="M50 85 Q100 70 150 80 Q200 75 250 85 Q300 80 350 90 Q400 85 450 95 Q500 90 550 100" 
                              stroke="#92400e" strokeWidth="3" fill="none"/>
                        
                        {/* Island shapes */}
                        <ellipse cx="120" cy="77" rx="25" ry="8" fill="#D97706" opacity="0.7"/>
                        <ellipse cx="200" cy="75" rx="30" ry="10" fill="#D97706" opacity="0.7"/>
                        <ellipse cx="280" cy="80" rx="35" ry="12" fill="#D97706" opacity="0.7"/>
                        <ellipse cx="380" cy="85" rx="40" ry="15" fill="#D97706" opacity="0.7"/>
                        <ellipse cx="480" cy="90" rx="30" ry="12" fill="#D97706" opacity="0.7"/>
                        
                        {/* Flores Islands highlight */}
                        <circle cx="380" cy="85" r="6" fill="#DC2626" className="animate-pulse"/>
                        <circle cx="380" cy="85" r="10" fill="none" stroke="#DC2626" strokeWidth="2"/>
                        
                        {/* Coffee bean icons */}
                        <circle cx="370" cy="80" r="2" fill="#92400e"/>
                        <circle cx="385" cy="88" r="2" fill="#92400e"/>
                        <circle cx="375" cy="92" r="2" fill="#92400e"/>
                      </svg>
                      
                      {/* Labels */}
                      <div className="absolute top-0 right-0 bg-amber-800 text-white px-4 py-2 rounded-full font-bold text-sm">
                        INDONESIA
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                        FLORES ISLANDS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-amber-800 mb-3">42</div>
                  <div className="text-gray-600 font-medium">Farmer Groups</div>
                </div>
                <div className="text-center bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-orange-800 mb-3">1,685+</div>
                  <div className="text-gray-600 font-medium">Coffee Farmers</div>
                </div>
                <div className="text-center bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-red-800 mb-3">>72,000ha</div>
                  <div className="text-gray-600 font-medium">Coffee Farm</div>
                </div>
                <div className="text-center bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-pink-800 mb-3">>4,000Ton</div>
                  <div className="text-gray-600 font-medium">Average Production per Year</div>
                </div>
              </div>
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
                  src="/home-image.jpg" 
                  alt="Coffee beans" 
                  fill 
                  className="object-cover rounded-full shadow-2xl" 
                />
              </div>
            </div>
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
                    src= "/home-image.jpg" 
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