// lib/queries.ts
import groq from 'groq'

export const getAllPostsQuery = groq`
 *[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  badge,
  publishedAt,
  mainImage {
    asset->{ url, metadata },
    alt
  },
  author->{
    name,
    slug,
    position,
    bio,
    image {
      asset->{ url }
    }
  },
  categories[]->{
    title,
    description
  },
  body
}
`

export const blogDetailQuery = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    publishedAt,
    views,
    body,
    mainImage {
      asset->{url}
    },
    author->{
      name,
      image {
        asset->{url}
      }
    },
    categories[]->{
      title,
      slug
    }
  }
`
