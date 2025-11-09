import mongoose, { Schema, Model } from "mongoose"

export interface IViewCount {
  _id?: string
  postSlug: string
  count: number
  lastViewedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

type ViewCountModel = Model<IViewCount>

const ViewCountSchema = new Schema<IViewCount>(
  {
    postSlug: {
      type: String,
      required: [true, "Please provide a post slug"],
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastViewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Note: unique: true on postSlug already creates an index automatically

// Prevent re-compilation of models during development
const ViewCount =
  (mongoose.models.ViewCount as ViewCountModel) ||
  mongoose.model<IViewCount, ViewCountModel>("ViewCount", ViewCountSchema)

export default ViewCount

