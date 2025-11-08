"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { SearchDialog } from "@/components/search-dialog"

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchData, setSearchData] = useState<{ posts: any[]; authors: any[]; categories: any[] }>({
    posts: [],
    authors: [],
    categories: [],
  })
  const { data: session } = useSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Load search data when dialog opens
  useEffect(() => {
    if (searchOpen && searchData.posts.length === 0) {
      const loadSearchData = async () => {
        try {
          const response = await fetch("/api/search")
          if (response.ok) {
            const data = await response.json()
            setSearchData({
              posts: data.posts || [],
              authors: data.authors || [],
              categories: data.categories || [],
            })
          }
        } catch (error) {
          console.error("Error loading search data:", error)
        }
      }
      loadSearchData()
    }
  }, [searchOpen, searchData.posts.length])

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Bài viết", href: "/blog" },
    { name: "Tác giả", href: "/author" },
    { name: "Liên hệ", href: "/contact-us" },
  ]

  const handleThemeToggle = () => {
    if (!mounted) return
    const currentTheme = resolvedTheme || theme || "light"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="w-full max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-1.5 hover:opacity-80 transition">
            <span className="font-bold text-sm md:text-base tracking-tight">NGUYEN</span>
            <span className="font-bold text-sm md:text-base tracking-tight text-orange-500">HUU</span>
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">PHUOC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" || theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          {/* Search Dialog */}
          <SearchDialog
            open={searchOpen}
            onOpenChange={setSearchOpen}
            posts={searchData.posts}
            authors={searchData.authors}
            categories={searchData.categories}
          />

          {/* Auth Buttons */}
          {session ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{session.user?.name}</span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                setSearchOpen(true)
                setMobileMenuOpen(false)
              }}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            {session ? (
              <div className="pt-3 border-t space-y-2">
                <p className="text-sm text-muted-foreground">{session.user?.name}</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="pt-3 border-t space-y-2">
                <Link href="/sign-in" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="block">
                  <Button size="sm" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
