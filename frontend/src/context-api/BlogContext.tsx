'use client'

import FullscreeenLoader from '@/app/components/shared/fullscreen-loader'
import Loader from '@/app/components/shared/loader'
import React, { createContext, useContext, useEffect, useState } from 'react'

type BlogPost = {
  _id: string
  title: string
  slug: { current: string }
  badge?: string
  publishedAt: string
  mainImage?: any
  author?: any
  categories?: any[]
  body?: any
}

interface BlogContextProps {
  posts: BlogPost[]
  loading: boolean
  error: string | null
}

const BlogContext = createContext<BlogContextProps | undefined>(undefined)

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError('Failed to load blog posts')
        console.error('Error fetching from /api/posts', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <FullscreeenLoader />
  }

  return (
    <BlogContext.Provider value={{ posts, loading, error }}>
      {children}
    </BlogContext.Provider>
  )
}

export const useBlogContext = () => {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider')
  }
  return context
}
