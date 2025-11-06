"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, MessageCircle, Search } from "lucide-react"

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "Technology", "Health", "Culture", "Knowledge", "Travel", "Lifestyle"]

  const blogPosts = [
    {
      id: 1,
      slug: "top-articles-technology",
      title: "Top Articles to Read on Technology",
      category: "Technology",
      image: "/technology-network-abstract.jpg",
      excerpt:
        "Explore the most comprehensive collection of technology articles covering the latest trends and innovations.",
      views: 1205,
      comments: 23,
      date: "2025-06-09",
      readTime: "8 min",
      author: {
        name: "Manpreet Singh Minhas",
        avatar: "/avatar-person.png",
      },
    },
    {
      id: 2,
      slug: "technical-blogging-skill",
      title: "Technical blogging - A skill with many benefits",
      category: "Technology",
      image: "/purple-gradient-abstract.png",
      excerpt: "Learn why technical blogging is an essential skill for developers and how to get started today.",
      views: 845,
      comments: 15,
      date: "2025-06-08",
      readTime: "6 min",
      author: {
        name: "Sanjida windx",
        avatar: "/avatar-person.png",
      },
    },
    {
      id: 3,
      slug: "top-25-health-wellness-blogs",
      title: "The Top 25 Health & Wellness Blogs You Should Follow in 2022",
      category: "Health",
      image: "/health-wellness-orange.jpg",
      excerpt: "Discover the most influential health and wellness blogs that are changing how people approach fitness.",
      views: 2103,
      comments: 42,
      date: "2025-06-07",
      readTime: "10 min",
      author: {
        name: "Alice Ben",
        avatar: "/avatar-person.png",
      },
    },
    {
      id: 4,
      slug: "best-travel-blogs-2020",
      title: "The Best Travel Blogs of 2020 Of Whiskey and Words",
      category: "Travel",
      image: "/travel-culture-dark.jpg",
      excerpt: "A comprehensive guide to the best travel blogs featuring authentic stories and travel tips.",
      views: 1567,
      comments: 34,
      date: "2025-06-06",
      readTime: "7 min",
      author: {
        name: "Manpreet Singh Minhas",
        avatar: "/avatar-person.png",
      },
    },
    {
      id: 5,
      slug: "travel-blog-mistakes",
      title: "I wish I knew this before creating a travel blog on my own",
      category: "Travel",
      image: "/technology-dark.jpg",
      excerpt: "Avoid common mistakes when starting a travel blog. Learn from expert tips and industry insights.",
      views: 923,
      comments: 18,
      date: "2025-06-05",
      readTime: "5 min",
      author: {
        name: "Alice Ben",
        avatar: "/avatar-person.png",
      },
    },
    {
      id: 6,
      slug: "how-to-start-travel-blog",
      title: "How To Start A Travel Blog - An Easy Step By Step Guide",
      category: "Travel",
      image: "/travel-guide-colorful-gradient.jpg",
      excerpt: "A step-by-step guide to starting your own successful travel blog from scratch.",
      views: 1834,
      comments: 56,
      date: "2025-06-04",
      readTime: "9 min",
      author: {
        name: "Sanjida windx",
        avatar: "/avatar-person.png",
      },
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="font-bold text-sm">BLOG</span>
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold">FORGE</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-gray-300">
              Home
            </Link>
            <Link href="/blog" className="text-blue-400">
              Blogs
            </Link>
            <Link href="/author" className="text-gray-400 hover:text-gray-300">
              Authors
            </Link>
            <Link href="/contact-us" className="text-gray-400 hover:text-gray-300">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Search size={20} className="text-gray-400" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Articles</h1>
          <p className="text-gray-400 text-lg">Discover insights, stories, and expertise from our community</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="h-64 rounded-lg overflow-hidden mb-4 relative">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-400">{post.author.name}</span>
                  </div>

                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition">{post.title}</h3>

                  <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={14} />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="text-xs text-gray-500 pt-2">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </section>
    </div>
  )
}
