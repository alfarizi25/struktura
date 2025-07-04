import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  console.log("🔍 Auth verification called")

  try {
    const user = requireAuth(request)

    if (!user) {
      console.log("❌ No valid token found")
      return NextResponse.json(
        {
          authenticated: false,
          error: "Token tidak valid atau sudah expired",
        },
        { status: 401 },
      )
    }

    console.log("✅ User authenticated:", user.username)
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.userId,
        username: user.username,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("❌ Auth verification error:", error)
    return NextResponse.json(
      {
        authenticated: false,
        error: "Terjadi kesalahan server",
      },
      { status: 500 },
    )
  }
}
