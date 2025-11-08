import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemaTypes"

// Load environment variables for Sanity Studio
// Sanity CLI automatically loads .env file, so we don't need dotenv here
// Using fallback values if environment variables are not set
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "vn57pgjz"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "myblogdataset"

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
