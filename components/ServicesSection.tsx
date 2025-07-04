"use client"

import { Building, Home, Wrench, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ServicesSection() {
  const services = [
    {
      icon: Building,
      title: "Pembangunan",
      description:
        "Konstruksi bangunan baru mulai dari rumah tinggal hingga gedung komersial dengan standar kualitas tinggi.",
      features: [
        "Desain Arsitektur",
        "Struktur Bangunan",
        "MEP (Mechanical, Electrical, Plumbing)",
        "Interior & Eksterior",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Home,
      title: "Renovasi",
      description:
        "Transformasi dan pembaruan bangunan existing untuk meningkatkan fungsi, estetika, dan nilai properti.",
      features: ["Renovasi Total", "Renovasi Parsial", "Upgrade Fasilitas", "Redesign Interior"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Wrench,
      title: "Pemeliharaan",
      description: "Layanan perawatan berkala dan perbaikan untuk menjaga kondisi optimal bangunan Anda.",
      features: ["Maintenance Rutin", "Perbaikan Darurat", "Inspeksi Berkala", "Upgrade Sistem"],
      color: "from-orange-500 to-orange-600",
    },
  ]

  const scrollToConsultation = () => {
    const element = document.getElementById("konsultasi")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="layanan" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layanan <span className="text-blue-accent">Kami</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi konstruksi lengkap untuk semua kebutuhan bangunan Anda dengan standar kualitas internasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-accent rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToConsultation}
                variant="outline"
                className="w-full border-blue-accent text-blue-accent hover:bg-blue-accent hover:text-white group-hover:shadow-lg transition-all duration-300"
              >
                Konsultasi Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
