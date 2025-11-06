# Blog Forge - Deployment Guide

## Quick Start Deployment

### Option 1: Deploy Directly from v0

1. Click the **"Publish"** button in the top-right corner of the v0 interface
2. Connect your GitHub account if prompted
3. Vercel will automatically deploy your project

### Option 2: Deploy via GitHub

1. **Download the project**
   - Click the three dots menu in v0 and select "Download ZIP"
   - Extract the files

2. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit: Blog Forge"
   git branch -M main
   git remote add origin https://github.com/yourusername/blog-forge.git
   git push -u origin main
   \`\`\`

3. **Connect to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

### Option 3: Deploy via Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
\`\`\`

## Environment Variables Setup

After deployment, configure these environment variables in Vercel:

### Required for Sanity CMS (Optional)
\`\`\`
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
\`\`\`

### Optional for Email Services
\`\`\`
# Resend (for email notifications)
RESEND_API_KEY=your_resend_api_key

# Or SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# Or Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_password
\`\`\`

### Optional for NextAuth
\`\`\`
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=https://yourdomain.com
\`\`\`

## Setting Up Environment Variables in Vercel

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Name**: Variable name
   - **Value**: Your API key or value
   - **Environment**: Select Production, Preview, or Development

4. Click "Save"
5. Vercel will automatically redeploy with new variables

## Connecting to Sanity CMS (Optional)

1. **Create a Sanity Project**
   - Visit [sanity.io](https://www.sanity.io/)
   - Click "Get started"
   - Create a new project

2. **Get Your Project ID**
   - Go to Sanity Studio dashboard
   - Copy your Project ID from settings
   - Add to Vercel environment variables as `NEXT_PUBLIC_SANITY_PROJECT_ID`

3. **Deploy Sanity Studio**
   \`\`\`bash
   npm install -g @sanity/cli
   cd studio
   sanity deploy
   \`\`\`

## Connecting to Email Service (Optional)

### Using Resend
1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add to environment variables as `RESEND_API_KEY`

### Using SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Add to environment variables as `SENDGRID_API_KEY`

## Custom Domain Setup

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take 24-48 hours)

## Database Setup (Optional)

### Using Neon (PostgreSQL)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a database
3. Copy connection string
4. Add as `DATABASE_URL` in Vercel environment variables

### Using Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create a project
3. Copy the connection string
4. Add as `DATABASE_URL` in Vercel environment variables

## Monitoring & Logs

1. In Vercel dashboard, click your project
2. Go to **Deployments** tab to see deployment history
3. Click on a deployment to view build logs
4. Go to **Functions** tab to monitor API routes

## Troubleshooting

### Build Fails
- Check logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` has all required dependencies

### 404 Errors
- Ensure routes are properly created in `app` directory
- Check Next.js version compatibility

### Slow Performance
- Enable Image Optimization in Vercel settings
- Use CDN for static assets
- Optimize database queries

### Email Not Sending
- Verify API keys are correct
- Check email service provider account
- Review email configuration in code

## Production Best Practices

1. **Security**
   - Use HTTPS only
   - Set strong `NEXTAUTH_SECRET`
   - Enable CORS properly
   - Validate all user inputs

2. **Performance**
   - Enable Edge Caching
   - Use Image Optimization
   - Minimize bundle size
   - Monitor Core Web Vitals

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor analytics
   - Track performance metrics
   - Set up uptime monitoring

4. **Backups**
   - Regular database backups
   - Version control on GitHub
   - Test restore procedures

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Next.js Documentation](https://nextjs.org/docs)
- Open an issue on GitHub
- Contact Vercel support at vercel.com/help
