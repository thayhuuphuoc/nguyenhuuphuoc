import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = "2024-01-01"

if (!projectId) {
  console.warn("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Sanity queries will fail.")
}
if (!dataset) {
  console.warn("⚠️ NEXT_PUBLIC_SANITY_DATASET is not set. Using 'production' as default.")
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
})

// Preview client for draft content
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "drafts",
})

// Helper function to get the appropriate client
export const getClient = (preview?: boolean) => (preview ? previewClient : client)

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getPosts(preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readTime,
        mainImage,
        author->{name, image, slug},
        categories[]->{title, slug}
      }
    `)
  } catch (error: any) {
    console.error("Error fetching posts:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return []
  }
}

export async function getPostBySlug(slug: string, preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(
      `
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readTime,
        mainImage,
        body,
        author->{name, image, bio, role, email, slug},
        categories[]->{title, slug}
      }
    `,
      { slug },
    )
  } catch (error: any) {
    console.error("Error fetching post by slug:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return null
  }
}

export async function getAuthors(preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(`
      *[_type == "author"] | order(name asc) {
        _id,
        name,
        slug,
        image,
        bio,
        role,
        email
      }
    `)
  } catch (error: any) {
    console.error("Error fetching authors:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return []
  }
}

export async function getAuthorBySlug(slug: string, preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(
      `
      *[_type == "author" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        image,
        bio,
        role,
        email
      }
    `,
      { slug },
    )
  } catch (error: any) {
    console.error("Error fetching author by slug:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return null
  }
}

export async function getAuthorPosts(authorSlug: string, preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(
      `
      *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readTime,
        mainImage,
        categories[]->{title, slug}
      }
    `,
      { authorSlug },
    )
  } catch (error: any) {
    console.error("Error fetching author posts:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return []
  }
}

export async function getCategories(preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        description,
        slug
      }
    `)
  } catch (error: any) {
    console.error("Error fetching categories:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return []
  }
}

export async function getPostsByCategory(categorySlug: string, preview = false) {
  try {
    const client = getClient(preview)
    return await client.fetch(
      `
      *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        readTime,
        mainImage,
        author->{name, image, slug},
        categories[]->{title, slug}
      }
    `,
      { categorySlug },
    )
  } catch (error: any) {
    console.error("Error fetching posts by category:", error?.message || error)
    if (error?.statusCode === 404 && error?.message?.includes("Dataset not found")) {
      console.error(`❌ Dataset "${dataset}" not found in Sanity project. Please create it or update NEXT_PUBLIC_SANITY_DATASET environment variable.`)
    }
    return []
  }
}
