import mongoose, { Schema, Model } from "mongoose"

export interface IComment {
  _id?: string
  postSlug: string
  author: {
    id: string
    name: string
    email: string
    image?: string
  }
  content: string
  createdAt?: Date
  updatedAt?: Date
}

type CommentModel = Model<IComment>

const CommentSchema = new Schema<IComment>(
  {
    postSlug: {
      type: String,
      required: [true, "Please provide a post slug"],
      index: true,
    },
    author: {
      id: {
        type: String,
        required: [true, "Please provide author ID"],
      },
      name: {
        type: String,
        required: [true, "Please provide author name"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Please provide author email"],
        lowercase: true,
        trim: true,
      },
      image: {
        type: String,
        default: null,
      },
    },
    content: {
      type: String,
      required: [true, "Please provide comment content"],
      trim: true,
      maxlength: [1000, "Comment cannot be more than 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
CommentSchema.index({ postSlug: 1, createdAt: -1 })

// Prevent re-compilation of models during development
const Comment =
  (mongoose.models.Comment as CommentModel) ||
  mongoose.model<IComment, CommentModel>("Comment", CommentSchema)

export default Comment

