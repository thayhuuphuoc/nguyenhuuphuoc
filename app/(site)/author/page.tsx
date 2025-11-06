"use client"

import Link from "next/link"

export default function AuthorPage() {
  const authors = [
    {
      id: 1,
      slug: "manpreet-singh-minhas",
      name: "Manpreet Singh Minhas",
      role: "Staff Writer",
      bio: "UI/UX Research Blogger sharing insights on technical blogging and user experience design.",
      avatar: "/avatar-person.png",
      articles: 24,
      followers: 1205,
    },
    {
      id: 2,
      slug: "sanjida-windx",
      name: "Sanjida windx",
      role: "Guest Author",
      bio: "Health writer focusing on wellness and lifestyle improvements through science-backed tips.",
      avatar: "/avatar-person.png",
      articles: 18,
      followers: 892,
    },
    {
      id: 3,
      slug: "alice-ben",
      name: "Alice Ben",
      role: "Co-Author",
      bio: "Travel enthusiast sharing tips and stories about various tourist destinations worldwide.",
      avatar: "/avatar-person.png",
      articles: 32,
      followers: 1543,
    },
    {
      id: 4,
      slug: "john-smith",
      name: "John Smith",
      role: "Contributor",
      bio: "Technology expert with 10+ years of experience in software development and innovation.",
      avatar: "/avatar-person.png",
      articles: 15,
      followers: 756,
    },
  ]

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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Authors</h1>
          <p className="text-gray-400 text-lg">Meet the talented writers behind BlogForge</p>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author) => (
            <Link key={author.id} href={`/author/${author.slug}`} className="group">
              <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition border border-gray-800">
                <img
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-1 group-hover:text-blue-400 transition">
                  {author.name}
                </h3>
                <p className="text-sm text-blue-400 text-center mb-3">{author.role}</p>
                <p className="text-sm text-gray-400 text-center mb-4 line-clamp-2">{author.bio}</p>

                <div className="flex justify-around text-center py-4 border-t border-gray-700">
                  <div>
                    <p className="text-lg font-semibold">{author.articles}</p>
                    <p className="text-xs text-gray-500">Articles</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{author.followers}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
