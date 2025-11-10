import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import ViewCount from "@/models/ViewCount"

// GET view count for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  let slug: string | undefined
  try {
    const paramsResult = await params
    slug = paramsResult.slug
    console.log(`[Views API] GET request for slug: ${slug}`)

    // Connect to database
    const dbConnection = await connectDB()
    
    // If database is not connected, return 0
    if (!dbConnection) {
      console.warn(`[Views API] ⚠️ MongoDB not connected for slug: ${slug}, returning 0`)
      return NextResponse.json({
        success: true,
        count: 0,
      })
    }

    // Get view count
    const viewCount = await ViewCount.findOne({ postSlug: slug }).lean()
    console.log(`[Views API] Found view count for ${slug}:`, viewCount?.count || 0)

    return NextResponse.json({
      success: true,
      count: viewCount?.count || 0,
    })
  } catch (error: any) {
    console.error(`[Views API] Error fetching view count for slug ${slug || 'unknown'}:`, error)
    // Return 0 instead of error to prevent UI breaking
    return NextResponse.json({
      success: true,
      count: 0,
    })
  }
}

// POST to increment view count
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  let slug: string | undefined
  try {
    const paramsResult = await params
    slug = paramsResult.slug

    // Connect to database
    const dbConnection = await connectDB()
    
    // If database is not connected, return success but don't increment
    if (!dbConnection) {
      console.warn(`[Views API] ⚠️ MongoDB not connected for slug: ${slug || 'unknown'}, cannot track view count`)
      return NextResponse.json({
        success: true,
        count: 0,
      })
    }

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
      count: viewCount?.count || 0,
    })
  } catch (error: any) {
    console.error(`[Views API] Error updating view count for slug ${slug || 'unknown'}:`, error)
    // Return success with 0 to prevent UI breaking
    return NextResponse.json({
      success: true,
      count: 0,
    })
  }
}

