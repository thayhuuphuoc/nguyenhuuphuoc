import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts, getCategories, getAuthors, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Nguyen Huu Phuoc",
  description: "Discover the latest articles and insights from Nguyen Huu Phuoc",
}

async function getData() {
  const { isEnabled } = await draftMode()
  const posts = await getPosts(isEnabled)
  const categories = await getCategories(isEnabled)
  const authors = await getAuthors(isEnabled)
  return { posts, categories, authors }
}

export default async function HomePage() {
  const { posts, categories, authors } = await getData()
  const featuredPosts = posts.slice(0, 2)
  const recentPosts = posts.slice(2, 5)
  const gridPosts = posts.slice(5, 11)
  const displayAuthors = authors.slice(0, 3)

  // Count posts per category
  const categoryCounts = categories.map((cat: any) => {
    const count = posts.filter((post: any) =>
      post.categories?.some((postCat: any) => postCat.slug?.current === cat.slug?.current)
    ).length
    return { ...cat, count }
  })

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Featured Articles - 2 Large Cards (No Hero Section) */}
      {featuredPosts.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {featuredPosts.map((post: any) => (
              <FeaturedPostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles - 3 Medium Cards */}
      {recentPosts.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post: any) => (
              <RecentPostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Explore Categories Section */}
      {categories.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore Categories</h1>
            <p className="text-muted-foreground text-lg">
              Choose a category to explore related content -- Find what interests you
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              All ({posts.length})
            </Link>
            {categoryCounts.map((category: any) => (
              <Link
                key={category._id}
                href={`/blog?category=${category.slug.current}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.title} ({category.count})
              </Link>
            ))}
          </div>

          {/* Posts Grid */}
          {gridPosts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {gridPosts.map((post: any) => (
                <CategoryPostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="rounded-full">
                View All Blogs
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Explore Authors Section */}
      {displayAuthors.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Explore Authors</h2>
            <Link href="/author" className="text-primary hover:underline text-sm font-medium">
              View all Authors
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {displayAuthors.map((author: any) => (
              <AuthorCard key={author._id} author={author} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-muted rounded-lg p-8 md:p-12 text-center mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers,
          special promotions, and the latest news.
        </p>
        <form action="/api/subscribe" method="POST" className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="flex-1 px-4 py-2 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            No posts available yet. Check back soon for new content!
          </p>
          <Link href="/blog">
            <Button variant="outline">View Blog</Button>
          </Link>
        </section>
      )}
    </div>
  )
}

// Featured Post Card - Large (matches website mẫu)
function FeaturedPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(500).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        {/* Author Overlay - Top Left */}
        {post.author && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(24).height(24).url()}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
        )}
        {/* Category Badge - Top Right */}
        {post.categories?.[0] && (
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {post.categories[0].title}
            </span>
          </div>
        )}
        {/* Title and Stats Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
          <h4 className="text-white font-bold text-xl md:text-2xl mb-3 line-clamp-2">
            {post.title}
          </h4>
          <div className="flex items-center gap-4 text-sm text-white/90">
            <div className="flex items-center gap-1">
              <Eye size={16} className="text-white/90" />
              <span>213</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} className="text-white/90" />
              <span>3</span>
            </div>
            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar size={16} className="text-white/90" />
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Recent Post Card - Medium (matches website mẫu)
function RecentPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="relative h-64 rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        {/* Author Overlay - Top Left */}
        {post.author && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(20).height(20).url()}
                alt={post.author.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            )}
            <span className="text-xs font-medium">{post.author.name}</span>
          </div>
        )}
        {/* Category Badge - Top Right */}
        {post.categories?.[0] && (
          <div className="absolute top-3 right-3">
            <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
              {post.categories[0].title}
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <h6 className="font-semibold text-base md:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h6>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>213</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            <span>3</span>
          </div>
          {post.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Category Post Card - For Grid (matches website mẫu)
function CategoryPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <div className="relative h-56 rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
        {/* Read Time Badge - Top Right */}
        {post.readTime && (
          <div className="absolute top-3 right-3">
            <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-semibold">
              {post.readTime} min Read
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
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
              <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" })}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Author Card (matches website mẫu)
function AuthorCard({ author }: { author: any }) {
  // Helper to extract text from PortableText
  function extractText(content: any): string {
    if (!content) return ""
    if (typeof content === "string") return content
    if (Array.isArray(content)) {
      return content
        .map((block: any) => {
          if (block?._type === "block" && Array.isArray(block.children)) {
            return block.children.map((child: any) => child?.text || "").join("")
          }
          return ""
        })
        .join(" ")
        .trim()
    }
    return ""
  }

  const bioText = extractText(author.bio)

  return (
    <div className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors">
      <Link href={`/author/${author.slug.current}`} className="flex-shrink-0">
        {author.image ? (
          <Image
            src={urlFor(author.image).width(80).height(80).url()}
            alt={author.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl font-bold">{author.name.charAt(0)}</span>
          </div>
        )}
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/author/${author.slug.current}`}>
          <h6 className="font-semibold text-base mb-1 hover:text-primary transition-colors">
            {author.name}
          </h6>
        </Link>
        {author.role && (
          <p className="text-sm text-muted-foreground mb-2">{author.role}</p>
        )}
        {bioText && (
          <p className="text-sm text-muted-foreground line-clamp-2">{bioText}</p>
        )}
      </div>
    </div>
  )
}
