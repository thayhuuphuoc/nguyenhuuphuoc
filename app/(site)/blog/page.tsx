import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts, getCategories, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"
import BlogSearch from "@/components/blog-search"

export const metadata: Metadata = {
  title: "Bài viết - Nguyen Huu Phuoc",
  description: "Duyệt tất cả các bài viết và khám phá những hiểu biết mới từ Nguyen Huu Phuoc",
}

async function getData(searchParams: { category?: string; search?: string }) {
  const { isEnabled } = await draftMode()
  const allPosts = await getPosts(isEnabled)
  const categories = await getCategories(isEnabled)

  let filteredPosts = allPosts

  // Filter by category
  if (searchParams.category) {
    filteredPosts = filteredPosts.filter((post: any) =>
      post.categories?.some((cat: any) => cat.slug?.current === searchParams.category),
    )
  }

  // Filter by search query
  if (searchParams.search) {
    const searchLower = searchParams.search.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post: any) =>
        post.title?.toLowerCase().includes(searchLower) ||
        post.excerpt?.toLowerCase().includes(searchLower),
    )
  }

  // Count posts per category
  const categoryCounts = categories.map((cat: any) => {
    const count = allPosts.filter((post: any) =>
      post.categories?.some((postCat: any) => postCat.slug?.current === cat.slug?.current)
    ).length
    return { ...cat, count }
  })

  return { posts: filteredPosts, categories: categoryCounts }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const params = await searchParams
  const { posts, categories } = await getData(params)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Bài viết nổi bật</h1>
        <p className="text-muted-foreground text-lg">Khám phá những hiểu biết, câu chuyện và kiến thức chuyên môn</p>
      </section>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <Suspense fallback={<div className="h-12 bg-muted rounded-md animate-pulse" />}>
          <BlogSearch />
        </Suspense>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !params.category
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            Tất cả ({posts.length})
          </Link>
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`/blog?category=${category.slug.current}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                params.category === category.slug.current
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {category.title} ({category.count})
            </Link>
          ))}
        </div>
      )}

      {/* Blog Grid */}
      <section>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Không tìm thấy bài viết nào phù hợp với tiêu chí của bạn.</p>
            <Link href="/blog">
              <Button variant="outline">Xóa bộ lọc</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

function BlogPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="relative h-56 rounded-lg overflow-hidden mb-4 bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Không có hình ảnh
          </div>
        )}
        {/* Read Time Badge */}
        {post.readTime && (
          <div className="absolute top-3 right-3">
            <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Clock size={12} />
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

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}

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
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
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
