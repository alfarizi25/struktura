import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("🔄 PUT request received for project ID:", params.id)

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

    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      console.error("❌ Invalid project ID:", params.id)
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    console.log("💾 Updating project with data:", {
      id,
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
      UPDATE projects 
      SET 
        name = ${name || null}, 
        category = ${category || null}, 
        image_url = ${image_url || null}, 
        description = ${description || null}, 
        location = ${location || null}, 
        duration = ${duration || null},
        team_size = ${team_size || null}, 
        client = ${client || null}, 
        budget = ${budget || null},
        technical_specs = ${technical_specs || null}, 
        key_features = ${key_features || null},
        project_status = ${project_status || "completed"}, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    console.log("✅ Database update result:", result)

    if (result.length === 0) {
      console.error("❌ No project found with ID:", id)
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    console.log("🎉 Project updated successfully:", result[0])
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("❌ Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("🗑️ DELETE request received for project ID:", params.id)

    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      console.error("❌ Invalid project ID:", params.id)
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 })
    }

    const result = await sql`DELETE FROM projects WHERE id = ${id} RETURNING id`

    if (result.length === 0) {
      console.error("❌ No project found with ID:", id)
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    console.log("✅ Project deleted successfully:", id)
    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("❌ Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
