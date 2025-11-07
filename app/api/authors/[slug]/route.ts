import { type NextRequest, NextResponse } from "next/server"
import { getAuthorBySlug } from "@/lib/sanity"

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const author = await getAuthorBySlug(slug)

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: author,
    })
  } catch (error) {
    console.error("[Author API Error]", error)
    return NextResponse.json({ error: "Failed to fetch author" }, { status: 500 })
  }
}
