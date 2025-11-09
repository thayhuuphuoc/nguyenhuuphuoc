import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPostBySlug, getPosts, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"
import { portableTextComponents } from "@/lib/portable-text-components"
import { ViewTracker } from "@/components/view-tracker"
import { PostMetaWithRefresh } from "@/components/post-meta-wrapper"
import { CommentsSection } from "@/components/comments-section"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const post = await getPostBySlug(slug, isEnabled)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null

  return {
    title: `${post.title} - Nguyen Huu Phuoc`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const post = await getPostBySlug(slug, isEnabled)

  if (!post) {
    notFound()
  }

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null

  // Get related posts (same category)
  const allPosts = await getPosts(isEnabled)
  const relatedPosts = allPosts
    .filter(
      (p: any) =>
        p._id !== post._id &&
        p.categories?.some((cat: any) =>
          post.categories?.some((postCat: any) => postCat.slug?.current === cat.slug?.current),
        ),
    )
    .slice(0, 2)

  const postSlug = post.slug.current

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        {/* View Tracker - tracks views when page loads */}
        <ViewTracker postSlug={postSlug} />

        {/* Cover Image with Read Time */}
        {imageUrl && (
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-8 bg-muted">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            {post.readTime && (
              <div className="absolute top-4 right-4">
                <span className="bg-background/90 text-foreground px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime} phút đọc
                </span>
              </div>
            )}
          </div>
        )}

        {/* Post Header */}
        <div className="mb-8">
          {/* Author and Category */}
          <div className="flex items-center gap-4 mb-4">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
            )}
            {post.categories?.[0] && (
              <div>
                <span className="text-xs text-primary font-medium">{post.categories[0].title}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <PostMetaWithRefresh postSlug={postSlug} publishedAt={post.publishedAt} />
          </div>
        </div>

        {/* Article Body */}
        {post.body && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        {/* Comments Section */}
        <CommentsSection postSlug={postSlug} />

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-12 border-t">
            <h2 className="text-2xl font-bold mb-8">Bài viết liên quan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost: any) => {
                const relatedImageUrl = relatedPost.mainImage
                  ? urlFor(relatedPost.mainImage).width(600).height(300).url()
                  : null

                return (
                  <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`} className="group block">
                    <div className="h-48 rounded-lg overflow-hidden mb-4 relative bg-muted">
                      {relatedImageUrl ? (
                        <Image
                          src={relatedImageUrl}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          Không có hình ảnh
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    {relatedPost.readTime && (
                      <p className="text-sm text-muted-foreground">{relatedPost.readTime} phút đọc</p>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
