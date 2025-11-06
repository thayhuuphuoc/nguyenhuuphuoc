"use client"

import Link from "next/link"
import { Eye, MessageCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample author data with their articles
const authorData: Record<string, any> = {
  "manpreet-singh-minhas": {
    id: 1,
    name: "Manpreet Singh Minhas",
    role: "Staff Writer",
    bio: "UI/UX Research Blogger sharing insights on technical blogging and user experience design.",
    avatar: "/avatar-person.png",
    email: "manpreet@blogforge.com",
    articles: 24,
    followers: 1205,
    joinDate: "January 2023",
    expertise: ["UI/UX", "Technical Writing", "Design Systems"],
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
    recentArticles: [
      {
        id: 1,
        slug: "top-articles-technology",
        title: "Top Articles to Read on Technology",
        category: "Technology",
        date: "2025-06-09",
        views: 1205,
        comments: 23,
      },
      {
        id: 2,
        slug: "technical-blogging-skill",
        title: "Technical blogging - A skill with many benefits",
        category: "Technology",
        date: "2025-06-08",
        views: 845,
        comments: 15,
      },
      {
        id: 3,
        slug: "best-travel-blogs-2020",
        title: "The Best Travel Blogs of 2020 Of Whiskey and Words",
        category: "Travel",
        date: "2025-06-06",
        views: 1567,
        comments: 34,
      },
    ],
  },
  "sanjida-windx": {
    id: 2,
    name: "Sanjida windx",
    role: "Guest Author",
    bio: "Health writer focusing on wellness and lifestyle improvements through science-backed tips.",
    avatar: "/avatar-person.png",
    email: "sanjida@blogforge.com",
    articles: 18,
    followers: 892,
    joinDate: "March 2023",
    expertise: ["Health", "Wellness", "Lifestyle"],
    socialLinks: {
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
    recentArticles: [
      {
        id: 1,
        slug: "top-25-health-wellness-blogs",
        title: "The Top 25 Health & Wellness Blogs You Should Follow in 2022",
        category: "Health",
        date: "2025-06-07",
        views: 2103,
        comments: 42,
      },
      {
        id: 2,
        slug: "how-to-start-travel-blog",
        title: "How To Start A Travel Blog - An Easy Step By Step Guide",
        category: "Travel",
        date: "2025-06-04",
        views: 1834,
        comments: 56,
      },
    ],
  },
  "alice-ben": {
    id: 3,
    name: "Alice Ben",
    role: "Co-Author",
    bio: "Travel enthusiast sharing tips and stories about various tourist destinations worldwide.",
    avatar: "/avatar-person.png",
    email: "alice@blogforge.com",
    articles: 32,
    followers: 1543,
    joinDate: "February 2023",
    expertise: ["Travel", "Culture", "Adventure"],
    socialLinks: {
      twitter: "#",
      youtube: "#",
      instagram: "#",
    },
    recentArticles: [
      {
        id: 1,
        slug: "travel-blog-mistakes",
        title: "I wish I knew this before creating a travel blog on my own",
        category: "Travel",
        date: "2025-06-05",
        views: 923,
        comments: 18,
      },
    ],
  },
}

export default function AuthorProfilePage({ params }: { params: { slug: string } }) {
  const author = authorData[params.slug]

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Author not found</h1>
          <p className="text-gray-400 mb-8">The author you're looking for doesn't exist.</p>
          <Link href="/author">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Authors</Button>
          </Link>
        </div>
      </div>
    )
  }

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
            <Link href="/blog" className="text-gray-400 hover:text-gray-300">
              Blogs
            </Link>
            <Link href="/author" className="text-blue-400">
              Authors
            </Link>
            <Link href="/contact-us" className="text-gray-400 hover:text-gray-300">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Author Profile Header */}
      <section className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img src={author.avatar || "/placeholder.svg"} alt={author.name} className="w-24 h-24 rounded-full" />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{author.name}</h1>
              <p className="text-blue-400 text-lg mb-3">{author.role}</p>
              <p className="text-gray-400 mb-4">{author.bio}</p>

              {/* Author Stats */}
              <div className="flex gap-8 mb-6">
                <div>
                  <p className="text-2xl font-bold">{author.articles}</p>
                  <p className="text-sm text-gray-400">Articles Published</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{author.followers}</p>
                  <p className="text-sm text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">{author.joinDate}</p>
                  <p className="text-sm text-gray-400">Member Since</p>
                </div>
              </div>

              {/* Expertise Tags */}
              {author.expertise && (
                <div className="flex flex-wrap gap-2">
                  {author.expertise.map((tag: string) => (
                    <span key={tag} className="bg-gray-800 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Follow Button */}
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">Follow Author</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Articles */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>

            <div className="space-y-6">
              {author.recentArticles.map((article: any) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                  <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition border border-gray-800">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                          {article.category}
                        </span>
                        <h3 className="text-xl font-semibold group-hover:text-blue-400 transition">{article.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye size={14} />
                        <span>{article.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle size={14} />
                        <span>{article.comments} comments</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/blog">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-900 bg-transparent">
                  View All Articles by {author.name.split(" ")[0]}
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* About */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">About</h3>
              <p className="text-gray-400 text-sm mb-4">{author.bio}</p>
              <a href={`mailto:${author.email}`} className="text-blue-400 hover:text-blue-300 text-sm">
                Contact {author.name.split(" ")[0]}
              </a>
            </div>

            {/* Social Links */}
            {author.socialLinks && (
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Follow</h3>
                <div className="space-y-3">
                  {Object.entries(author.socialLinks).map(([platform, url]: [string, any]) => (
                    <a key={platform} href={url} className="block text-blue-400 hover:text-blue-300 text-sm capitalize">
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Writing Topics</h3>
              <div className="space-y-2">
                {author.expertise.map((topic: string) => (
                  <a key={topic} href="#" className="block text-gray-400 hover:text-blue-400 text-sm">
                    {topic}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
