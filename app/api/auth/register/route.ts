import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Registration request received")
    const body = await request.json()
    const { name, email, password } = body

    console.log("📋 Registration data:", {
      name: name?.substring(0, 20),
      email: email,
      passwordLength: password?.length,
    })

    // Validation
    if (!name || !email || !password) {
      console.log("❌ Validation failed: Missing fields")
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log("❌ Validation failed: Password too short")
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      )
    }

    // Connect to database
    console.log("🔌 Connecting to database...")
    const dbConnection = await connectDB()
    
    if (!dbConnection) {
      console.error("❌ Database connection failed")
      return NextResponse.json(
        { error: "MongoDB chưa được cấu hình. Vui lòng thêm MONGODB_URI vào .env.local" },
        { status: 500 }
      )
    }

    console.log("✅ Database connected successfully")

    // Check if user already exists
    const emailToCheck = email.toLowerCase().trim()
    console.log("🔍 Checking if user exists:", emailToCheck)
    const existingUser = await User.findOne({ email: emailToCheck })
    
    if (existingUser) {
      console.log("❌ User already exists:", existingUser.email)
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 400 }
      )
    }

    console.log("✅ User does not exist, creating new user...")

    // Create new user
    const userData = {
      name: name.trim(),
      email: emailToCheck,
      password, // Will be hashed by pre-save hook
      role: "user",
    }

    console.log("💾 Creating user with data:", {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      passwordLength: userData.password.length,
      passwordPreview: userData.password.substring(0, 3) + "***",
    })

    console.log("💾 Calling User.create()...")
    const user = await User.create(userData)
    console.log("✅ User.create() completed")

    console.log("✅ User created successfully with ID:", user._id?.toString())

    // Verify user was created and password was hashed by querying again
    const createdUser = await User.findById(user._id).select("+password")
    if (createdUser) {
      console.log("✅ User verification successful:", {
        id: createdUser._id?.toString(),
        email: createdUser.email,
        name: createdUser.name,
        hasPassword: !!createdUser.password,
        passwordLength: createdUser.password?.length,
        passwordStartsWith: createdUser.password?.substring(0, 15),
        isHashed: createdUser.password?.startsWith("$2"),
      })

      // Verify user can be found in database
      const verifyUser = await User.findOne({ email: emailToCheck })
      if (verifyUser) {
        console.log("✅ User found in database after creation")
      } else {
        console.error("❌ ERROR: User not found in database after creation!")
      }
    } else {
      console.error("❌ ERROR: User was created but cannot be retrieved!")
    }

    // Return user without password
    return NextResponse.json(
      {
        message: "Đăng ký thành công!",
        user: {
          id: user._id?.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("❌ Registration error:", error)
    console.error("❌ Error name:", error?.name)
    console.error("❌ Error code:", error?.code)
    console.error("❌ Error message:", error?.message)
    console.error("❌ Full error:", JSON.stringify(error, null, 2))
    
    // Handle duplicate key error
    if (error.code === 11000) {
      console.log("❌ Duplicate key error - email already exists")
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 400 }
      )
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      console.log("❌ Validation error")
      const errors = Object.values(error.errors).map((err: any) => err.message)
      console.log("❌ Validation errors:", errors)
      return NextResponse.json(
        { error: errors[0] || "Dữ liệu không hợp lệ" },
        { status: 400 }
      )
    }

    // Handle other errors
    console.error("❌ Unexpected error:", error)
    return NextResponse.json(
      { 
        error: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}



