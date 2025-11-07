"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

export default function BlogSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  useEffect(() => {
    const category = searchParams.get("category")
    const params = new URLSearchParams()
    
    if (category) {
      params.set("category", category)
    }
    
    if (search) {
      params.set("search", search)
    }

    const timeoutId = setTimeout(() => {
      if (search || category) {
        router.push(`/blog?${params.toString()}`)
      } else {
        router.push("/blog")
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search, router, searchParams])

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-12 pr-4 py-3"
      />
    </div>
  )
}

