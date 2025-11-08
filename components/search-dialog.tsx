"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, User, Folder } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  posts?: any[]
  authors?: any[]
  categories?: any[]
}

export function SearchDialog({ open, onOpenChange, posts = [], authors = [], categories = [] }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Filter results based on search query
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        posts: posts.slice(0, 5),
        authors: authors.slice(0, 3),
        categories: categories.slice(0, 3),
      }
    }

    const query = searchQuery.toLowerCase()
    return {
      posts: posts.filter((post: any) =>
        post.title?.toLowerCase().includes(query) || post.excerpt?.toLowerCase().includes(query)
      ).slice(0, 5),
      authors: authors.filter((author: any) =>
        author.name?.toLowerCase().includes(query)
      ).slice(0, 3),
      categories: categories.filter((category: any) =>
        category.title?.toLowerCase().includes(query)
      ).slice(0, 3),
    }
  }, [searchQuery, posts, authors, categories])

  const handleSelect = (type: string, slug: string) => {
    onOpenChange(false)
    setSearchQuery("")
    if (type === "post") {
      router.push(`/blog/${slug}`)
    } else if (type === "author") {
      router.push(`/author/${slug}`)
    } else if (type === "category") {
      router.push(`/blog?category=${slug}`)
    }
  }

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("")
    }
  }, [open])

  const hasResults = filteredResults.posts.length > 0 || filteredResults.authors.length > 0 || filteredResults.categories.length > 0

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search">
      <CommandInput
        placeholder="Search posts, authors, categories..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        {!hasResults && searchQuery && <CommandEmpty>No results found.</CommandEmpty>}
        {!searchQuery && (
          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm text-muted-foreground">Start typing to search...</p>
            </div>
          </CommandEmpty>
        )}
        
        {filteredResults.posts.length > 0 && (
          <CommandGroup heading="Posts">
            {filteredResults.posts.map((post: any) => (
              <CommandItem
                key={post._id}
                value={`post-${post.title}`}
                onSelect={() => handleSelect("post", post.slug.current)}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span className="truncate">{post.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredResults.authors.length > 0 && (
          <CommandGroup heading="Authors">
            {filteredResults.authors.map((author: any) => (
              <CommandItem
                key={author._id}
                value={`author-${author.name}`}
                onSelect={() => handleSelect("author", author.slug.current)}
              >
                <User className="mr-2 h-4 w-4" />
                <span className="truncate">{author.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredResults.categories.length > 0 && (
          <CommandGroup heading="Categories">
            {filteredResults.categories.map((category: any) => (
              <CommandItem
                key={category._id}
                value={`category-${category.title}`}
                onSelect={() => handleSelect("category", category.slug.current)}
              >
                <Folder className="mr-2 h-4 w-4" />
                <span className="truncate">{category.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
