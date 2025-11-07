# 🚀 Hướng Dẫn Deploy Nhanh Lên Vercel

Hướng dẫn tóm tắt để deploy BlogForge lên Vercel trong 10 phút.

## Bước 1: Push Code Lên GitHub (2 phút)

```bash
# Nếu chưa có Git
git init
git add .
git commit -m "Initial commit"

# Tạo repository trên GitHub, sau đó:
git remote add origin https://github.com/YOUR_USERNAME/blog-forge.git
git branch -M main
git push -u origin main
```

## Bước 2: Deploy Lên Vercel (3 phút)

1. Vào [vercel.com](https://vercel.com) → **Sign Up** (dùng GitHub)
2. Click **"Add New Project"**
3. Chọn repository `blog-forge`
4. Click **"Deploy"** (để mặc định các settings)
5. Chờ deploy xong → Copy URL

## Bước 3: Cấu Hình Sanity (2 phút)

1. Vào [sanity.io](https://www.sanity.io) → Tạo project mới
2. Lấy **Project ID** và **Dataset** từ Settings → API
3. Tạo **API Token** với quyền Read

## Bước 4: Thêm Environment Variables (2 phút)

Vào Vercel Dashboard → Settings → Environment Variables:

### Sanity:
```
NEXT_PUBLIC_SANITY_PROJECT_ID = [Project ID]
NEXT_PUBLIC_SANITY_DATASET = production
SANITY_API_READ_TOKEN = [API Token]
SANITY_PREVIEW_SECRET = [Bất kỳ chuỗi nào]
```

### NextAuth:
```
AUTH_SECRET = [Tạo tại: https://generate-secret.vercel.app/32]
NEXTAUTH_URL = https://your-project.vercel.app
```

**Chọn Environment:** Production, Preview, Development (cả 3)

## Bước 5: Redeploy (1 phút)

1. Vào **Deployments**
2. Click **"..."** → **"Redeploy"**
3. Chờ xong → Test website

## ✅ Xong!

Website của bạn đã live tại: `https://your-project.vercel.app`

### Test Credentials:
- Email: `admin@blogforge.com`
- Password: `admin123`

---

**Gặp lỗi?** Xem hướng dẫn chi tiết trong [DEPLOYMENT.md](./DEPLOYMENT.md)

