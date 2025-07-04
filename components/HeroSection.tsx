"use client"

import { ArrowRight, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-yellow-50 pt-20 md:pt-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-accent to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Membangun Masa Depan Bersama{" "}
                <span className="text-blue-accent bg-gradient-to-r from-blue-accent to-yellow-500 bg-clip-text text-transparent animate-pulse">
                  Struktura
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                Solusi konstruksi profesional untuk rumah, gedung, dan infrastruktur impian Anda
              </p>
              <p className="text-lg text-gray-500">
              Bagian dari <span className="text-blue-accent font-semibold">CV. Jayafa Pratama</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-blue-accent hover:bg-blue-dark text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection("konsultasi")}
              >
                Konsultasi Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("galeri")}
              >
                Lihat Portfolio
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-accent" />
                <span>+62 8953 4979 0050</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-accent" />
                <span>kontak.struktura@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-accent to-yellow-300 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative h-full w-full bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="./team-struktura.jpg"
                  alt="Konstruksi Profesional Struktura - CV. Jayafa Pratama"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=500&width=600&text=Konstruksi+Profesional"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-accent">500+</div>
                <div className="text-gray-600 text-sm">Proyek Selesai</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-accent">15+</div>
                <div className="text-gray-600 text-sm">Tahun Pengalaman</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
