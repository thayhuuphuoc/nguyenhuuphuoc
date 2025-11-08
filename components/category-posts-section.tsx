"use client"

import { useMemo, useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"

interface CategoryPostsSectionProps {
  posts: any[]
  categories: any[]
}

export function CategoryPostsSection({
  posts,
  categories,
}: CategoryPostsSectionProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selectedCategory = searchParams.get("category") || undefined

  // Filter and sort posts by selected category
  const filteredPosts = useMemo(() => {
    // Posts are already sorted by publishedAt desc from Sanity
    // So we can directly use them without re-sorting
    
    if (!selectedCategory) {
      // Tab "Tất cả" - show 6 latest posts from all posts
      // Posts are already sorted by publishedAt desc, so just take first 6
      return posts.slice(0, 6)
    } else {
      // Filter posts by selected category, then sort and take first 6
      const categoryPosts = posts.filter((post: any) =>
        post.categories?.some((cat: any) => cat.slug?.current === selectedCategory),
      )
      
      // Sort by publishedAt (newest first) and take first 6
      return categoryPosts
        .sort((a: any, b: any) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
          return dateB - dateA // Descending order (newest first)
        })
        .slice(0, 6)
    }
  }, [posts, selectedCategory])

  // Handle category filter change
  const handleCategoryChange = useCallback(
    (categorySlug: string | null) => {
      const params = new URLSearchParams()
      
      if (categorySlug) {
        params.set("category", categorySlug)
      }

      // Update URL without scrolling to prevent page jump
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.push(newUrl, { scroll: false })
    },
    [pathname, router],
  )

  return (
    <section className="mb-12 md:mb-16" id="categories-section">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Các chuyên mục bài viết</h1>
        <p className="text-muted-foreground text-lg">
          Chọn một chuyên mục để khám phá nội dung liên quan -- Tìm những gì bạn quan tâm
        </p>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            type="button"
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            Tất cả ({posts.length})
          </button>
          {categories.map((category: any) => (
            <button
              key={category._id}
              type="button"
              onClick={() => handleCategoryChange(category.slug.current)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.slug.current
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {category.title} ({category.count})
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPosts.map((post: any) => (
            <CategoryPostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            {selectedCategory
              ? "Không tìm thấy bài viết nào trong chuyên mục này."
              : "Không còn bài viết để hiển thị."}
          </p>
          {selectedCategory && (
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full">
                Xem tất cả bài viết
              </Button>
            </Link>
          )}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Link href="/blog">
          <Button variant="outline" size="lg" className="rounded-full">
            Xem tất cả bài viết
          </Button>
        </Link>
      </div>
    </section>
  )
}

// Category Post Card - For Grid (matches website mẫu exactly)
function CategoryPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="relative h-56 rounded-lg overflow-hidden bg-muted mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Không có hình ảnh
          </div>
        )}
        {/* Read Time Badge - Top Right */}
        {post.readTime && (
          <div className="absolute top-3 right-3">
            <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-semibold">
              {post.readTime} phút đọc
            </span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-2">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(24).height(24).url()}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-sm text-muted-foreground">{post.author.name}</span>
          </div>
        )}
        {/* Category */}
        {post.categories?.[0] && (
          <div>
            <span className="text-xs text-primary font-medium">{post.categories[0].title}</span>
          </div>
        )}
        {/* Title */}
        <h6 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h6>
        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>213</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>3</span>
            </div>
          </div>
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

