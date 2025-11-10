import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

// Fallback demo users (only used if MongoDB is not configured)
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@blogforge.com",
    password: "admin123",
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
    signIn: "/sign-in",
    signOut: "/sign-in",
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
          console.log("❌ Missing email or password")
          return null
        }

        // Type guard to ensure email and password are strings
        if (typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          console.log("❌ Invalid email or password type")
          return null
        }

        const emailInput = credentials.email.toLowerCase().trim()
        const passwordInput = credentials.password

        console.log("🔍 Login attempt:", {
          email: emailInput,
          passwordLength: passwordInput.length,
        })

        let dbConnection: any = null
        try {
          // Try to connect to database
          dbConnection = await connectDB()
        } catch (error: any) {
          console.error("❌ Failed to connect to database:", error?.message || error)
          dbConnection = null
        }
        
        // If database is connected, try to find user in database
        if (dbConnection) {
          try {
            console.log("📊 Database connected, searching in database...")
            console.log("🔍 Searching for user with email:", emailInput)
            
            // Find user in database (select password field explicitly)
            const user = await User.findOne({ email: emailInput })
              .select("+password")
            
            if (user) {
              console.log("✅ User found in database:", {
                id: user._id?.toString(),
                email: user.email,
                name: user.name,
                hasPassword: !!user.password,
                passwordLength: user.password?.length || 0,
                passwordStartsWith: user.password?.substring(0, 10) || "N/A",
                isHashed: user.password?.startsWith("$2") || false,
              })
              
              // Verify password using the model's comparePassword method
              console.log("🔐 Attempting to compare password...")
              console.log("🔐 Input password length:", passwordInput.length)
              console.log("🔐 Stored password hash preview:", user.password?.substring(0, 20) || "N/A")
              
              const isPasswordValid = await user.comparePassword(passwordInput)
              
              console.log("🔐 Password validation result:", isPasswordValid)
              
              if (isPasswordValid) {
                console.log("✅ Password is valid, returning user")
                return {
                  id: user._id?.toString() || "",
                  email: user.email,
                  name: user.name,
                  role: user.role || "user",
                }
              } else {
                console.log("❌ Password mismatch for user in database")
                console.log("💡 Troubleshooting:")
                console.log("   1. Make sure you're using the correct password")
                console.log("   2. Check if password was hashed correctly during registration")
                console.log("   3. Verify MongoDB connection is working")
              }
            } else {
              console.log("❌ User not found in database with email:", emailInput)
              // List all users in database for debugging
              try {
                const allUsers = await User.find({}).select("email name").limit(10)
                console.log("📋 Total users in database:", allUsers.length)
                console.log("📋 Users in database:", allUsers.map(u => ({ email: u.email, name: u.name })))
                if (allUsers.length === 0) {
                  console.log("⚠️ No users found in database. Make sure registration was successful.")
                } else {
                  console.log("💡 Check if the email you're using matches exactly (case-insensitive)")
                  console.log("💡 Email being searched:", emailInput)
                  const matchingUsers = allUsers.filter(u => u.email.toLowerCase() === emailInput.toLowerCase())
                  if (matchingUsers.length > 0) {
                    console.log("⚠️ Found users with similar email (case-insensitive):", matchingUsers.map(u => u.email))
                  }
                }
              } catch (err: any) {
                console.log("⚠️ Could not list users from database:", err?.message)
              }
            }
          } catch (error: any) {
            console.error("❌ Database query error:", error?.message || error)
            console.error("❌ Error stack:", error?.stack)
          }
        } else {
          // Database not connected, try fallback demo users
          console.log("📊 Database not connected, trying fallback demo users...")
          console.log("📋 Available demo users:", DEMO_USERS.map(u => u.email))
          
          const demoUser = DEMO_USERS.find(
            (u) => {
              const emailMatch = u.email.toLowerCase() === emailInput
              const passwordMatch = u.password === passwordInput
              console.log(`  - Checking ${u.email}: email=${emailMatch}, password=${passwordMatch}`)
              return emailMatch && passwordMatch
            }
          )
          
          if (demoUser) {
            console.log("✅ Using fallback demo user:", demoUser.email)
            return {
              id: demoUser.id,
              email: demoUser.email,
              name: demoUser.name,
              role: demoUser.role,
            }
          }
        }
        
        console.log("❌ No user found in database or demo users")
        console.log("💡 Troubleshooting tips:")
        console.log("   1. Check MongoDB connection (should see '✅ Connected to MongoDB')")
        console.log("   2. Verify user was created in MongoDB Atlas")
        console.log("   3. Make sure email and password are correct")
        console.log("   4. Check console logs during registration for errors")
        console.log("   5. Try registering again if user doesn't exist")

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

