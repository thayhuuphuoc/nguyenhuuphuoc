import { type NextRequest, NextResponse } from "next/server"
import { getAuthors } from "@/lib/sanity"

export async function GET(request: NextRequest) {
  try {
    const authors = await getAuthors()
    return NextResponse.json({
      success: true,
      data: authors,
      total: authors.length,
    })
  } catch (error) {
    console.error("[Authors API Error]", error)
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 })
  }
}
