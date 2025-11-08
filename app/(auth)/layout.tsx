import type React from "react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:opacity-80 transition">
            <span className="font-bold text-lg tracking-tight">NGUYEN</span>
            <span className="font-bold text-lg tracking-tight text-orange-500">HUU</span>
            <span className="bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded">PHUOC</span>
          </Link>
        </div>
        
        {/* Auth Form Card */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  )
}
