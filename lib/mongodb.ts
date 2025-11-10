import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose | null> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  // If MONGODB_URI is not set or empty, return null (will use fallback mode)
  if (!MONGODB_URI || MONGODB_URI.trim() === "") {
    console.warn("⚠️ MONGODB_URI is not set. Using fallback demo users mode.")
    console.warn("💡 To fix: Create .env.local file and add MONGODB_URI=your_connection_string")
    return null
  }

  // Validate MONGODB_URI format
  const isValidFormat = MONGODB_URI.startsWith("mongodb://") || MONGODB_URI.startsWith("mongodb+srv://")
  if (!isValidFormat) {
    console.warn("⚠️ MONGODB_URI format is invalid. Using fallback demo users mode.")
    console.warn("⚠️ MONGODB_URI should start with 'mongodb://' or 'mongodb+srv://'")
    console.warn(`⚠️ Current MONGODB_URI starts with: ${MONGODB_URI.substring(0, 20)}...`)
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ Connected to MongoDB successfully")
      console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'unknown'}`)
      return mongoose
    }).catch((error) => {
      console.error("❌ MongoDB connection error:", error.message)
      console.error("💡 Common issues:")
      console.error("   1. Check if MONGODB_URI is correct in .env.local")
      console.error("   2. Check if password is URL encoded (special characters like @, <, >)")
      console.error("   3. Check if database name is included in connection string")
      console.error("   4. Check MongoDB Atlas Network Access (IP whitelist)")
      console.error("   5. Check if MongoDB Atlas cluster is running")
      console.warn("⚠️ Falling back to demo users mode due to MongoDB connection failure")
      cached.promise = null
      return null
    })
  }

  try {
    cached.conn = await cached.promise
    // If connection failed, cached.conn will be null
    if (!cached.conn) {
      return null
    }
  } catch (e) {
    cached.promise = null
    console.error("❌ MongoDB connection failed:", e)
    console.warn("⚠️ Falling back to demo users mode")
    return null
  }

  return cached.conn
}

export default connectDB



