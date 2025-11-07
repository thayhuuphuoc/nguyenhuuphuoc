import Link from "next/link"
import Image from "next/image"
import { Eye, MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts, getCategories, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - BlogForge",
  description: "Discover the latest articles and insights from our community",
}

async function getData() {
  const { isEnabled } = await draftMode()
  const posts = await getPosts(isEnabled)
  const categories = await getCategories(isEnabled)
  return { posts, categories }
}

export default async function HomePage() {
  const { posts, categories } = await getData()
  const featuredPosts = posts.slice(0, 2)
  const recentPosts = posts.slice(2, 5)
  const gridPosts = posts.slice(5, 11)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to BlogForge
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover insights, stories, and expertise from our community of writers and creators
        </p>
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

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post: any) => (
              <FeaturedArticleCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Articles */}
      {recentPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post: any) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Explore Categories */}
      {categories.length > 0 && (
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
            <p className="text-muted-foreground">Choose a category to explore related content</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category: any) => (
              <Link
                key={category._id}
                href={`/blog?category=${category.slug.current}`}
                className="px-4 py-2 rounded-full text-sm bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>

          {/* Articles Grid */}
          {gridPosts.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {gridPosts.map((post: any) => (
                <GridArticleCard key={post._id} post={post} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Blogs
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="bg-muted rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
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
    </div>
  )
}

function FeaturedArticleCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(400).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group">
      <div className="relative h-72 rounded-lg overflow-hidden mb-4 bg-muted">
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
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.categories?.[0]?.title || "Uncategorized"}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{post.title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Eye size={14} />
          <span>Views</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={14} />
          <span>Comments</span>
        </div>
        {post.publishedAt && (
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

function ArticleCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(300).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group">
      <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-muted">
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
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.categories?.[0]?.title || "Uncategorized"}
          </span>
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
      )}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        {post.author && (
          <span className="flex items-center gap-2">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(24).height(24).url()}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </span>
        )}
        {post.readTime && <span>{post.readTime} min read</span>}
      </div>
    </Link>
  )
}

function GridArticleCard({ post }: { post: any }) {
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(600).height(300).url() : null

  return (
    <Link href={`/blog/${post.slug.current}`} className="group">
      <div className="relative h-64 rounded-lg overflow-hidden mb-4 bg-muted">
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
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.categories?.[0]?.title || "Uncategorized"}
          </span>
        </div>
        {post.readTime && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-xs font-semibold">
              {post.readTime} min
            </span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2">
          {post.categories?.[0]?.title || "Uncategorized"}
        </p>
        <h3 className="font-semibold text-base mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>Views</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            <span>Comments</span>
          </div>
          {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
        </div>
      </div>
    </Link>
  )
}
