import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Comment from "@/models/Comment"
import { auth } from "@/lib/auth"

// DELETE a comment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Bạn cần đăng nhập để xóa bình luận" },
        { status: 401 }
      )
    }

    // Connect to database
    await connectDB()

    // Find comment
    const comment = await Comment.findById(id)
    if (!comment) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy bình luận" },
        { status: 404 }
      )
    }

    // Check if user is the author or admin
    const isAuthor = comment.author.id === session.user.id
    const isAdmin = (session.user as any).role === "admin"

    if (!isAuthor && !isAdmin) {
      return NextResponse.json(
        { success: false, error: "Bạn không có quyền xóa bình luận này" },
        { status: 403 }
      )
    }

    // Delete comment
    await Comment.findByIdAndDelete(id)

    return NextResponse.json({
      success: true,
      message: "Bình luận đã được xóa thành công",
    })
  } catch (error: any) {
    console.error("Error deleting comment:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete comment" },
      { status: 500 }
    )
  }
}

