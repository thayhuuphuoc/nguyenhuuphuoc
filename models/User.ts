import mongoose, { Schema, Model } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser {
  _id?: string
  name: string
  email: string
  password: string
  role?: "user" | "admin"
  createdAt?: Date
  updatedAt?: Date
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    console.log("🔐 Password not modified, skipping hash")
    next()
    return
  }

  try {
    console.log("🔐 Hashing password before save...")
    console.log("🔐 Password length:", this.password?.length || 0)
    console.log("🔐 Is new document:", this.isNew)
    console.log("🔐 User email:", this.email)
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    
    console.log("🔐 Password hashed successfully")
    console.log("🔐 Hash length:", hashedPassword.length)
    console.log("🔐 Hash preview:", hashedPassword.substring(0, 30))
    
    this.password = hashedPassword
    next()
  } catch (error: any) {
    console.error("❌ Error hashing password:", error?.message || error)
    console.error("❌ Error stack:", error?.stack)
    next(error)
  }
})

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    console.error("❌ comparePassword: User password is not set")
    console.error("❌ User ID:", this._id)
    console.error("❌ User email:", this.email)
    return false
  }
  
  if (!candidatePassword) {
    console.error("❌ comparePassword: Candidate password is empty")
    return false
  }
  
  // Check if password is hashed (bcrypt hashes start with $2a$, $2b$, or $2y$)
  if (!this.password.startsWith("$2")) {
    console.error("❌ comparePassword: Password is not hashed (doesn't start with $2)")
    console.error("❌ Password preview:", this.password.substring(0, 20))
    return false
  }
  
  try {
    console.log("🔐 Comparing password:")
    console.log("   - Candidate password length:", candidatePassword.length)
    console.log("   - Stored hash length:", this.password.length)
    console.log("   - Stored hash preview:", this.password.substring(0, 30))
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    
    console.log("🔐 Password comparison result:", isMatch)
    
    if (!isMatch) {
      console.log("❌ Password does not match")
      console.log("💡 Troubleshooting:")
      console.log("   1. Make sure you're using the correct password")
      console.log("   2. Check if there are any whitespace characters")
      console.log("   3. Verify the password was hashed correctly during registration")
    }
    
    return isMatch
  } catch (error: any) {
    console.error("❌ comparePassword error:", error?.message || error)
    console.error("❌ Error stack:", error?.stack)
    return false
  }
}

// Prevent re-compilation of models during development
const User = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>("User", UserSchema)

export default User



