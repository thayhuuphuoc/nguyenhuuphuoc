import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Comment from "@/models/Comment"
import { auth } from "@/lib/auth"
import User from "@/models/User"

// GET comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Connect to database
    await connectDB()

    // Get comments for this post, sorted by newest first
    const comments = await Comment.find({ postSlug: slug })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      comments,
      count: comments.length,
    })
  } catch (error: any) {
    console.error("Error fetching comments:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch comments" },
      { status: 500 }
    )
  }
}

// POST a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const session = await auth()

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Bạn cần đăng nhập để bình luận" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content } = body

    // Validation
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Nội dung bình luận không được để trống" },
        { status: 400 }
      )
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Bình luận không được quá 1000 ký tự" },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Get user info
    const user = await User.findById(session.user.id).select("name email").lean()
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy thông tin người dùng" },
        { status: 404 }
      )
    }

    // Create comment
    const comment = await Comment.create({
      postSlug: slug,
      author: {
        id: session.user.id,
        name: user.name,
        email: user.email,
        image: null, // Can be extended later if user has profile image
      },
      content: content.trim(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Bình luận đã được thêm thành công",
        comment,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Error creating comment:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create comment" },
      { status: 500 }
    )
  }
}

