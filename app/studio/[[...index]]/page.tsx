"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"

export default function StudioPage() {
  // Validate config
  if (!config.projectId || config.projectId === "placeholder" || config.projectId === "") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Sanity Studio Configuration Error</h1>
          <p className="text-muted-foreground">
            NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Please create a `.env.local` file with your Sanity Project ID.
          </p>
          <div className="mt-8 p-4 bg-muted rounded-lg text-left">
            <p className="text-sm font-mono text-foreground">
              Create file <code className="bg-background px-2 py-1 rounded">.env.local</code> with:
            </p>
            <pre className="mt-2 text-xs bg-background p-4 rounded overflow-x-auto">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_token
SANITY_PREVIEW_SECRET=your_secret`}
            </pre>
          </div>
        </div>
      </div>
    )
  }

  try {
    return <NextStudio config={config} />
  } catch (error: any) {
    // Handle CORS or other errors
    if (error?.message?.includes("CORS") || error?.name === "CorsOriginError") {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-8">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">CORS Error</h1>
            <p className="text-muted-foreground">
              Sanity Studio cannot connect due to CORS restrictions. Please add your origin to Sanity CORS settings.
            </p>
            <div className="mt-8 p-4 bg-muted rounded-lg text-left space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Steps to fix:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Go to <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">sanity.io/manage</a></li>
                  <li>Select your project</li>
                  <li>Go to <strong>Settings</strong> → <strong>API</strong> → <strong>CORS origins</strong></li>
                  <li>Add <code className="bg-background px-2 py-1 rounded">http://localhost:3000</code></li>
                  <li>Enable <strong>"Allow credentials"</strong></li>
                  <li>Click <strong>"Save"</strong></li>
                  <li>Restart your development server</li>
                </ol>
              </div>
              <div className="mt-4 p-3 bg-background rounded border">
                <p className="text-xs text-muted-foreground">
                  <strong>Alternative:</strong> Use standalone Studio by running <code className="bg-muted px-1 py-0.5 rounded">npm run studio</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    throw error
  }
}

