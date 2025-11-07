import { type NextRequest, NextResponse } from "next/server"
import { getAuthorBySlug } from "@/lib/sanity"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const author = await getAuthorBySlug(params.slug)

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
