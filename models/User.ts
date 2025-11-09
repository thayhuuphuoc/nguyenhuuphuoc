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
  if (!this.isModified("password")) {
    next()
    return
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    console.error("comparePassword: User password is not set")
    return false
  }
  
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  } catch (error) {
    console.error("comparePassword error:", error)
    return false
  }
}

// Prevent re-compilation of models during development
const User = (mongoose.models.User as UserModel) || mongoose.model<IUser, UserModel>("User", UserSchema)

export default User



