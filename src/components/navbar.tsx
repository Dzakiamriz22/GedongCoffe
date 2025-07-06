"use client"
import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  
  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.language-dropdown')) {
      setIsLangDropdownOpen(false)
    }
  }
  
  // Add event listener for clicking outside
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#3e2c23]/90 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full shadow-sm" />
            {/* Optional: text next to logo */}
            <span className="text-lg font-semibold text-white">Brand</span>
          </div>
          
          {/* Menu */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <Link 
              href="/" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              Home
            </Link>
            <Link 
              href="/product" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              Product
            </Link>
            <Link 
              href="/news" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              News
            </Link>
            <Link 
              href="/about" 
              className="text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              About Us
            </Link>
          </nav>
          
          {/* Language dropdown */}
          <div className="relative language-dropdown">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md transition-all duration-200 ease-in-out"
            >
              ID/EN
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-100 rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => setIsLangDropdownOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-white-500 hover:bg-gray-780 transition-colors duration-150"
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  onClick={() => setIsLangDropdownOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm text-white-500 hover:bg-gray-780 transition-colors duration-150"
                >
                  🇺🇸 English
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white/90 hover:text-white hover:bg-white/10 p-2 rounded-md transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar