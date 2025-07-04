"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-blue-accent">Struktura</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("tentang")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => scrollToSection("layanan")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200"
              >
                Layanan
              </button>
              <button
                onClick={() => scrollToSection("galeri")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection("kontak")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200"
              >
                Kontak
              </button>
            </div>
          </div>

          {/* Admin Login Button */}
          <div className="hidden md:block">
            <Link href="/admin/login">
              <Button
                variant="outline"
                className="border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white"
              >
                Login Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-yellow-construction"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-card rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("tentang")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200 text-left"
              >
                Tentang Kami
              </button>
              <button
                onClick={() => scrollToSection("layanan")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200 text-left"
              >
                Layanan
              </button>
              <button
                onClick={() => scrollToSection("galeri")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200 text-left"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollToSection("kontak")}
                className="text-gray-700 hover:text-blue-accent transition-colors duration-200 text-left"
              >
                Kontak
              </button>
              <Link href="/admin/login">
                <Button
                  variant="outline"
                  className="border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white w-full"
                >
                  Login Admin
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
