"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState("")
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize from URL params on mount
  useEffect(() => {
    const urlSearch = searchParams.get("search") || ""
    setSearch(urlSearch)
  }, []) // Only run on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Debounce the URL update
    timeoutRef.current = setTimeout(() => {
      const category = searchParams.get("category")
      const params = new URLSearchParams()
      
      if (category) {
        params.set("category", category)
      }
      
      if (value.trim()) {
        params.set("search", value.trim())
      }

      const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog"
      router.push(newUrl, { scroll: false })
    }, 500)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <label htmlFor="blog-search" className="sr-only">
        Tìm kiếm bài viết
      </label>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <Input
        id="blog-search"
        name="search"
        type="search"
        autoComplete="off"
        placeholder="Search articles..."
        value={search}
        onChange={handleChange}
        className="pl-12 pr-4 py-3"
        aria-label="Tìm kiếm bài viết"
      />
    </div>
  )
}
