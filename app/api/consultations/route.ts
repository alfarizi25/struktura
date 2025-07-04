import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const consultations = await sql`
      SELECT * FROM consultations 
      ORDER BY created_at DESC
    `
    return NextResponse.json(consultations)
  } catch (error) {
    console.error("Error fetching consultations:", error)
    return NextResponse.json({ error: "Failed to fetch consultations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp, needs } = await request.json()

    const result = await sql`
      INSERT INTO consultations (name, email, whatsapp, needs)
      VALUES (${name}, ${email}, ${whatsapp}, ${needs})
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating consultation:", error)
    return NextResponse.json({ error: "Failed to create consultation" }, { status: 500 })
  }
}
