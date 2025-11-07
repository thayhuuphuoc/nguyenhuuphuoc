# Blog Forge - Hướng Dẫn Deploy Lên Vercel

Hướng dẫn chi tiết từng bước để deploy dự án BlogForge lên Vercel.

## 📋 Mục Lục

1. [Chuẩn Bị Dự Án](#1-chuẩn-bị-dự-án)
2. [Tạo Tài Khoản Vercel](#2-tạo-tài-khoản-vercel)
3. [Deploy Từ GitHub](#3-deploy-từ-github)
4. [Cấu Hình Environment Variables](#4-cấu-hình-environment-variables)
5. [Cấu Hình Sanity CMS](#5-cấu-hình-sanity-cms)
6. [Cấu Hình NextAuth](#6-cấu-hình-nextauth)
7. [Kiểm Tra và Troubleshooting](#7-kiểm-tra-và-troubleshooting)

---

## 1. Chuẩn Bị Dự Án

### 1.1. Kiểm Tra Dependencies

Đảm bảo file `package.json` có đầy đủ dependencies:

```bash
npm install
# hoặc
pnpm install
```

### 1.2. Build Local để Kiểm Tra

```bash
npm run build
```

Nếu build thành công, bạn có thể tiếp tục deploy.

### 1.3. Chuẩn Bị Git Repository

Nếu chưa có Git repository:

```bash
# Khởi tạo Git
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: BlogForge project"

# Tạo branch main
git branch -M main
```

---

## 2. Tạo Tài Khoản Vercel

### 2.1. Đăng Ký Tài Khoản

1. Truy cập [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Chọn đăng nhập bằng:
   - **GitHub** (khuyến nghị - dễ tích hợp)
   - **GitLab**
   - **Bitbucket**
   - **Email**

### 2.2. Xác Thực Tài Khoản

- Làm theo hướng dẫn để xác thực email/GitHub
- Hoàn tất setup tài khoản

---

## 3. Deploy Từ GitHub

### 3.1. Push Code Lên GitHub

**Nếu chưa có repository trên GitHub:**

1. Tạo repository mới trên GitHub:
   - Vào [github.com](https://github.com)
   - Click **"New repository"**
   - Đặt tên: `blog-forge` (hoặc tên bạn muốn)
   - Chọn **Public** hoặc **Private**
   - **KHÔNG** tích "Initialize with README"
   - Click **"Create repository"**

2. Push code lên GitHub:

```bash
# Thêm remote
git remote add origin https://github.com/YOUR_USERNAME/blog-forge.git

# Push code
git push -u origin main
```

**Nếu đã có repository:**

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 3.2. Import Project Vào Vercel

1. **Truy cập Vercel Dashboard:**
   - Vào [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click **"Add New Project"** hoặc **"New Project"**

2. **Chọn Repository:**
   - Vercel sẽ hiển thị danh sách repositories từ GitHub
   - Tìm và chọn repository `blog-forge`
   - Click **"Import"**

3. **Cấu Hình Project:**
   - **Project Name**: `blog-forge` (hoặc tên bạn muốn)
   - **Framework Preset**: Vercel sẽ tự động detect **Next.js**
   - **Root Directory**: `./` (để mặc định)
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `.next` (tự động)
   - **Install Command**: `npm install` (tự động)

4. **Click "Deploy"**
   - Vercel sẽ bắt đầu build và deploy
   - Quá trình này mất khoảng 2-5 phút

### 3.3. Deploy Thành Công

Sau khi deploy xong:
- Bạn sẽ nhận được URL: `https://blog-forge-xxx.vercel.app`
- Click vào URL để xem website
- **Lưu ý**: Lúc này website chưa hoạt động đầy đủ vì chưa cấu hình environment variables

---

## 4. Cấu Hình Environment Variables

### 4.1. Truy Cập Settings

1. Vào Vercel Dashboard
2. Chọn project `blog-forge`
3. Click tab **"Settings"**
4. Click **"Environment Variables"** ở menu bên trái

### 4.2. Thêm Environment Variables

Click **"Add New"** và thêm từng biến sau:

#### **Sanity CMS Variables (Bắt buộc)**

```
Key: NEXT_PUBLIC_SANITY_PROJECT_ID
Value: [Project ID từ Sanity]
Environment: Production, Preview, Development (chọn cả 3)
```

```
Key: NEXT_PUBLIC_SANITY_DATASET
Value: production
Environment: Production, Preview, Development
```

```
Key: SANITY_API_READ_TOKEN
Value: [API Token từ Sanity với quyền Read]
Environment: Production, Preview, Development
```

```
Key: SANITY_PREVIEW_SECRET
Value: [Một chuỗi ngẫu nhiên bất kỳ, ví dụ: my-secret-preview-key-123]
Environment: Production, Preview, Development
```

#### **NextAuth Variables (Bắt buộc)**

```
Key: AUTH_SECRET
Value: [Tạo bằng lệnh: openssl rand -base64 32]
Environment: Production, Preview, Development
```

```
Key: NEXTAUTH_URL
Value: https://your-project-name.vercel.app
Environment: Production
```

```
Key: NEXTAUTH_URL
Value: https://your-preview-url.vercel.app
Environment: Preview
```

```
Key: NEXTAUTH_URL
Value: http://localhost:3000
Environment: Development
```

### 4.3. Redeploy Sau Khi Thêm Variables

Sau khi thêm tất cả environment variables:

1. Click **"Save"** cho mỗi biến
2. Vào tab **"Deployments"**
3. Click **"..."** (3 chấm) ở deployment mới nhất
4. Chọn **"Redeploy"**
5. Chọn **"Use existing Build Cache"** hoặc **"Redeploy"** (khuyến nghị chọn Redeploy)
6. Click **"Redeploy"**

---

## 5. Cấu Hình Sanity CMS

### 5.1. Tạo Sanity Project

1. **Truy cập Sanity:**
   - Vào [sanity.io](https://www.sanity.io)
   - Click **"Get started"** hoặc **"Sign in"**

2. **Tạo Project Mới:**
   - Click **"Create project"**
   - Đặt tên: `BlogForge` (hoặc tên bạn muốn)
   - Chọn **"Production"** dataset
   - Click **"Create"**

### 5.2. Lấy Project ID và Dataset

1. Vào **Project Settings** (icon bánh răng)
2. Trong tab **"API"**, bạn sẽ thấy:
   - **Project ID**: Copy giá trị này → dùng cho `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - **Dataset**: Thường là `production` → dùng cho `NEXT_PUBLIC_SANITY_DATASET`

### 5.3. Tạo API Token

1. Vẫn trong **Project Settings** → **"API"**
2. Scroll xuống phần **"Tokens"**
3. Click **"Add API token"**
4. Đặt tên: `Production Read Token`
5. Chọn quyền: **"Read"** (đủ cho preview mode)
6. Click **"Save"**
7. **Copy token ngay** (chỉ hiển thị 1 lần) → dùng cho `SANITY_API_READ_TOKEN`

### 5.4. Cấu Hình Schemas

1. **Clone schemas từ project:**
   - Project đã có sẵn schemas trong folder `schemaTypes/`
   - Bạn cần đảm bảo Sanity project có các schemas này

2. **Deploy Sanity Studio (Optional):**
   ```bash
   # Cài đặt Sanity CLI
   npm install -g @sanity/cli
   
   # Login
   sanity login
   
   # Deploy studio
   sanity deploy
   ```

### 5.5. Cấu Hình Preview Mode

1. Trong Sanity Studio, vào **"Settings"** → **"API"**
2. Tìm phần **"CORS origins"**
3. Thêm domain Vercel:
   - `https://your-project-name.vercel.app`
   - `https://*.vercel.app` (cho preview deployments)

---

## 6. Cấu Hình NextAuth

### 6.1. Tạo AUTH_SECRET

**Trên Windows (PowerShell):**
```powershell
# Cài đặt OpenSSL nếu chưa có
# Hoặc sử dụng online tool: https://generate-secret.vercel.app/32

# Nếu có OpenSSL:
openssl rand -base64 32
```

**Trên Mac/Linux:**
```bash
openssl rand -base64 32
```

**Hoặc sử dụng online:**
- Truy cập: https://generate-secret.vercel.app/32
- Copy kết quả → dùng cho `AUTH_SECRET`

### 6.2. Cấu Hình NEXTAUTH_URL

- **Production**: URL chính của website (ví dụ: `https://blog-forge.vercel.app`)
- **Preview**: URL preview của Vercel (tự động tạo)
- **Development**: `http://localhost:3000`

### 6.3. Test Authentication

Sau khi deploy:
1. Truy cập website
2. Click **"Sign In"**
3. Thử đăng nhập với:
   - Email: `admin@blogforge.com`
   - Password: `admin123`

---

## 7. Kiểm Tra và Troubleshooting

### 7.1. Kiểm Tra Build Logs

1. Vào Vercel Dashboard → Project
2. Tab **"Deployments"**
3. Click vào deployment mới nhất
4. Xem **"Build Logs"** để kiểm tra lỗi

### 7.2. Kiểm Tra Function Logs

1. Tab **"Functions"**
2. Xem logs của các API routes
3. Kiểm tra errors nếu có

### 7.3. Các Lỗi Thường Gặp

#### **Lỗi: "NEXT_PUBLIC_SANITY_PROJECT_ID is not defined"**

**Giải pháp:**
- Kiểm tra đã thêm environment variable chưa
- Đảm bảo chọn đúng Environment (Production/Preview/Development)
- Redeploy lại project

#### **Lỗi: "Invalid API token"**

**Giải pháp:**
- Kiểm tra `SANITY_API_READ_TOKEN` đúng chưa
- Đảm bảo token có quyền **Read**
- Tạo token mới nếu cần

#### **Lỗi: "AUTH_SECRET is missing"**

**Giải pháp:**
- Thêm `AUTH_SECRET` vào environment variables
- Tạo secret mới bằng `openssl rand -base64 32`
- Redeploy

#### **Lỗi: "NEXTAUTH_URL is not set"**

**Giải pháp:**
- Thêm `NEXTAUTH_URL` với URL đúng của website
- Đảm bảo có `https://` cho production
- Redeploy

#### **Lỗi: Build fails với TypeScript errors**

**Giải pháp:**
- Kiểm tra `tsconfig.json`
- Fix các TypeScript errors trong code
- Test build local trước: `npm run build`

#### **Lỗi: Images không hiển thị**

**Giải pháp:**
- Kiểm tra `next.config.mjs` có cấu hình `remotePatterns` cho Sanity
- Đảm bảo Sanity images có public access
- Kiểm tra URL của images trong Sanity

### 7.4. Test Checklist

Sau khi deploy, kiểm tra:

- [ ] Website load được
- [ ] Home page hiển thị đúng
- [ ] Blog listing page hoạt động
- [ ] Blog detail page hiển thị content
- [ ] Search và filter hoạt động
- [ ] Author pages load được
- [ ] Dark/Light mode toggle hoạt động
- [ ] Sign In/Sign Up hoạt động
- [ ] Contact form submit được
- [ ] Newsletter form hoạt động
- [ ] Images từ Sanity hiển thị
- [ ] Mobile responsive

---

## 8. Custom Domain (Tùy Chọn)

### 8.1. Thêm Custom Domain

1. Vào **Settings** → **Domains**
2. Click **"Add Domain"**
3. Nhập domain của bạn (ví dụ: `blogforge.com`)
4. Click **"Add"**

### 8.2. Cấu Hình DNS

Vercel sẽ hướng dẫn cấu hình DNS:

1. **Nếu dùng Vercel DNS:**
   - Thêm các records mà Vercel yêu cầu
   - Chờ DNS propagate (5-30 phút)

2. **Nếu dùng DNS provider khác:**
   - Thêm A record hoặc CNAME record
   - Point về Vercel (theo hướng dẫn)

### 8.3. Cập Nhật NEXTAUTH_URL

Sau khi domain hoạt động:
- Cập nhật `NEXTAUTH_URL` = `https://yourdomain.com`
- Redeploy

---

## 9. Production Best Practices

### 9.1. Security

- ✅ Sử dụng HTTPS only
- ✅ Set strong `AUTH_SECRET`
- ✅ Không commit `.env.local` lên Git
- ✅ Validate tất cả user inputs
- ✅ Sử dụng CORS đúng cách

### 9.2. Performance

- ✅ Enable Image Optimization trong Vercel
- ✅ Sử dụng CDN cho static assets
- ✅ Optimize bundle size
- ✅ Monitor Core Web Vitals

### 9.3. Monitoring

- ✅ Set up error tracking (Sentry)
- ✅ Monitor analytics
- ✅ Track performance metrics
- ✅ Set up uptime monitoring

---

## 10. Hỗ Trợ

### Tài Liệu Tham Khảo

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

### Liên Hệ

- Vercel Support: [vercel.com/help](https://vercel.com/help)
- GitHub Issues: Tạo issue trên repository

---

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
