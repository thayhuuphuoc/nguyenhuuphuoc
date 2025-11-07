import Link from "next/link"
import Image from "next/image"
import { getAuthors, urlFor } from "@/lib/sanity"
import { draftMode } from "next/headers"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authors - BlogForge",
  description: "Meet the talented writers behind BlogForge",
}

export default async function AuthorsPage() {
  const { isEnabled } = await draftMode()
  const authors = await getAuthors(isEnabled)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Authors</h1>
        <p className="text-muted-foreground text-lg">Meet the talented writers behind BlogForge</p>
      </section>

      {/* Authors Grid */}
      {authors.length > 0 ? (
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author: any) => (
            <Link
              key={author._id}
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
                {author.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{author.bio}</p>
                )}
              </div>
            </Link>
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
