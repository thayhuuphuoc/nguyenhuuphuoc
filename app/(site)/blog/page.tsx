import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts, getCategories, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"
import BlogSearch from "@/components/blog-search"

export const metadata: Metadata = {
  title: "Blog - BlogForge",
  description: "Browse all our articles and discover new insights",
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

  return { posts: filteredPosts, categories }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const { posts, categories } = await getData(searchParams)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Articles</h1>
        <p className="text-muted-foreground text-lg">Discover insights, stories, and expertise</p>
      </section>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <Suspense fallback={<div className="h-12 bg-muted rounded-md animate-pulse" />}>
          <BlogSearch />
        </Suspense>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm transition ${
              !searchParams.category
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            All
          </Link>
          {categories.map((category: any) => (
            <Link
              key={category._id}
              href={`/blog?category=${category.slug.current}`}
              className={`px-4 py-2 rounded-full text-sm transition ${
                searchParams.category === category.slug.current
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category.title}
            </Link>
          ))}
        </div>
      )}

      {/* Blog Grid */}
      <section>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
            <Link href="/blog" className="mt-4 inline-block">
              <Button variant="outline">Clear Filters</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

function BlogPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(300).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group">
      <div className="h-64 rounded-lg overflow-hidden mb-4 relative bg-muted">
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
            No Image
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.categories?.[0]?.title || "Uncategorized"}
          </span>
        </div>
      </div>

      <div className="space-y-3">
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

        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>Views</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>Comments</span>
            </div>
          </div>
          {post.readTime && <span>{post.readTime} min</span>}
        </div>

        {post.publishedAt && (
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
