import { type NextRequest, NextResponse } from "next/server"

// Sample authors data - in production, this would come from a database
const authors = [
  {
    id: 1,
    name: "Manpreet Singh Minhas",
    role: "Staff Writer",
    bio: "UI/UX Research Blogger sharing insights on technical blogging.",
    avatar: "/avatar-person.png",
    articles: 24,
    followers: 1205,
  },
  {
    id: 2,
    name: "Sanjida windx",
    role: "Guest Author",
    bio: "Health writer focusing on wellness and lifestyle improvements.",
    avatar: "/avatar-person.png",
    articles: 18,
    followers: 892,
  },
  {
    id: 3,
    name: "Alice Ben",
    role: "Co-Author",
    bio: "Travel enthusiast sharing tips and stories about various tourist destinations.",
    avatar: "/avatar-person.png",
    articles: 32,
    followers: 1543,
  },
]

export async function GET(request: NextRequest) {
  try {
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
