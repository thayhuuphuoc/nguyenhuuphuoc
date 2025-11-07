import { type NextRequest, NextResponse } from "next/server"
import { getPosts, getPostsByCategory } from "@/lib/sanity"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let posts

    // Filter by category if provided
    if (category) {
      posts = await getPostsByCategory(category)
    } else {
      posts = await getPosts()
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase()
      posts = posts.filter(
        (post: any) =>
          post.title?.toLowerCase().includes(searchLower) ||
          post.excerpt?.toLowerCase().includes(searchLower),
      )
    }

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length,
    })
  } catch (error) {
    console.error("[Blog API Error]", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
