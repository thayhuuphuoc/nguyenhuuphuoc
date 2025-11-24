import { sanity } from '@/lib/sanity'
import { getAllPostsQuery } from '@/lib/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await sanity.fetch(getAllPostsQuery)
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Sanity Fetch Error:", error)
    return NextResponse.json({ error: 'Failed to fetch posts from Sanity' }, { status: 500 })
  }
}
