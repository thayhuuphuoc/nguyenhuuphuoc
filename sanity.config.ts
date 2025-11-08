import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemaTypes"
import { config } from "dotenv"
import { resolve } from "path"

// Load .env file explicitly for Sanity CLI
config({ path: resolve(process.cwd(), ".env") })

// Load environment variables for Sanity Studio
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "vn57pgjz"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "myblogdataset"

if (!projectId || projectId === "") {
  console.warn("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_STUDIO_PROJECT_ID is not set.")
  console.warn("⚠️ Please create .env file with NEXT_PUBLIC_SANITY_PROJECT_ID or set it in .env.local")
  console.warn("⚠️ Using fallback projectId: vn57pgjz")
}

export default defineConfig({
  name: "default",
  title: "Nguyen Huu Phuoc",

  projectId: projectId || "vn57pgjz",
  dataset: dataset || "myblogdataset",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
