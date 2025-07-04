"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  currentImageUrl?: string
  onImageChange: (imageUrl: string) => void
  label?: string
  className?: string
}

export default function ImageUpload({
  currentImageUrl,
  onImageChange,
  label = "Upload Gambar",
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || "")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    console.log("📁 File selected:", file.name)

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "File Tidak Valid",
        description: "Silakan upload file JPG, PNG, WebP, atau GIF.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      toast({
        title: "File Terlalu Besar",
        description: "Ukuran file maksimal 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload file
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        console.log("✅ Upload successful:", result.url)
        setPreviewUrl(result.url)
        onImageChange(result.url)

        toast({
          title: "Upload Berhasil! 🎉",
          description: `File ${result.originalName} berhasil diupload.`,
        })
      } else {
        throw new Error(result.error || "Upload failed")
      }
    } catch (error) {
      console.error("❌ Upload error:", error)
      toast({
        title: "Upload Gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat upload.",
        variant: "destructive",
      })
      setPreviewUrl(currentImageUrl || "")
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl("")
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label>{label}</Label>

      {/* Hidden file input */}
      <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {/* Upload button or preview */}
      {previewUrl ? (
        <div className="space-y-4">
          {/* Image preview */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
            <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleButtonClick}
                disabled={isUploading}
                className="bg-white/80 hover:bg-white"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleRemoveImage}
                disabled={isUploading}
                className="bg-white/80 hover:bg-white text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Upload area */}
          <div
            onClick={handleButtonClick}
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-accent hover:bg-blue-50 transition-colors"
          >
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 text-center mb-2">
              {isUploading ? "Mengupload..." : "Klik untuk upload gambar"}
            </p>
            <p className="text-sm text-gray-400 text-center">JPG, PNG, WebP, GIF (Max 5MB)</p>
            {isUploading && (
              <div className="mt-4 w-8 h-8 border-2 border-blue-accent border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
