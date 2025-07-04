"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Send, CheckCircle } from "lucide-react"

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    needs: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Konsultasi Berhasil Dikirim!",
          description: "Tim kami akan menghubungi Anda dalam 24 jam.",
        })
        setFormData({ name: "", email: "", whatsapp: "", needs: "" })
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Silakan coba lagi atau hubungi kami langsung.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="konsultasi" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Konsultasi <span className="text-blue-accent">Gratis</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ceritakan kebutuhan proyek Anda dan dapatkan konsultasi gratis dari tim ahli kami.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="glass border-gray-300 focus:border-blue-accent"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="glass border-gray-300 focus:border-blue-accent"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp *</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                className="glass border-gray-300 focus:border-blue-accent"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="needs">Kebutuhan Proyek *</Label>
              <Textarea
                id="needs"
                name="needs"
                required
                value={formData.needs}
                onChange={handleChange}
                className="glass border-gray-300 focus:border-blue-accent min-h-[120px]"
                placeholder="Ceritakan detail proyek yang Anda inginkan, seperti jenis bangunan, lokasi, budget, dan timeline..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-accent hover:bg-blue-dark text-white px-8 py-3 text-lg flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Kirim Konsultasi
                  </>
                )}
              </Button>

              <div className="flex items-center text-gray-600 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Respon dalam 24 jam
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
