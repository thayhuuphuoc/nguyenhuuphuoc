import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts, getCategories, getAuthors, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trang chủ - Nguyen Huu Phuoc",
  description: "Khám phá các bài viết và chia sẻ mới nhất từ Nguyen Huu Phuoc",
}

// Helper function to shuffle array randomly
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
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
  
  // Featured posts - 5 posts with special layout
  // Layout: Top row - 1 large + 1 small, Bottom row - 3 equal posts
  const featuredPosts = posts.slice(0, 5)
  const topLargePost = featuredPosts.slice(0, 1)
  const topSmallPost = featuredPosts.slice(1, 2)
  const bottomRowPosts = featuredPosts.slice(2, 5)
  
  // Random 6 posts for grid (excluding the 5 featured posts)
  const remainingPosts = posts.slice(5)
  const randomPosts = remainingPosts.length > 0 
    ? shuffleArray(remainingPosts).slice(0, 6)
    : []
  
  const displayAuthors = authors.slice(0, 3)

  // Count posts per category
  const categoryCounts = categories.map((cat: any) => {
    const count = posts.filter((post: any) =>
      post.categories?.some((postCat: any) => postCat.slug?.current === cat.slug?.current)
    ).length
    return { ...cat, count }
  })

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Featured Articles Section - 5 posts with special layout */}
      {featuredPosts.length > 0 && (
        <section className="mb-12 md:mb-16">
          {/* Top Row - 1 Large + 1 Small */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-6">
            {/* Large Post - Takes 2 columns */}
            <div className="md:col-span-2">
              {topLargePost.length > 0 && (
                <FeaturedPostCard post={topLargePost[0]} />
              )}
            </div>
            
            {/* Small Post - Takes 1 column */}
            <div className="md:col-span-1">
              {topSmallPost.length > 0 && (
                <SmallPostCard post={topSmallPost[0]} />
              )}
            </div>
          </div>

          {/* Bottom Row - 3 Equal Posts */}
          {bottomRowPosts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {bottomRowPosts.map((post: any) => (
                <RecentPostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Explore Categories Section */}
      <section className="mb-12 md:mb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Các chuyên mục bài viết</h1>
          <p className="text-muted-foreground text-lg">
            Chọn một chuyên mục để khám phá nội dung liên quan -- Tìm những gì bạn quan tâm
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Tất cả ({posts.length})
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
        )}

        {/* Posts Grid - Random 6 posts */}
        {randomPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {randomPosts.map((post: any) => (
              <CategoryPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : posts.length > 5 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts.slice(5, 11).map((post: any) => (
              <CategoryPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không còn bài viết để hiển thị.</p>
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

      {/* Explore Authors Section */}
      {displayAuthors.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Các tác giả</h2>
            <Link href="/author" className="text-primary hover:underline text-sm font-medium">
              Xem tất cả tác giả
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
      <section className="bg-muted rounded-lg p-8 md:p-12 mb-12 md:mb-16">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          {/* Text Content */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Đăng ký nhận bản tin</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Đăng ký nhận bản tin để là người đầu tiên xem các bài viết mới, ưu đãi độc quyền,
              khuyến mãi đặc biệt và tin tức mới nhất.
            </p>
          </div>

          {/* Email Form - Centered */}
          <form action="/api/subscribe" method="POST" className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              name="email"
              placeholder="Nhập địa chỉ email của bạn"
              required
              className="flex-1 px-4 py-3 rounded-md bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" className="whitespace-nowrap">
              Đăng ký
            </Button>
          </form>
        </div>
      </section>

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            Chưa có bài viết nào. Vui lòng quay lại sau để xem nội dung mới!
          </p>
          <Link href="/blog">
            <Button variant="outline">Xem bài viết</Button>
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
            Không có hình ảnh
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
                <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN", { month: "numeric", day: "numeric", year: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Recent Post Card - Medium (for bottom row, 3 equal posts)
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
            Không có hình ảnh
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
              <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN", { month: "numeric", day: "numeric", year: "numeric" })}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

// Small Post Card - For sidebar (matches website mẫu)
function SmallPostCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(400).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block h-full">
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            Không có hình ảnh
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
        {/* Title and Stats Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
          <h6 className="text-white font-bold text-sm md:text-base mb-2 line-clamp-2">
            {post.title}
          </h6>
          <div className="flex items-center gap-3 text-xs text-white/90">
            <div className="flex items-center gap-1">
              <Eye size={14} className="text-white/90" />
              <span>213</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} className="text-white/90" />
              <span>3</span>
            </div>
            {post.publishedAt && (
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-white/90" />
                <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN", { month: "numeric", day: "numeric", year: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
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
              <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN", { month: "numeric", day: "numeric", year: "numeric" })}</span>
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
