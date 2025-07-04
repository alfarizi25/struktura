import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    console.log("📋 Fetching all projects...")

    const projects = await sql`
      SELECT * FROM projects 
      ORDER BY created_at DESC
    `

    console.log("✅ Projects fetched:", projects.length, "projects")
    return NextResponse.json(projects)
  } catch (error) {
    console.error("❌ Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    console.log("➕ POST request received for new project")

    const body = await request.json()
    console.log("📥 Request body:", body)

    const {
      name,
      category,
      image_url,
      description,
      location,
      duration,
      team_size,
      client,
      budget,
      technical_specs,
      key_features,
      project_status,
    } = body

    // Validate required fields
    if (!name || !category || !description) {
      console.error("❌ Missing required fields:", { name: !!name, category: !!category, description: !!description })
      return NextResponse.json({ error: "Name, category, and description are required" }, { status: 400 })
    }

    console.log("💾 Creating project with data:", {
      name,
      category,
      image_url,
      description,
      location,
      duration,
      team_size,
      client,
      budget,
      technical_specs,
      key_features,
      project_status,
    })

    const result = await sql`
      INSERT INTO projects (
        name, category, image_url, description, location, duration, 
        team_size, client, budget, technical_specs, key_features, project_status
      )
      VALUES (
        ${name}, ${category}, ${image_url || null}, ${description}, ${location || null}, ${duration || null},
        ${team_size || null}, ${client || null}, ${budget || null}, ${technical_specs || null}, 
        ${key_features || null}, ${project_status || "completed"}
      )
      RETURNING *
    `

    console.log("✅ Project created successfully:", result[0])
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("❌ Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
