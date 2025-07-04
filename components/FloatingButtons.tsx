"use client"

import { MessageCircle, Mail } from "lucide-react"

export default function FloatingButtons() {
  const openWhatsApp = () => {
    window.open("https://wa.me/62895349790050?text=Halo, saya tertarik dengan layanan Struktura", "_blank")
  }

  const openEmail = () => {
    window.location.href =
      "mailto:kontak.struktura@gmail.com?subject=Konsultasi Proyek&body=Halo, saya tertarik untuk berkonsultasi mengenai proyek konstruksi."
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        title="Chat WhatsApp"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Email Button */}
      <button
        onClick={openEmail}
        className="bg-blue-accent hover:bg-blue-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        title="Kirim Email"
      >
        <Mail className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  )
}
