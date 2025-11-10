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
      setLoading(true)
      console.log(`[PostMeta] Fetching stats for post: ${postSlug}`)
      
      // Fetch view count and comment count in parallel
      const [viewResponse, commentResponse] = await Promise.all([
        fetch(`/api/posts/${postSlug}/views`).catch(err => {
          console.error(`[PostMeta] Error fetching view count:`, err)
          return null
        }),
        fetch(`/api/posts/${postSlug}/comments`).catch(err => {
          console.error(`[PostMeta] Error fetching comment count:`, err)
          return null
        }),
      ])

      // Handle view count
      if (viewResponse && viewResponse.ok) {
        const viewData = await viewResponse.json()
        console.log(`[PostMeta] View count response:`, viewData)
        setViewCount(viewData.count ?? 0)
      } else {
        console.warn(`[PostMeta] View count fetch failed or returned null`)
        setViewCount(0)
      }

      // Handle comment count
      if (commentResponse && commentResponse.ok) {
        const commentData = await commentResponse.json()
        console.log(`[PostMeta] Comment count response:`, commentData)
        setCommentCount(commentData.count ?? 0)
      } else {
        console.warn(`[PostMeta] Comment count fetch failed or returned null`)
        setCommentCount(0)
      }
    } catch (error) {
      console.error("[PostMeta] Error fetching stats:", error)
      // Set default values on error
      setViewCount(0)
      setCommentCount(0)
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

