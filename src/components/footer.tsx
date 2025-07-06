"use client";

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-amber-300 rounded-lg flex items-center justify-center mr-3">
                <span className="text-gray-900 font-bold text-lg">GK</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-300">Gedong Kopi</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Menghadirkan cita rasa kopi robusta terbaik dari Kabupaten Semarang 
              dengan kualitas premium dan tradisi yang terjaga sejak turun temurun.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-amber-300 transition-colors">
                <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
                <span className="text-sm">Dusun Cemanggah Kidul No.RT 04/04, Branjang, Kendal, Jawa Tengah</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-amber-300 transition-colors">
                <Phone className="w-4 h-4 mr-3 flex-shrink-0" />
                <a href="tel:+62xxxxxxxxxxxx" className="text-sm hover:underline">+62 xxx xxxx xxxx</a>
              </div>
              <div className="flex items-center text-gray-300 hover:text-amber-300 transition-colors">
                <Mail className="w-4 h-4 mr-3 flex-shrink-0" />
                <a href="mailto:info@gedongkopi.com" className="text-sm hover:underline">info@gedongkopi.com</a>
              </div>
              <div className="flex items-center text-gray-300 hover:text-amber-300 transition-colors">
                <Globe className="w-4 h-4 mr-3 flex-shrink-0" />
                <a href="https://www.gedongkopi.com" className="text-sm hover:underline">www.gedongkopi.com</a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-amber-300 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-300"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/product", label: "Products" },
                { href: "/news", label: "News" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-amber-300 relative">
              Produk Kami
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-300"></div>
            </h4>
            <ul className="space-y-3">
              {[
                "Kopi Robusta Premium",
                "Kopi Bubuk Halus",
                "Kopi Biji Sangrai",
                "Kopi Kemasan Gift",
                "Kopi Organik"
              ].map((product, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-amber-300 transition-colors cursor-pointer">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {[
                { name: "Facebook", icon: "📘" },
                { name: "Instagram", icon: "📸" },
                { name: "WhatsApp", icon: "💬" },
                { name: "YouTube", icon: "📺" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-700 hover:bg-amber-300 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm mb-2">
                &copy; 2024 Gedong Kopi. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Dibuat dengan ❤️ untuk pecinta kopi Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;