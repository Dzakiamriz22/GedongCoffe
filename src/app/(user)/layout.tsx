"use client"

import React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

/**
 * Layout for user-facing pages like home, product, news, about etc.
 * Based on the dashboard reference image provided.
 */

type Props = {
  children: React.ReactNode
}

export default function LayoutProtected({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf6eb] text-[#3e2c23] font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
