"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Save,
  X,
  MapPin,
  Building,
  ImageIcon,
  Settings,
  Eye,
  Clock,
  Users,
  DollarSign,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import ImageUpload from "@/components/ImageUpload"

interface Project {
  id: number
  name: string
  category: string
  image_url: string
  description: string
  location?: string
  duration?: string
  team_size?: string
  client?: string
  budget?: string
  technical_specs?: string
  key_features?: string
  project_status?: string
  created_at?: string
  updated_at?: string
}

interface Consultation {
  id: number
  name: string
  email: string
  whatsapp: string
  needs: string
  status: string
  created_at: string
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("projects")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image_url: "",
    description: "",
    location: "",
    duration: "",
    team_size: "",
    client: "",
    budget: "",
    technical_specs: "",
    key_features: "",
    project_status: "completed",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      console.log("🔄 Fetching data...")
      setIsRefreshing(true)

      const [projectsRes, consultationsRes] = await Promise.all([
        fetch("/api/projects", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }),
        fetch("/api/consultations", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }),
      ])

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        console.log("✅ Projects loaded:", projectsData.length, "projects")
        setProjects(projectsData)
      } else {
        console.error("❌ Failed to fetch projects:", projectsRes.status, await projectsRes.text())
      }

      if (consultationsRes.ok) {
        const consultationsData = await consultationsRes.json()
        console.log("✅ Consultations loaded:", consultationsData.length, "consultations")
        setConsultations(consultationsData)
      } else {
        console.error("❌ Failed to fetch consultations:", consultationsRes.status)
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error)
      toast({
        title: "Error",
        description: "Gagal memuat data. Silakan refresh halaman.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...")

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        toast({
          title: "Logout Berhasil",
          description: "Anda telah keluar dari dashboard admin.",
        })

        setProjects([])
        setConsultations([])
        router.push("/admin/login")
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/admin/login")
    }
  }

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          credentials: "include",
        })

        if (!response.ok) {
          console.log("❌ Authentication failed, redirecting to login")
          router.push("/admin/login")
          return
        }

        const data = await response.json()
        if (!data.authenticated) {
          router.push("/admin/login")
          return
        }

        console.log("✅ User authenticated:", data.user?.username)
      } catch (error) {
        console.error("Auth verification error:", error)
        router.push("/admin/login")
      }
    }

    verifyAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveError(null)

    try {
      console.log("💾 Starting save process...")
      console.log("📋 Current form data:", formData)
      console.log("✏️ Editing project:", editingProject?.id)

      // Validate required fields
      const errors = []
      if (!formData.name?.trim()) errors.push("Nama proyek wajib diisi")
      if (!formData.category) errors.push("Kategori wajib dipilih")
      if (!formData.description?.trim()) errors.push("Deskripsi wajib diisi")

      if (errors.length > 0) {
        throw new Error(errors.join(", "))
      }

      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects"
      const method = editingProject ? "PUT" : "POST"

      // Clean and prepare data
      const cleanData = {
        name: formData.name.trim(),
        category: formData.category,
        image_url: formData.image_url || "/placeholder.svg",
        description: formData.description.trim(),
        location: formData.location?.trim() || "",
        duration: formData.duration?.trim() || "",
        team_size: formData.team_size?.trim() || "",
        client: formData.client?.trim() || "",
        budget: formData.budget?.trim() || "",
        technical_specs: formData.technical_specs?.trim() || "",
        key_features: formData.key_features?.trim() || "",
        project_status: formData.project_status || "completed",
      }

      console.log("📤 Sending request:", {
        url,
        method,
        data: cleanData,
      })

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        body: JSON.stringify(cleanData),
      })

      console.log("📥 Response status:", response.status)
      console.log("📥 Response headers:", Object.fromEntries(response.headers.entries()))

      const responseText = await response.text()
      console.log("📥 Raw response:", responseText)

      let result
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.error("❌ Failed to parse response as JSON:", parseError)
        throw new Error(`Server returned invalid response: ${responseText}`)
      }

      if (!response.ok) {
        console.error("❌ API Error Response:", result)
        throw new Error(result.error || `Server error: ${response.status}`)
      }

      console.log("✅ Save successful:", result)

      // Show success message
      toast({
        title: editingProject ? "✅ Proyek Berhasil Diperbarui!" : "✅ Proyek Berhasil Ditambahkan!",
        description: "Semua data telah tersimpan dengan baik.",
      })

      // Reset form
      resetForm()

      // Refresh data with delay to ensure database is updated
      console.log("🔄 Refreshing data after save...")
      setTimeout(async () => {
        await fetchData()
        console.log("✅ Data refreshed successfully")
      }, 500)
    } catch (error) {
      console.error("❌ Save error:", error)
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui"
      setSaveError(errorMessage)
      toast({
        title: "❌ Gagal Menyimpan",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus proyek ini?")) return

    try {
      console.log("🗑️ Deleting project:", id)

      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      if (response.ok) {
        toast({
          title: "✅ Proyek Dihapus",
          description: "Data berhasil dihapus.",
        })
        await fetchData()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete project")
      }
    } catch (error) {
      console.error("❌ Delete error:", error)
      toast({
        title: "❌ Gagal Menghapus",
        description: error instanceof Error ? error.message : "Terjadi kesalahan.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    console.log("🔄 Resetting form...")
    setFormData({
      name: "",
      category: "",
      image_url: "",
      description: "",
      location: "",
      duration: "",
      team_size: "",
      client: "",
      budget: "",
      technical_specs: "",
      key_features: "",
      project_status: "completed",
    })
    setShowAddForm(false)
    setEditingProject(null)
    setViewingProject(null)
    setSaveError(null)
  }

  const startEdit = (project: Project) => {
    console.log("✏️ Starting edit for project:", project)
    setFormData({
      name: project.name || "",
      category: project.category || "",
      image_url: project.image_url || "",
      description: project.description || "",
      location: project.location || "",
      duration: project.duration || "",
      team_size: project.team_size || "",
      client: project.client || "",
      budget: project.budget || "",
      technical_specs: project.technical_specs || "",
      key_features: project.key_features || "",
      project_status: project.project_status || "completed",
    })
    setEditingProject(project)
    setShowAddForm(true)
    setViewingProject(null)
    setSaveError(null)
  }

  const viewProject = (project: Project) => {
    console.log("👁️ Viewing project:", project)
    setViewingProject(project)
    setShowAddForm(false)
    setEditingProject(null)
  }

  const handleImageChange = (imageUrl: string) => {
    console.log("🖼️ Image changed:", imageUrl)
    setFormData((prev) => ({ ...prev, image_url: imageUrl }))
  }

  const handleInputChange = (field: string, value: string) => {
    console.log(`📝 Field changed: ${field} =`, value)
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setSaveError(null) // Clear error when user starts typing
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="glass-nav shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard Admin <span className="text-blue-accent">Struktura</span>
            </h1>
            <div className="flex items-center space-x-4">
              <Button
                onClick={fetchData}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab("projects")}
            variant={activeTab === "projects" ? "default" : "outline"}
            className={activeTab === "projects" ? "bg-blue-accent text-white" : "border-blue-accent text-blue-accent"}
          >
            Kelola Galeri
          </Button>
          <Button
            onClick={() => setActiveTab("consultations")}
            variant={activeTab === "consultations" ? "default" : "outline"}
            className={
              activeTab === "consultations" ? "bg-blue-accent text-white" : "border-blue-accent text-blue-accent"
            }
          >
            Data Konsultasi
          </Button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Kelola Galeri Proyek</h2>
              <Button
                onClick={() => {
                  resetForm()
                  setShowAddForm(true)
                }}
                className="bg-blue-accent hover:bg-blue-dark text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Proyek
              </Button>
            </div>

            {/* Error Display */}
            {saveError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error saat menyimpan:</h3>
                  <p className="text-sm text-red-700 mt-1">{saveError}</p>
                </div>
              </div>
            )}

            {/* Project Detail View */}
            {viewingProject && (
              <Card className="glass-card border-2 border-blue-100">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-gray-900">👁️ Detail Proyek</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => startEdit(viewingProject)}
                        className="bg-blue-accent hover:bg-blue-dark text-white"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingProject(null)}
                        className="text-gray-500 hover:text-gray-700 bg-white/80"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Project Image */}
                    <div className="lg:col-span-1">
                      <div className="relative h-64 w-full rounded-lg overflow-hidden">
                        <Image
                          src={viewingProject.image_url || "/placeholder.svg"}
                          alt={viewingProject.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-bold text-gray-900">{viewingProject.name}</h3>
                        <span className="inline-block bg-blue-accent text-white px-3 py-1 rounded-full text-sm mt-2">
                          {viewingProject.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi</h4>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{viewingProject.description}</p>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {viewingProject.location && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <MapPin className="h-4 w-4 text-blue-accent mr-2" />
                              <span className="text-sm font-medium text-gray-600">Lokasi</span>
                            </div>
                            <p className="text-gray-900 font-semibold">{viewingProject.location}</p>
                          </div>
                        )}

                        {viewingProject.duration && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <Clock className="h-4 w-4 text-blue-accent mr-2" />
                              <span className="text-sm font-medium text-gray-600">Durasi</span>
                            </div>
                            <p className="text-gray-900 font-semibold">{viewingProject.duration}</p>
                          </div>
                        )}

                        {viewingProject.team_size && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <Users className="h-4 w-4 text-blue-accent mr-2" />
                              <span className="text-sm font-medium text-gray-600">Tim</span>
                            </div>
                            <p className="text-gray-900 font-semibold">{viewingProject.team_size}</p>
                          </div>
                        )}

                        {viewingProject.client && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <Building className="h-4 w-4 text-blue-accent mr-2" />
                              <span className="text-sm font-medium text-gray-600">Klien</span>
                            </div>
                            <p className="text-gray-900 font-semibold">{viewingProject.client}</p>
                          </div>
                        )}

                        {viewingProject.budget && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <DollarSign className="h-4 w-4 text-blue-accent mr-2" />
                              <span className="text-sm font-medium text-gray-600">Budget</span>
                            </div>
                            <p className="text-gray-900 font-semibold">{viewingProject.budget}</p>
                          </div>
                        )}

                        {viewingProject.project_status && (
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                              <div className="h-4 w-4 bg-blue-accent rounded-full mr-2" />
                              <span className="text-sm font-medium text-gray-600">Status</span>
                            </div>
                            <p className="text-gray-900 font-semibold">
                              {viewingProject.project_status === "completed"
                                ? "Selesai"
                                : viewingProject.project_status === "ongoing"
                                  ? "Sedang Berjalan"
                                  : "Perencanaan"}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Technical Specs & Features */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {viewingProject.technical_specs && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Spesifikasi Teknis</h4>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <ul className="space-y-2">
                                {viewingProject.technical_specs.split(",").map((spec, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700">{spec.trim()}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {viewingProject.key_features && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Fitur Utama</h4>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                              <ul className="space-y-2">
                                {viewingProject.key_features.split(",").map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                                    <span className="text-blue-800 font-medium">{feature.trim()}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add/Edit Form */}
            {showAddForm && (
              <Card className="glass-card border-2 border-blue-100">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-gray-900">
                      {editingProject ? "✏️ Edit Proyek" : "➕ Tambah Proyek Baru"}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={resetForm}
                      className="text-gray-500 hover:text-gray-700 bg-white/80"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <Building className="mr-3 h-5 w-5 text-blue-accent" />
                        Informasi Dasar
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nama Proyek *
                          </Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Contoh: Gedung Perkantoran Modern"
                            className="border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                            Kategori *
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => handleInputChange("category", value)}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-blue-accent">
                              <SelectValue placeholder="Pilih kategori proyek" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pembangunan">🏗️ Pembangunan</SelectItem>
                              <SelectItem value="Renovasi">🔨 Renovasi</SelectItem>
                              <SelectItem value="Pemeliharaan">🛠️ Pemeliharaan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2 mt-6">
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                          Deskripsi Proyek *
                        </Label>
                        <Textarea
                          id="description"
                          required
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Deskripsi singkat tentang proyek ini..."
                          className="min-h-[100px] border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <MapPin className="mr-3 h-5 w-5 text-blue-accent" />
                        Detail Proyek
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                            📍 Lokasi
                          </Label>
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="Jakarta Selatan"
                            className="border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                            ⏱️ Durasi
                          </Label>
                          <Input
                            id="duration"
                            value={formData.duration}
                            onChange={(e) => handleInputChange("duration", e.target.value)}
                            placeholder="12 bulan"
                            className="border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="team_size" className="text-sm font-medium text-gray-700">
                            👥 Tim
                          </Label>
                          <Input
                            id="team_size"
                            value={formData.team_size}
                            onChange={(e) => handleInputChange("team_size", e.target.value)}
                            placeholder="25 orang"
                            className="border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="client" className="text-sm font-medium text-gray-700">
                            🏢 Klien
                          </Label>
                          <Input
                            id="client"
                            value={formData.client}
                            onChange={(e) => handleInputChange("client", e.target.value)}
                            placeholder="PT. Contoh Indonesia"
                            className="border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                            💰 Budget
                          </Label>
                          <Input
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => handleInputChange("budget", e.target.value)}
                            placeholder="Rp 5-10 Miliar"
                            className="border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="project_status" className="text-sm font-medium text-gray-700">
                            📊 Status Proyek
                          </Label>
                          <Select
                            value={formData.project_status}
                            onValueChange={(value) => handleInputChange("project_status", value)}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-blue-accent">
                              <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="completed">✅ Selesai</SelectItem>
                              <SelectItem value="ongoing">🚧 Sedang Berjalan</SelectItem>
                              <SelectItem value="planning">📋 Perencanaan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <Settings className="mr-3 h-5 w-5 text-blue-accent" />
                        Spesifikasi & Fitur
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="technical_specs" className="text-sm font-medium text-gray-700">
                            🔧 Spesifikasi Teknis
                          </Label>
                          <Textarea
                            id="technical_specs"
                            value={formData.technical_specs}
                            onChange={(e) => handleInputChange("technical_specs", e.target.value)}
                            placeholder="Struktur beton bertulang, Sistem MEP modern, Standar SNI"
                            className="min-h-[120px] border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                          <p className="text-sm text-gray-500">💡 Pisahkan setiap spesifikasi dengan koma (,)</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="key_features" className="text-sm font-medium text-gray-700">
                            ⭐ Fitur Utama
                          </Label>
                          <Textarea
                            id="key_features"
                            value={formData.key_features}
                            onChange={(e) => handleInputChange("key_features", e.target.value)}
                            placeholder="Desain modern, Ramah lingkungan, Teknologi smart building"
                            className="min-h-[120px] border-gray-300 focus:border-blue-accent focus:ring-blue-accent"
                          />
                          <p className="text-sm text-gray-500">💡 Pisahkan setiap fitur dengan koma (,)</p>
                        </div>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <ImageIcon className="mr-3 h-5 w-5 text-blue-accent" />
                        Gambar Proyek
                      </h3>
                      <ImageUpload
                        currentImageUrl={formData.image_url}
                        onImageChange={handleImageChange}
                        label="Upload Gambar Proyek"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                      <Button
                        type="submit"
                        disabled={
                          isSaving || !formData.name?.trim() || !formData.category || !formData.description?.trim()
                        }
                        className="bg-blue-accent hover:bg-blue-dark text-white px-8 py-3 flex-1 md:flex-none"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            {editingProject ? "Perbarui" : "Tambah"} Proyek
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm} disabled={isSaving}>
                        <X className="mr-2 h-4 w-4" />
                        Batal
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="glass-card hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg line-clamp-1">{project.name}</h3>
                      <span className="bg-blue-accent text-white px-2 py-1 rounded text-xs whitespace-nowrap ml-2">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{project.description}</p>

                    {/* Quick Info */}
                    <div className="space-y-1 mb-4 text-xs text-gray-500">
                      {project.location && <p>📍 {project.location}</p>}
                      {project.duration && <p>⏱️ {project.duration}</p>}
                      {project.client && <p>🏢 {project.client}</p>}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewProject(project)}
                        className="border-green-300 text-green-600 hover:bg-green-50 flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Lihat
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(project)}
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(project.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {projects.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Belum ada proyek. Tambahkan proyek pertama Anda!</p>
              </div>
            )}
          </div>
        )}

        {/* Consultations Tab */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Data Konsultasi</h2>

            <div className="grid gap-6">
              {consultations.map((consultation) => (
                <Card key={consultation.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">{consultation.name}</h3>
                        <p className="text-gray-600 mb-1">
                          <strong>Email:</strong> {consultation.email}
                        </p>
                        <p className="text-gray-600 mb-1">
                          <strong>WhatsApp:</strong> {consultation.whatsapp}
                        </p>
                        <p className="text-gray-600">
                          <strong>Tanggal:</strong> {new Date(consultation.created_at).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Kebutuhan Proyek:</h4>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{consultation.needs}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {consultations.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Belum ada data konsultasi.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
