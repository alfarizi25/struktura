import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import crypto from "crypto"

// Simple but secure password hashing
function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password + process.env.JWT_SECRET)
    .digest("hex")
}

function verifyPassword(inputPassword: string, expectedPassword: string): boolean {
  const inputHash = hashPassword(inputPassword)
  const expectedHash = hashPassword(expectedPassword)
  return inputHash === expectedHash
}

export async function POST(request: Request) {
  console.log("🚀 Login API called")

  try {
    const { username, password } = await request.json()

    console.log("📝 Login attempt:", {
      username: username || "undefined",
      passwordProvided: !!password,
    })

    // Validate input
    if (!username || !password) {
      console.log("❌ Missing credentials")
      return NextResponse.json(
        {
          error: "Username dan password harus diisi",
        },
        { status: 400 },
      )
    }

    // Get admin credentials from environment
    const adminUsername = process.env.ADMIN_USERNAME || "admin"
    const adminPassword = process.env.ADMIN_PASSWORD || "struktura2024"

    console.log("🔍 Checking credentials...")
    console.log("Expected username:", adminUsername)
    console.log("Provided username:", username)

    // Check username
    if (username !== adminUsername) {
      console.log("❌ Invalid username")
      return NextResponse.json(
        {
          error: "Username atau password salah",
        },
        { status: 401 },
      )
    }

    // Check password
    if (!verifyPassword(password, adminPassword)) {
      console.log("❌ Invalid password")
      return NextResponse.json(
        {
          error: "Username atau password salah",
        },
        { status: 401 },
      )
    }

    console.log("✅ Credentials valid")

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET missing")
      return NextResponse.json(
        {
          error: "Server configuration error",
        },
        { status: 500 },
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: 1,
        username: adminUsername,
        role: "admin",
        loginTime: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    )

    console.log("🎫 JWT token generated")

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil",
      user: {
        id: 1,
        username: adminUsername,
        role: "admin",
      },
    })

    // Set secure cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400, // 24 hours
      path: "/",
    })

    console.log("✅ Login completed successfully")
    return response
  } catch (error) {
    console.error("❌ Login error:", error)
    return NextResponse.json(
      {
        error: "Terjadi kesalahan server",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
