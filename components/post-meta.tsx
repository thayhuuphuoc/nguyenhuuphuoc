"use client"

import { useEffect, useState } from "react"
import { Eye, MessageCircle, Calendar } from "lucide-react"

interface PostMetaProps {
  postSlug: string
  publishedAt?: string
  refreshTrigger?: number
}

export function PostMeta({ postSlug, publishedAt, refreshTrigger }: PostMetaProps) {
  const [viewCount, setViewCount] = useState<number | null>(null)
  const [commentCount, setCommentCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      // Fetch view count
      const viewResponse = await fetch(`/api/posts/${postSlug}/views`)
      const viewData = await viewResponse.json()
      if (viewData.success) {
        setViewCount(viewData.count)
      }

      // Fetch comment count
      const commentResponse = await fetch(`/api/posts/${postSlug}/comments`)
      const commentData = await commentResponse.json()
      if (commentData.success) {
        setCommentCount(commentData.count || 0)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [postSlug, refreshTrigger])

  if (loading) {
    return (
      <>
        <div className="flex items-center gap-2">
          <Eye size={16} />
          <span>-</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle size={16} />
          <span>-</span>
        </div>
        {publishedAt && (
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>
              {new Date(publishedAt).toLocaleDateString("vi-VN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Eye size={16} />
        <span>{viewCount?.toLocaleString() || 0}</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle size={16} />
        <span>{commentCount?.toLocaleString() || 0}</span>
      </div>
      {publishedAt && (
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>
            {new Date(publishedAt).toLocaleDateString("vi-VN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      )}
    </>
  )
}

