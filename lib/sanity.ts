import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = "2024-01-01"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export async function getPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      readTime,
      mainImage,
      author->{name, image},
      categories[]->{title}
    }
  `)
}

export async function getPostBySlug(slug: string) {
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
      author->{name, image, bio, role, email},
      categories[]->{title}
    }
  `,
    { slug },
  )
}

export async function getAuthors() {
  return await client.fetch(`
    *[_type == "author"] {
      _id,
      name,
      slug,
      image,
      bio,
      role,
      email
    }
  `)
}

export async function getAuthorBySlug(slug: string) {
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
}

export async function getCategories() {
  return await client.fetch(`
    *[_type == "category"] {
      _id,
      title,
      description
    }
  `)
}
