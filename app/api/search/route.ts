import { NextResponse } from "next/server"
import { getPosts, getAuthors, getCategories } from "@/lib/sanity"
import { draftMode } from "next/headers"

export async function GET() {
  try {
    const { isEnabled } = await draftMode()
    const [posts, authors, categories] = await Promise.all([
      getPosts(isEnabled),
      getAuthors(isEnabled),
      getCategories(isEnabled),
    ])

    return NextResponse.json({
      posts,
      authors,
      categories,
    })
  } catch (error: any) {
    console.error("Error fetching search data:", error)
    return NextResponse.json(
      { error: "Failed to fetch search data" },
      { status: 500 }
    )
  }
}

