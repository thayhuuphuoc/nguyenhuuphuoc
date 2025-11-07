import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Nguyen Huu Phuoc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span>f</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span>in</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span>𝕏</span>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground justify-center sm:justify-start">
          <Link href="/terms-and-conditions" className="hover:text-foreground transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact-us" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

