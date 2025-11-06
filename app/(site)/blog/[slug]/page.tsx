"use client"

import Link from "next/link"
import { Eye, MessageCircle, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample blog post data - in a real app, this would come from a database or CMS
const blogPosts: Record<string, any> = {
  "top-articles-technology": {
    id: 1,
    title: "Top Articles to Read on Technology",
    category: "Technology",
    image: "/technology-network-abstract.jpg",
    content: `
      <p>In the rapidly evolving world of technology, staying up-to-date with the latest trends and insights is crucial. This comprehensive guide brings you the most impactful technology articles that are shaping the industry today.</p>
      
      <h2>Why Technology Articles Matter</h2>
      <p>Technology is transforming every aspect of our lives, from how we work to how we communicate. Reading quality articles helps us understand these changes and prepare for the future.</p>
      
      <h3>Key Topics to Follow</h3>
      <ul>
        <li>Artificial Intelligence and Machine Learning</li>
        <li>Cloud Computing Solutions</li>
        <li>Cybersecurity Best Practices</li>
        <li>Web Development Trends</li>
        <li>Mobile Technology Innovations</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>By regularly reading technology articles from trusted sources, you'll stay informed about industry changes and be better prepared to adapt to new technologies in your career.</p>
    `,
    views: 1205,
    comments: 23,
    date: "2025-06-09",
    readTime: "8 min",
    author: {
      name: "Manpreet Singh Minhas",
      role: "Staff Writer",
      bio: "UI/UX Research Blogger sharing insights on technical blogging.",
      avatar: "/avatar-person.png",
    },
  },
  "technical-blogging-skill": {
    id: 2,
    title: "Technical blogging - A skill with many benefits",
    category: "Technology",
    image: "/purple-gradient-abstract.png",
    content: `
      <p>Technical blogging is a powerful skill that combines writing with expertise. It's not just about sharing knowledge; it's about building your professional brand and contributing to the developer community.</p>
      
      <h2>Benefits of Technical Blogging</h2>
      <p>When you write technical blogs, you're establishing yourself as a thought leader in your field. Here are the key benefits:</p>
      
      <h3>Career Growth</h3>
      <p>Technical blogs showcase your expertise and help you stand out in the job market. Many companies look for developers who actively contribute to the community.</p>
      
      <h3>Knowledge Sharing</h3>
      <p>By writing about your experiences, you help other developers learn from your journey. This creates a positive impact on the community.</p>
      
      <h3>Networking Opportunities</h3>
      <p>Your blog becomes a hub where like-minded professionals connect and share ideas.</p>
      
      <h2>Getting Started</h2>
      <p>Start with topics you're passionate about and write regularly. Your unique perspective is valuable to the community.</p>
    `,
    views: 845,
    comments: 15,
    date: "2025-06-08",
    readTime: "6 min",
    author: {
      name: "Sanjida windx",
      role: "Guest Author",
      bio: "Health writer focusing on wellness and lifestyle improvements.",
      avatar: "/avatar-person.png",
    },
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article not found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Blog</Button>
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
            <Link href="/author" className="text-gray-400 hover:text-gray-300">
              Authors
            </Link>
            <Link href="/contact-us" className="text-gray-400 hover:text-gray-300">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-2xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-400">
          <Link href="/blog" className="hover:text-blue-400">
            Blog
          </Link>
          {" / "}
          <span>{post.category}</span>
        </div>

        {/* Title and Meta */}
        <div className="mb-8">
          <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 py-6 border-t border-b border-gray-800">
            <img
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-gray-400">{post.author.role}</p>
            </div>
            <div className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{post.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={16} />
              <span>{post.comments} comments</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{post.readTime} read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden h-96">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none mb-12 space-y-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Share and Actions */}
        <div className="flex items-center gap-4 py-6 border-t border-gray-800">
          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
            <Heart size={20} />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>

        {/* Related Articles */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(blogPosts)
              .slice(0, 2)
              .map(([slug, relatedPost]: [string, any]) => (
                <Link key={slug} href={`/blog/${slug}`} className="group">
                  <div className="h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <h3 className="font-semibold group-hover:text-blue-400 transition mb-2">{relatedPost.title}</h3>
                  <p className="text-sm text-gray-400">{relatedPost.readTime} read</p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  )
}
