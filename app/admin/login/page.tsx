"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { User, Lock, ArrowLeft } from "lucide-react"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${data.user?.username || "admin"}!`,
        })
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else {
        toast({
          title: "Login Gagal",
          description: data.error || "Username atau password salah.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menghubungi server.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 z-0" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10 z-0" />

      {/* Glass Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 glass rounded-full animate-pulse z-0" />
      <div className="absolute bottom-20 right-10 w-24 h-24 glass rounded-full animate-pulse delay-1000 z-0" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 glass rounded-full animate-pulse delay-500 z-0" />

      {/* Login Card */}
      <Card className="w-full max-w-md glass-card shadow-yellow-lg animate-fade-in z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Admin <span className="text-blue-accent">Struktura</span>
          </CardTitle>
          <p className="text-gray-600">Masuk ke halaman dashboard</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  required
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="pl-10 glass border-gray-300 focus:border-blue-accent"
                  placeholder="Masukkan username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  required
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="pl-10 glass border-gray-300 focus:border-blue-accent"
                  placeholder="Masukkan password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-accent hover:bg-blue-dark text-white"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          {/* Back to home */}
          <Button
            variant="outline"
            className="mt-4 w-full text-blue-accent border-blue-accent hover:bg-blue-50"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
