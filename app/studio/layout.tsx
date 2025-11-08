import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Studio - Nguyen Huu Phuoc",
  robots: "noindex",
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

