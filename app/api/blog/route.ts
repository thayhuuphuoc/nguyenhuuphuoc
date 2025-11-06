import { type NextRequest, NextResponse } from "next/server"

// Sample blog data - in production, this would come from a database
const blogPosts = [
  {
    id: 1,
    slug: "top-articles-technology",
    title: "Top Articles to Read on Technology",
    category: "Technology",
    image: "/technology-network-abstract.jpg",
    excerpt: "Explore the most comprehensive collection of technology articles covering the latest trends.",
    views: 1205,
    comments: 23,
    date: "2025-06-09",
    readTime: "8 min",
  },
  {
    id: 2,
    slug: "technical-blogging-skill",
    title: "Technical blogging - A skill with many benefits",
    category: "Technology",
    image: "/purple-gradient-abstract.png",
    excerpt: "Learn why technical blogging is an essential skill for developers.",
    views: 845,
    comments: 15,
    date: "2025-06-08",
    readTime: "6 min",
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let filteredPosts = blogPosts

    // Filter by category
    if (category && category !== "All") {
      filteredPosts = filteredPosts.filter((post) => post.category === category)
    }

    // Filter by search query
    if (search) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredPosts,
      total: filteredPosts.length,
    })
  } catch (error) {
    console.error("[Blog API Error]", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
