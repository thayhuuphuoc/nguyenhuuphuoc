"use client"

import { useState, useEffect } from "react"
import { PostMeta } from "@/components/post-meta"

interface PostMetaWrapperProps {
  postSlug: string
  publishedAt?: string
}

export function PostMetaWithRefresh({ postSlug, publishedAt }: PostMetaWrapperProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Listen for comment changes via custom event
    const handleCommentChange = () => {
      setRefreshTrigger((prev) => prev + 1)
    }

    window.addEventListener("comment-changed", handleCommentChange)

    return () => {
      window.removeEventListener("comment-changed", handleCommentChange)
    }
  }, [])

  return <PostMeta postSlug={postSlug} publishedAt={publishedAt} refreshTrigger={refreshTrigger} />
}

