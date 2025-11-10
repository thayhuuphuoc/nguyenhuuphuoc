"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Send, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface Comment {
  _id: string
  author: {
    id: string
    name: string
    email: string
    image?: string | null
  }
  content: string
  createdAt: string
  updatedAt: string
}

interface CommentsSectionProps {
  postSlug: string
  onCommentChange?: () => void
}

export function CommentsSection({ postSlug, onCommentChange }: CommentsSectionProps) {
  const { data: session } = useSession()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [comment, setComment] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)

  // Fetch comments
  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/posts/${postSlug}/comments`)
      const data = await response.json()

      if (data.success) {
        setComments(data.comments || [])
      } else {
        console.error("Failed to fetch comments:", data.error)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
      toast.error("Không thể tải bình luận")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [postSlug])

  // Submit comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user) {
      toast.error("Bạn cần đăng nhập để bình luận")
      return
    }

    if (!comment.trim()) {
      toast.error("Nội dung bình luận không được để trống")
      return
    }

    if (comment.length > 1000) {
      toast.error("Bình luận không được quá 1000 ký tự")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Bình luận đã được thêm thành công")
        setComment("")
        // Refresh comments
        await fetchComments()
        // Notify parent to refresh stats
        onCommentChange?.()
        // Dispatch event for other components
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("comment-changed"))
        }
      } else {
        toast.error(data.error || "Không thể thêm bình luận")
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại")
    } finally {
      setSubmitting(false)
    }
  }

  // Delete comment
  const handleDelete = async (commentId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      return
    }

    setDeleting(commentId)
    try {
      const response = await fetch(`/api/posts/${postSlug}/comments/${commentId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Bình luận đã được xóa thành công")
        // Refresh comments
        await fetchComments()
        // Notify parent to refresh stats
        onCommentChange?.()
        // Dispatch event for other components
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("comment-changed"))
        }
      } else {
        toast.error(data.error || "Không thể xóa bình luận")
      }
    } catch (error) {
      console.error("Error deleting comment:", error)
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại")
    } finally {
      setDeleting(null)
    }
  }

  const canDelete = (comment: Comment) => {
    if (!session?.user) return false
    const isAuthor = comment.author.id === (session.user as any).id
    const isAdmin = (session.user as any).role === "admin"
    return isAuthor || isAdmin
  }

  return (
    <div className="mt-12 pt-12 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={20} />
        <h2 className="text-2xl font-bold">Bình luận ({comments.length})</h2>
      </div>

      {/* Comment Form */}
      {session?.user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="comment" className="sr-only">
                Bình luận
              </label>
              <Textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                rows={4}
                maxLength={1000}
                autoComplete="off"
                className="resize-none"
                aria-label="Bình luận"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {comment.length}/1000 ký tự
              </span>
              <Button type="submit" disabled={submitting || !comment.trim()}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Gửi bình luận
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 border rounded-lg text-center">
          <p className="text-muted-foreground mb-4">
            Bạn cần đăng nhập để bình luận
          </p>
          <Link href="/sign-in">
            <Button variant="outline">Đăng nhập</Button>
          </Link>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {comment.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{comment.author.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </span>
                  </div>
                  {canDelete(comment) && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(comment._id)}
                      disabled={deleting === comment._id}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      {deleting === comment._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

