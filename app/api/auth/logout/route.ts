import { NextResponse } from "next/server"

export async function POST() {
  console.log("🚪 Logout API called")

  const response = NextResponse.json({
    success: true,
    message: "Logout berhasil",
  })

  // Clear the admin token cookie
  response.cookies.set("admin-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0, // Expire immediately
    path: "/",
  })

  console.log("✅ Logout completed")
  return response
}
