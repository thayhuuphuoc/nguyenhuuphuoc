import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Eye, MessageCircle, Calendar, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPostBySlug, getPosts, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"
import { portableTextComponents } from "@/lib/portable-text-components"

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
    title: post.title,
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

  return (
    <article className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-muted-foreground">
        <Link href="/blog" className="hover:text-foreground transition-colors">
          Blog
        </Link>
        {post.categories?.[0] && (
          <>
            {" / "}
            <Link
              href={`/blog?category=${post.categories[0].slug?.current}`}
              className="hover:text-foreground transition-colors"
            >
              {post.categories[0].title}
            </Link>
          </>
        )}
        {" / "}
        <span>{post.title}</span>
      </div>

      {/* Title and Meta */}
      <div className="mb-8">
        {post.categories?.[0] && (
          <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
            {post.categories[0].title}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

        {/* Author Info */}
        {post.author && (
          <div className="flex items-center gap-4 py-6 border-t border-b">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(48).height(48).url()}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div className="flex-1">
              <p className="font-semibold">{post.author.name}</p>
              {post.author.role && <p className="text-sm text-muted-foreground">{post.author.role}</p>}
            </div>
            {post.publishedAt && (
              <div className="text-sm text-muted-foreground">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>Views</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} />
            <span>Comments</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-2">
              <span>{post.readTime} min read</span>
            </div>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden h-96 relative">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Article Body */}
      {post.body && (
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      )}

      {/* Share and Actions */}
      <div className="flex items-center gap-4 py-6 border-t">
        <Button variant="outline" size="sm">
          <Heart className="mr-2 h-4 w-4" />
          Like
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost: any) => {
              const relatedImageUrl = relatedPost.mainImage
                ? urlFor(relatedPost.mainImage).width(600).height(300).url()
                : null

              return (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`} className="group">
                  <div className="h-48 rounded-lg overflow-hidden mb-4 relative bg-muted">
                    {relatedImageUrl ? (
                      <Image
                        src={relatedImageUrl}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors mb-2">
                    {relatedPost.title}
                  </h3>
                  {relatedPost.readTime && (
                    <p className="text-sm text-muted-foreground">{relatedPost.readTime} min read</p>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}
