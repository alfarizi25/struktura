"use client"

import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer id="kontak" className="bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Hubungi <span className="text-blue-accent">Struktura</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Siap membantu mewujudkan proyek konstruksi impian Anda dengan kualitas terbaik dan pelayanan
                profesional.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Alamat Kantor</h3>
                  <p className="text-gray-300">
                    Jl. Sekarsari, PURI ARGAPURA
                    <br />
                    No.B1 ,RT.001 RW.001 Kelurahan Argasunya
                    <br />
                    Kecamatan Harjamukti, Kota Cirebon 45143
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telepon</h3>
                  <p className="text-gray-300">+62 8953 4979 0050</p>
                  <p className="text-gray-300">+62 8953 4979 0050 (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-300">kontak.struktura@gmail.com</p>
                  <p className="text-gray-300">jayafa_pratama@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Jam Operasional</h3>
                  <p className="text-gray-300">Senin - Jumat: 08:00 - 17:00</p>
                  <p className="text-gray-300">Sabtu: 08:00 - 15:00</p>
                  <p className="text-gray-300">Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-blue-accent mb-4">Lokasi Kami</h3>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.63255888670562!2d108.54438181687478!3d-6.755102770823046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1dc714254ea7%3A0xba4d522ac07f6d57!2sGg.%20Attarbiyah%20II%20Puri%20Argapura%20No.B1%2C%20Argasunya%2C%20Kec.%20Harjamukti%2C%20Kota%20Cirebon%2C%20Jawa%20Barat%2045145!5e0!3m2!1sid!2sid!4v1751083888147!5m2!1sid!2sid" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Struktura"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Struktura. Semua hak cipta dilindungi. |
            <span className="text-blue-accent"> Membangun Masa Depan Bersama Struktura</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
