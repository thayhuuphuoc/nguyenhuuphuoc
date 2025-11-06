import { type NextRequest, NextResponse } from "next/server"

// Sample author data
const authorData: Record<string, any> = {
  "manpreet-singh-minhas": {
    id: 1,
    name: "Manpreet Singh Minhas",
    role: "Staff Writer",
    bio: "UI/UX Research Blogger sharing insights on technical blogging.",
    avatar: "/avatar-person.png",
    articles: 24,
    followers: 1205,
  },
  "sanjida-windx": {
    id: 2,
    name: "Sanjida windx",
    role: "Guest Author",
    bio: "Health writer focusing on wellness and lifestyle improvements.",
    avatar: "/avatar-person.png",
    articles: 18,
    followers: 892,
  },
  "alice-ben": {
    id: 3,
    name: "Alice Ben",
    role: "Co-Author",
    bio: "Travel enthusiast sharing tips and stories about various tourist destinations.",
    avatar: "/avatar-person.png",
    articles: 32,
    followers: 1543,
  },
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const author = authorData[params.slug]

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
