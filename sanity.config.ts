import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemaTypes"

// Load environment variables for Sanity Studio
// Sanity CLI reads from .env file, not .env.local
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || ""
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production"

if (!projectId) {
  console.warn("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID is not set.")
  console.warn("⚠️ Please create .env file with NEXT_PUBLIC_SANITY_PROJECT_ID or set it in .env.local")
}

export default defineConfig({
  name: "default",
  title: "Nguyen Huu Phuoc",

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
