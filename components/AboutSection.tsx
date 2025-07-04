"use client"

import { CheckCircle, Users, Award, Clock } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-yellow-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-accent to-blue-dark rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 transform hover:scale-105 transition-transform duration-300">
            Tentang <span className="text-blue-accent drop-shadow-lg animate-pulse">Struktura</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed hover:text-gray-800 transition-colors duration-300 mb-4">
            Dengan pengalaman lebih dari 15 tahun, kami telah menjadi mitra terpercaya dalam industri konstruksi
            Indonesia.
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Beroperasi dibawah naungan <span className="text-blue-accent font-semibold">CV. Jayafa Pratama</span>, kami
            berkomitmen memberikan layanan konstruksi terbaik dengan standar profesional tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-white to-blue-50 border border-blue-100 h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-3 h-3 bg-blue-accent rounded-full mr-3 animate-pulse"></span>
                Mengapa Memilih Kami?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-dark transition-colors duration-300">
                      Kualitas Terjamin
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Menggunakan material berkualitas tinggi dan teknologi konstruksi terdepan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-dark transition-colors duration-300">
                      Tim Profesional
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Didukung oleh arsitek, insinyur, dan pekerja berpengalaman dari CV. Jayafa Pratama
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-dark transition-colors duration-300">
                      Tepat Waktu
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Komitmen menyelesaikan proyek sesuai timeline yang disepakati
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-dark transition-colors duration-300">
                      Harga Kompetitif
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Solusi konstruksi dengan nilai terbaik untuk investasi Anda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Team Photo */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 h-full">
              <div className="relative h-full w-full group min-h-[400px]">
                <Image
                  src="./team-struktura.jpg"
                  alt="Tim Struktura - Profesional Konstruksi CV. Jayafa Pratama"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Tim+Struktura"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  <h4 className="text-xl font-bold mb-2 drop-shadow-lg">Tim Profesional Struktura</h4>
                  <p className="text-gray-200 drop-shadow-md mb-1">
                    Berpengalaman lebih dari <span className="text-blue-accent font-semibold">15</span> tahun dalam
                    industri konstruksi
                  </p>
                  <p className="text-sm text-gray-300 drop-shadow-md">CV. Jayafa Pratama</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-blue-accent rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-500 group">
            <Users className="h-12 w-12 text-blue-accent mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-dark transition-colors duration-300">
              500+
            </div>
            <div className="text-gray-600 group-hover:text-blue-dark transition-colors duration-300">
              Proyek Selesai
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-500 group">
            <Award className="h-12 w-12 text-blue-accent mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-dark transition-colors duration-300">
              15+
            </div>
            <div className="text-gray-600 group-hover:text-blue-dark transition-colors duration-300">
              Tahun Pengalaman
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-500 group">
            <Clock className="h-12 w-12 text-blue-accent mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-dark transition-colors duration-300">
              98%
            </div>
            <div className="text-gray-600 group-hover:text-blue-dark transition-colors duration-300">Tepat Waktu</div>
          </div>

          <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-500 group">
            <CheckCircle className="h-12 w-12 text-blue-accent mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-dark transition-colors duration-300">
              100%
            </div>
            <div className="text-gray-600 group-hover:text-blue-dark transition-colors duration-300">
              Kepuasan Klien
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
