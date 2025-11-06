"use client"

import { useState } from "react"
import { Eye, MessageCircle, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlogForgePage() {
  const [isDark, setIsDark] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Technology", "Health", "Culture", "Knowledge", "Travel", "Lifestyle"]

  const featuredArticles = [
    {
      id: 1,
      title: "Top Articles to Read on Technology",
      category: "Technology",
      image: "/technology-network-abstract.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
    },
    {
      id: 2,
      title: "Technical blogging - A skill with many benefits",
      category: "Technology",
      image: "/purple-gradient-abstract.png",
      views: 211,
      comments: 3,
      date: "6/9/2025",
    },
  ]

  const smallArticles = [
    {
      id: 3,
      title: "The Top 25 Health & Wellness Blogs You Should Follow in 2022",
      category: "Health",
      image: "/health-wellness-orange.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
    },
    {
      id: 4,
      title: "The Best Travel Blogs of 2020 Of Whiskey and Words",
      category: "Culture",
      image: "/travel-culture-dark.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
    },
    {
      id: 5,
      title: "I wish I knew this before creating a travel blog on my own",
      category: "Technology",
      image: "/technology-dark.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
    },
  ]

  const gridArticles = [
    {
      id: 6,
      title: "Top Articles to Read on Technology",
      category: "Technology",
      image: "/technology-network.png",
      views: 211,
      comments: 3,
      date: "6/9/2025",
      readTime: "2 Min Read",
    },
    {
      id: 7,
      title: "Technical blogging - A skill with many benefits",
      category: "Technology",
      image: "/purple-gradient-modern.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
      readTime: "2 Min Read",
    },
    {
      id: 8,
      title: "The Top 25 Health & Wellness Blogs You Should Follow in 2022",
      category: "Health",
      image: "/health-wellness.png",
      views: 211,
      comments: 3,
      date: "6/9/2025",
      readTime: "2 Min Read",
    },
    {
      id: 9,
      title: "The Best Travel Blogs of 2020 Of Whiskey and Words",
      category: "Culture",
      image: "/culture-travel-pink.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
      readTime: "2 Min Read",
    },
    {
      id: 10,
      title: "I wish I knew this before creating a travel blog on my own",
      category: "Knowledge",
      image: "/knowledge-dark-abstract.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
      readTime: "2 Min Read",
    },
    {
      id: 11,
      title: "How To Start A Travel Blog - An Easy Step By Step Guide",
      category: "Travel",
      image: "/travel-guide-colorful-gradient.jpg",
      views: 211,
      comments: 3,
      date: "6/9/2025",
      readTime: "2 Min Read",
    },
  ]

  const authors = [
    {
      name: "Manpreet Singh Minhas",
      role: "Staff Writer",
      bio: "UI/UX Research Blogger sharing insights on technical blogging.",
      avatar: "/avatar-person.png",
    },
    {
      name: "Sanjida windx",
      role: "Guest Author",
      bio: "Health writer focusing on wellness and lifestyle improvements.",
      avatar: "/avatar-person.png",
    },
    {
      name: "Alice Ben",
      role: "Co-Author",
      bio: "Travel enthusiast sharing tips and stories about various tourist destinations.",
      avatar: "/avatar-person.png",
    },
  ]

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <header className="border-b border-gray-800 bg-gray-950 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                <span className="font-bold text-sm">BLOG</span>
                <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold">FORGE</span>
              </Link>
              <nav className="hidden md:flex gap-6 text-sm">
                <a href="/" className="text-blue-400 hover:text-blue-300">
                  Home
                </a>
                <a href="/blog" className="text-gray-400 hover:text-gray-300">
                  Blogs
                </a>
                <a href="/author" className="text-gray-400 hover:text-gray-300">
                  Authors
                </a>
                <a href="/contact-us" className="text-gray-400 hover:text-gray-300">
                  Contact
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsDark(!isDark)} className="text-gray-400 hover:text-white">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="text-gray-400 hover:text-white">
                <Search size={20} />
              </button>
              <Link href="/auth/signin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white hover:bg-gray-900 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Featured Articles */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </section>

        {/* Small Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {smallArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Explore Categories */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
            <p className="text-gray-400">Choose a category to explore related content - Find what interests you</p>
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-sm transition ${
                  selectedCategory === cat ? "bg-gray-900 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat} ({Math.floor(Math.random() * 10)})
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {gridArticles.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700" />
                  </div>
                  <span className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {article.readTime}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-2">{article.category}</p>
                  <h3 className="text-white font-semibold text-sm mb-3 group-hover:text-blue-400 transition">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{article.comments}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-900 bg-transparent">
              View All Blogs
            </Button>
          </div>
        </section>

        {/* Explore Authors */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Explore Authors</h2>
            <Link href="/author" className="text-blue-400 hover:text-blue-300 text-sm">
              View all Authors
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {authors.map((author) => (
              <div key={author.name} className="text-center">
                <img
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-1">{author.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{author.role}</p>
                <p className="text-gray-400 text-sm">{author.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
            <p className="text-gray-400">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, special
              promotions, and the latest news.
            </p>
          </div>

          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Subscribe</Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">
                © BlogForge - All Rights Reserved. Created by GetNext/templates.com
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>f</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>in</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span>𝕏</span>
                </a>
              </div>
            </div>
            <div className="flex gap-4 mt-4 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </a>
              <a href="/contact-us" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function ArticleCard({ article, featured = false }) {
  return (
    <div className={`group cursor-pointer rounded-lg overflow-hidden ${featured ? "md:col-span-1" : ""}`}>
      <div
        className={`relative ${featured ? "h-72" : "h-48"} bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-4`}
      >
        <img
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700" />
        </div>
        <span className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {article.category}
        </span>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{article.title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-4 text-gray-400 text-xs">
        <div className="flex items-center gap-1">
          <Eye size={14} />
          <span>{article.views}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle size={14} />
          <span>{article.comments}</span>
        </div>
        <span>{article.date}</span>
      </div>
    </div>
  )
}
