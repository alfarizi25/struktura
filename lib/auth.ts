import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

export interface AuthUser {
  userId: number
  username: string
  role: string
  loginTime: number
}

export function verifyToken(token: string): AuthUser | null {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from cookie
  const tokenFromCookie = request.cookies.get("admin-token")?.value
  if (tokenFromCookie) {
    return tokenFromCookie
  }

  // Try to get token from Authorization header
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  return null
}

export function requireAuth(request: NextRequest): AuthUser | null {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }

  return verifyToken(token)
}
