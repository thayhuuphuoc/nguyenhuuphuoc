import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ViewCount from "@/models/ViewCount"

// GET view count for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Connect to database
    await connectDB()

    // Get view count
    const viewCount = await ViewCount.findOne({ postSlug: slug }).lean()

    return NextResponse.json({
      success: true,
      count: viewCount?.count || 0,
    })
  } catch (error: any) {
    console.error("Error fetching view count:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch view count" },
      { status: 500 }
    )
  }
}

// POST to increment view count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Connect to database
    await connectDB()

    // Get client IP for basic duplicate prevention (can be improved with cookies/session)
    const clientIP = request.headers.get("x-forwarded-for") || 
                     request.headers.get("x-real-ip") || 
                     "unknown"

    // Update or create view count
    // Using findOneAndUpdate with upsert for atomic operation
    const viewCount = await ViewCount.findOneAndUpdate(
      { postSlug: slug },
      {
        $inc: { count: 1 },
        $set: { lastViewedAt: new Date() },
      },
      {
        upsert: true,
        new: true,
      }
    )

    return NextResponse.json({
      success: true,
      count: viewCount.count,
    })
  } catch (error: any) {
    console.error("Error updating view count:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update view count" },
      { status: 500 }
    )
  }
}

