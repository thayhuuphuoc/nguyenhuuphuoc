import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { Calendar, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getAuthorBySlug, getAuthorPosts, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"
import { portableTextComponents } from "@/lib/portable-text-components"

// Helper function to extract text from PortableText
function extractTextFromPortableText(content: any): string {
  if (!content) return ""
  if (typeof content === "string") return content
  if (!Array.isArray(content)) {
    // If it's an object (single block), try to extract text
    if (content && typeof content === "object" && content._type === "block" && content.children) {
      return content.children.map((child: any) => child?.text || "").join("").trim()
    }
    return ""
  }
  try {
    return content
      .map((block: any) => {
        if (block && block._type === "block" && Array.isArray(block.children)) {
          return block.children.map((child: any) => child?.text || "").join("")
        }
        return ""
      })
      .join(" ")
      .trim()
  } catch (error) {
    console.error("Error extracting text from PortableText:", error)
    return ""
  }
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const author = await getAuthorBySlug(slug, isEnabled)

  if (!author) {
    return {
      title: "Author Not Found",
    }
  }

  const bioText = author.bio ? extractTextFromPortableText(author.bio) : ""
  return {
    title: `${author.name} - Nguyen Huu Phuoc`,
    description: bioText || `Articles by ${author.name}`,
  }
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const author = await getAuthorBySlug(slug, isEnabled)

  if (!author) {
    notFound()
  }

  const posts = await getAuthorPosts(slug, isEnabled)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Author Profile Header */}
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-8 md:p-12 mb-12 border">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {author.image ? (
            <Image
              src={urlFor(author.image).width(192).height(192).url()}
              alt={author.name}
              width={192}
              height={192}
              className="rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <span className="text-4xl">{author.name.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
            {author.role && <p className="text-primary text-lg mb-3">{author.role}</p>}
            {author.bio && (
              <div className="text-muted-foreground mb-6">
                {Array.isArray(author.bio) ? (
                  <PortableText value={author.bio} components={portableTextComponents} />
                ) : (
                  <p>{author.bio}</p>
                )}
              </div>
            )}

            {/* Author Stats */}
            <div className="flex gap-8 mb-6">
              <div>
                <p className="text-2xl font-bold">{posts.length}</p>
                <p className="text-sm text-muted-foreground">Articles Published</p>
              </div>
            </div>

            {/* Contact */}
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="text-primary hover:underline text-sm"
              >
                Contact {author.name.split(" ")[0]}
              </a>
            )}
          </div>

          {/* Follow Button */}
          <Button className="bg-primary hover:bg-primary/90">Follow Author</Button>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post: any) => {
              const imageUrl = post.mainImage
                ? urlFor(post.mainImage).width(600).height(300).url()
                : null

              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group bg-card rounded-lg p-6 hover:bg-accent transition-colors border"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      {post.categories?.[0] && (
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                          {post.categories[0].title}
                        </span>
                      )}
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>

                  {imageUrl && (
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-muted">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  )}

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    {post.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Eye size={14} />
                      <span>Views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle size={14} />
                      <span>Comments</span>
                    </div>
                    {post.readTime && <span>{post.readTime} min read</span>}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found for this author.</p>
          </div>
        )}

        {posts.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}
