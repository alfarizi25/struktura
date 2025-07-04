"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, MapPin, Clock, Users, Building, DollarSign, Settings, Star } from "lucide-react"

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
}

export default function GallerySection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "ongoing":
        return "Sedang Berjalan"
      case "planning":
        return "Perencanaan"
      default:
        return "Tidak Diketahui"
    }
  }

  return (
    <section id="galeri" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Galeri <span className="text-blue-accent">Proyek</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat berbagai proyek konstruksi yang telah kami selesaikan dengan standar kualitas tinggi dan kepuasan
            klien yang maksimal.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
              key={project.id}
              className="glass-card rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image_url || "/placeholder.svg?height=300&width=400"}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-accent text-white">{project.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-accent transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    {project.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{project.location}</span>
                      </div>
                    )}
                    {project.duration && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{project.duration}</span>
                      </div>
                    )}
                    {project.client && (
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        <span>{project.client}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {projects.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada proyek yang tersedia.</p>
          </div>
        )}

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="sr-only">
              <DialogTitle>{selectedProject?.name || "Detail Proyek"}</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.name}</h2>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-blue-accent text-white">{selectedProject.category}</Badge>
                      {selectedProject.project_status && (
                        <Badge className={getStatusColor(selectedProject.project_status)}>
                          {getStatusText(selectedProject.project_status)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative h-80 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image_url || "/placeholder.svg?height=400&width=800"}
                    alt={selectedProject.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Description */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Proyek</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
                    </div>

                    {/* Technical Specifications */}
                    {selectedProject.technical_specs && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Settings className="h-5 w-5 mr-2 text-blue-accent" />
                          Spesifikasi Teknis
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <ul className="space-y-2">
                            {selectedProject.technical_specs.split(",").map((spec, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                                <span className="text-gray-700">{spec.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Key Features */}
                    {selectedProject.key_features && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Star className="h-5 w-5 mr-2 text-blue-accent" />
                          Fitur Utama
                        </h3>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                          <ul className="space-y-2">
                            {selectedProject.key_features.split(",").map((feature, index) => (
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

                  {/* Project Info Sidebar */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Informasi Proyek</h3>
                    <div className="space-y-4">
                      {selectedProject.location && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-4 w-4 text-blue-accent mr-2" />
                            <span className="text-sm font-medium text-gray-600">Lokasi</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{selectedProject.location}</p>
                        </div>
                      )}

                      {selectedProject.duration && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Clock className="h-4 w-4 text-blue-accent mr-2" />
                            <span className="text-sm font-medium text-gray-600">Durasi</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{selectedProject.duration}</p>
                        </div>
                      )}

                      {selectedProject.team_size && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Users className="h-4 w-4 text-blue-accent mr-2" />
                            <span className="text-sm font-medium text-gray-600">Tim</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{selectedProject.team_size}</p>
                        </div>
                      )}

                      {selectedProject.client && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <Building className="h-4 w-4 text-blue-accent mr-2" />
                            <span className="text-sm font-medium text-gray-600">Klien</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{selectedProject.client}</p>
                        </div>
                      )}

                      {selectedProject.budget && (
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <DollarSign className="h-4 w-4 text-blue-accent mr-2" />
                            <span className="text-sm font-medium text-gray-600">Budget</span>
                          </div>
                          <p className="text-gray-900 font-semibold">{selectedProject.budget}</p>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
