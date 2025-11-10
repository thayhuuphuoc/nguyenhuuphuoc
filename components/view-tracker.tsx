"use client"

import { useEffect, useRef } from "react"

interface ViewTrackerProps {
  postSlug: string
}

export function ViewTracker({ postSlug }: ViewTrackerProps) {
  const hasTracked = useRef(false)

  useEffect(() => {
    // Track view only once per page load
    if (hasTracked.current) return

    const trackView = async () => {
      try {
        // Check if we've already tracked this view in this session
        const sessionKey = `viewed-${postSlug}`
        if (typeof window !== "undefined" && sessionStorage.getItem(sessionKey)) {
          return // Already tracked in this session
        }

        const response = await fetch(`/api/posts/${postSlug}/views`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          // Mark as tracked in this session
          if (typeof window !== "undefined") {
            sessionStorage.setItem(sessionKey, "true")
          }
          hasTracked.current = true
        } else {
          console.warn("Failed to track view, but continuing...")
        }
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error("Error tracking view:", error)
      }
    }

    trackView()
  }, [postSlug])

  return null
}

