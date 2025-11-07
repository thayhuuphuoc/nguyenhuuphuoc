# Blog Forge

A modern, feature-rich blogging platform built with Next.js 16, React 19, Tailwind CSS, and Sanity CMS.

## Features

### Core Features
- **Blog Management** - Create, edit, and publish blog posts
- **Author Profiles** - Dedicated author pages with biography and articles
- **Category System** - Organize content by categories
- **Search & Filter** - Full-text search and category filtering
- **Responsive Design** - Mobile-first, works on all devices
- **Dark Mode** - Built-in dark mode support

### User Features
- **User Authentication** - Sign up, sign in, password reset
- **Contact Form** - Get in touch with the team
- **Newsletter Signup** - Subscribe to updates
- **Article Interactions** - Comments, likes, and shares

### Admin Features
- **Sanity CMS** - Headless CMS for content management
- **Content Management** - Easy dashboard for managing posts, authors, categories
- **Image Optimization** - Automatic image optimization
- **SEO Ready** - Meta tags, sitemaps, structured data

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS v4
- **CMS**: Sanity Studio
- **Authentication**: NextAuth.js
- **Email**: Resend or SendGrid (optional)
- **Database**: Neon or Supabase (optional)
- **Deployment**: Vercel
- **Icons**: Lucide React
- **UI Components**: shadcn/ui

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- GitHub account (for deployment)

### Local Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/blog-forge.git
   cd blog-forge
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create environment file**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Add environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`
   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your_read_token
   SANITY_PREVIEW_SECRET=your_preview_secret
   
   # NextAuth Configuration
   AUTH_SECRET=your_auth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   \`\`\`
   
   **To get your Sanity credentials:**
   - Go to [sanity.io](https://www.sanity.io) and create a project
   - Get your Project ID and Dataset name
   - Create an API token with read permissions for preview mode
   - Set a preview secret (any random string)
   
   **To generate AUTH_SECRET:**
   - Run: `openssl rand -base64 32`
   - Or use any random string generator

5. **Set up Sanity Studio** (Optional but recommended)
   \`\`\`bash
   # Sanity Studio will be available at /studio
   # Make sure your Sanity project is configured with the schemas in schemaTypes/
   \`\`\`

6. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Sanity CMS Setup

1. **Create a Sanity project** at [sanity.io](https://www.sanity.io)
2. **Configure schemas** - The project includes schemas for:
   - Posts (with rich text content)
   - Authors (with bio and role)
   - Categories (with descriptions)
3. **Set up preview mode**:
   - Configure your Sanity project to use the preview URL: `/api/preview?secret=YOUR_SECRET&slug=SLUG`
   - This allows you to preview draft content before publishing

## Authentication

The project uses NextAuth.js v5 for authentication. Demo credentials are configured in `lib/auth.ts`:
- Email: `admin@blogforge.com` / Password: `admin123`
- Email: `user@blogforge.com` / Password: `user123`

**Note:** In production, replace the demo user system with a proper database-backed authentication.

## Project Structure

\`\`\`
blog-forge/
├── app/
│   ├── (auth)/
│   │   ├── signin/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (site)/
│   │   ├── page.tsx (home)
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── author/page.tsx
│   │   ├── author/[slug]/page.tsx
│   │   ├── contact-us/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   └── terms-and-conditions/page.tsx
│   ├── api/
│   │   ├── contact/route.ts
│   │   ├── subscribe/route.ts
│   │   ├── blog/route.ts
│   │   └── authors/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ui/ (shadcn components)
├── lib/
│   ├── sanity.ts
│   └── utils.ts
├── schemaTypes/
│   ├── post.ts
│   ├── author.ts
│   ├── category.ts
│   └── blockContent.ts
├── sanity.config.ts
└── package.json
\`\`\`

## Available Scripts

\`\`\`bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
\`\`\`

## Routes

### Public Routes
- `/` - Home page with featured articles
- `/blog` - Blog listing with search and filters
- `/blog/[slug]` - Individual blog post
- `/author` - Author listing
- `/author/[slug]` - Author profile
- `/contact-us` - Contact form
- `/privacy-policy` - Privacy policy
- `/terms-and-conditions` - Terms & conditions

### Auth Routes
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up
- `/auth/forgot-password` - Password reset

## API Routes

### Blog API
- `GET /api/blog` - Get blog posts with filtering
- `GET /api/blog?category=Technology&search=query` - Search and filter

### Authors API
- `GET /api/authors` - Get all authors
- `GET /api/authors/[slug]` - Get specific author

### Contact API
- `POST /api/contact` - Submit contact form

### Newsletter API
- `POST /api/subscribe` - Subscribe to newsletter

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy
\`\`\`bash
vercel
\`\`\`

## Configuration

### Email Services
To enable email functionality, configure one of:
- **Resend** - Modern email API
- **SendGrid** - Email delivery service
- **Nodemailer** - SMTP relay

### Authentication
Optional NextAuth.js setup for user accounts:
\`\`\`
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://yourdomain.com
\`\`\`

### Database
Optional database setup:
- **Neon** - PostgreSQL
- **Supabase** - PostgreSQL with auth

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial use

## Support

- Documentation: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- Issues: Open an issue on GitHub
- Questions: Contact us at hello@blogforge.com

## Roadmap

- [ ] Comments system
- [ ] User dashboard
- [ ] Article analytics
- [ ] Social media sharing
- [ ] Advanced search
- [ ] Podcast integration
- [ ] Video support
- [ ] Multi-language support

## Credits

Built with Next.js, React, Tailwind CSS, and Sanity CMS. Deployed on Vercel.
