import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import GallerySection from "@/components/GallerySection"
import ConsultationForm from "@/components/ConsultationForm"
import Footer from "@/components/Footer"
import FloatingButtons from "@/components/FloatingButtons"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ConsultationForm />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
