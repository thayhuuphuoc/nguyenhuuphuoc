import Link from "next/link"
import Image from "next/image"
import { getAuthors, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"

// Helper function to extract text from PortableText
// Always returns a string, never an object
function extractTextFromPortableText(content: any): string {
  // Handle null/undefined
  if (!content) return ""
  
  // Handle string
  if (typeof content === "string") return content
  
  // Handle single block object
  if (content && typeof content === "object" && !Array.isArray(content)) {
    if (content._type === "block" && Array.isArray(content.children)) {
      const text = content.children
        .map((child: any) => (child && typeof child === "object" && child.text) ? String(child.text) : "")
        .join("")
        .trim()
      return text || ""
    }
    // If it's an object but not a block, return empty string
    return ""
  }
  
  // Handle array of blocks
  if (Array.isArray(content)) {
    try {
      const text = content
        .filter((block: any) => block && typeof block === "object" && block._type === "block")
        .map((block: any) => {
          if (Array.isArray(block.children)) {
            return block.children
              .map((child: any) => (child && typeof child === "object" && child.text) ? String(child.text) : "")
              .join("")
          }
          return ""
        })
        .join(" ")
        .trim()
      return text || ""
    } catch (error) {
      console.error("Error extracting text from PortableText:", error)
      return ""
    }
  }
  
  // Fallback: return empty string
  return ""
}

export const metadata: Metadata = {
  title: "Authors - Nguyen Huu Phuoc",
  description: "Meet the authors",
}

function AuthorCard({ author }: { author: any }) {
  // Safely extract bio text - always returns a string
  let bioText = ""
  if (author.bio) {
    try {
      const extracted = extractTextFromPortableText(author.bio)
      bioText = typeof extracted === "string" ? extracted : String(extracted || "")
    } catch (error) {
      console.error("Error processing author bio:", error)
      bioText = ""
    }
  }
  
  return (
    <Link
      href={`/author/${author.slug.current}`}
      className="group bg-card rounded-lg p-6 hover:bg-accent transition-colors border"
    >
      <div className="text-center">
        {author.image ? (
          <Image
            src={urlFor(author.image).width(128).height(128).url()}
            alt={author.name}
            width={128}
            height={128}
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-muted flex items-center justify-center">
            <span className="text-2xl">{author.name.charAt(0)}</span>
          </div>
        )}
        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
          {author.name}
        </h3>
        {author.role && (
          <p className="text-sm text-primary mb-3">{author.role}</p>
        )}
        {bioText && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {bioText}
          </p>
        )}
      </div>
    </Link>
  )
}

export default async function AuthorsPage() {
  const { isEnabled } = await draftMode()
  const authors = await getAuthors(isEnabled)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Authors</h1>
        <p className="text-muted-foreground text-lg">Meet the authors</p>
      </section>

      {/* Authors Grid */}
      {authors.length > 0 ? (
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author: any) => (
            <AuthorCard key={author._id} author={author} />
          ))}
        </section>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No authors found.</p>
        </div>
      )}
    </div>
  )
}
