import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import { Providers } from "@/providers/sessionProviders";
import { BlogProvider } from "@/context-api/BlogContext";

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <BlogProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </BlogProvider>
      </body>
    </html>
  );
}
