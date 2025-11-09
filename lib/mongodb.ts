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
    return null
  }

  // Validate MONGODB_URI format
  const isValidFormat = MONGODB_URI.startsWith("mongodb://") || MONGODB_URI.startsWith("mongodb+srv://")
  if (!isValidFormat) {
    console.warn("⚠️ MONGODB_URI format is invalid. Using fallback demo users mode.")
    console.warn("⚠️ MONGODB_URI should start with 'mongodb://' or 'mongodb+srv://'")
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
      console.log("✅ Connected to MongoDB")
      return mongoose
    }).catch((error) => {
      console.error("❌ MongoDB connection error:", error.message)
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



