"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Clear any existing theme preference on first load to ensure light mode default
    const storedTheme = localStorage.getItem("blog-theme")
    if (!storedTheme) {
      localStorage.setItem("blog-theme", "light")
    }
  }, [])

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="blog-theme"
      forcedTheme={mounted ? undefined : "light"}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
