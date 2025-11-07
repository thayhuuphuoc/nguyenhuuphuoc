import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"

// For demo purposes, using simple credentials
// In production, use a proper database
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@blogforge.com",
    password: "admin123", // In production, use hashed passwords
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@blogforge.com",
    password: "user123",
    name: "Demo User",
    role: "user",
  },
]

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = DEMO_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password,
        )

        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role
        ;(session.user as any).id = token.sub
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

