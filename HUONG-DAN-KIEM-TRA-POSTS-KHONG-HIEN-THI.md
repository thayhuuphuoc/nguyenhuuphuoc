# Hướng Dẫn Kiểm Tra: Posts Không Hiển Thị Trên Website

## ❌ Vấn Đề

Đã tạo posts trên Sanity nhưng không hiển thị trên website.

---

## 🔍 Các Nguyên Nhân Có Thể

### 1. Posts Chưa Được Publish ⚠️ (Phổ Biến Nhất)

**Vấn đề:** Posts đang ở trạng thái **draft**, chưa được **publish**.

**Giải pháp:**
1. Vào Sanity Studio
2. Mở post cần publish
3. Click nút **"Publish"** (màu xanh) ở góc trên bên phải
4. Xác nhận publish

**Lưu ý:**
- ✅ Posts phải ở trạng thái **Published** mới hiển thị trên website
- ✅ Draft posts chỉ hiển thị khi bật **Preview Mode**

### 2. Environment Variables Trên Vercel Chưa Đúng

**Vấn đề:** Environment variables trên Vercel không đúng hoặc chưa được set.

**Kiểm tra:**
1. Vào Vercel Dashboard
2. Chọn project
3. Vào **Settings** → **Environment Variables**
4. Kiểm tra các biến sau:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
NEXT_PUBLIC_SANITY_DATASET=myblogdataset
SANITY_API_READ_TOKEN=your_token
```

**Giải pháp:**
- Đảm bảo tất cả biến đã được set
- Đảm bảo dataset name đúng (`myblogdataset` hoặc `production`)
- **Redeploy** sau khi sửa environment variables

### 3. Dataset Name Không Đúng

**Vấn đề:** Dataset name trong environment variables không khớp với dataset trong Sanity.

**Kiểm tra:**
1. Vào Sanity Studio
2. Vào **Settings** → **API**
3. Kiểm tra **Dataset name** (thường là `production` hoặc `myblogdataset`)

**Giải pháp:**
- Đảm bảo `NEXT_PUBLIC_SANITY_DATASET` trên Vercel khớp với dataset trong Sanity
- Hoặc sửa code để dùng dataset mặc định `production`

### 4. Query Không Đúng

**Vấn đề:** Query không filter đúng hoặc thiếu fields.

**Kiểm tra:**
- Query hiện tại: `*[_type == "post"]`
- Query này lấy tất cả posts (published và draft)
- Với `perspective: "published"`, chỉ lấy published posts

**Giải pháp:**
- Đảm bảo posts đã được publish
- Hoặc kiểm tra query có filter đúng không

### 5. Build Cache

**Vấn đề:** Vercel đang cache build cũ.

**Giải pháp:**
1. Vào Vercel Dashboard
2. Chọn project
3. Vào **Deployments**
4. Click **"Redeploy"** (hoặc **"Redeploy"** với **"Use existing Build Cache"** = OFF)

---

## ✅ Checklist Kiểm Tra

### Trong Sanity Studio:

- [ ] Posts đã được **Publish** (không phải draft)
- [ ] Dataset name đúng (`myblogdataset` hoặc `production`)
- [ ] Posts có đầy đủ thông tin:
  - [ ] Title
  - [ ] Slug
  - [ ] Author (đã được publish)
  - [ ] Categories (đã được publish)
  - [ ] Published date

### Trên Vercel:

- [ ] Environment variables đã được set:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET=myblogdataset` (hoặc `production`)
  - [ ] `SANITY_API_READ_TOKEN` (có giá trị)
- [ ] Đã **Redeploy** sau khi sửa environment variables

### Kiểm Tra Website:

- [ ] Truy cập: `https://your-domain.vercel.app/`
- [ ] Kiểm tra console browser (F12) có lỗi không
- [ ] Kiểm tra Network tab xem có requests đến Sanity API không

---

## 🔧 Các Bước Khắc Phục

### Bước 1: Kiểm Tra Posts Đã Publish Chưa

1. Vào Sanity Studio: `http://localhost:3334`
2. Mở tab **Posts**
3. Kiểm tra status của mỗi post:
   - ✅ **Published**: Có badge "Published"
   - ❌ **Draft**: Không có badge, cần click **"Publish"**

### Bước 2: Kiểm Tra Environment Variables Trên Vercel

1. Vào [vercel.com](https://vercel.com)
2. Chọn project
3. Vào **Settings** → **Environment Variables**
4. Kiểm tra và sửa nếu cần:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
   NEXT_PUBLIC_SANITY_DATASET=myblogdataset
   SANITY_API_READ_TOKEN=your_token_here
   ```
5. Click **"Save"**
6. **Redeploy** project

### Bước 3: Kiểm Tra Dataset Name

1. Vào Sanity Studio
2. Vào **Settings** → **API**
3. Kiểm tra **Dataset name**
4. Đảm bảo `NEXT_PUBLIC_SANITY_DATASET` trên Vercel khớp với dataset name

### Bước 4: Redeploy Vercel

1. Vào Vercel Dashboard
2. Chọn project
3. Vào **Deployments**
4. Click **"Redeploy"** (không dùng cache)

### Bước 5: Kiểm Tra Lại Website

1. Đợi deployment hoàn tất
2. Truy cập website
3. Kiểm tra posts đã hiển thị chưa

---

## 🎯 Quick Fix

**Nếu posts chưa hiển thị, thử theo thứ tự:**

1. ✅ **Publish tất cả posts** trong Sanity Studio
2. ✅ **Kiểm tra environment variables** trên Vercel
3. ✅ **Redeploy** Vercel project
4. ✅ **Kiểm tra lại website**

---

## 🆘 Vẫn Không Hiển Thị?

### Debug Steps:

1. **Kiểm tra Console Browser:**
   - Mở F12 → Console
   - Tìm lỗi liên quan đến Sanity API

2. **Kiểm tra Network Tab:**
   - Mở F12 → Network
   - Tìm requests đến `cdn.sanity.io`
   - Kiểm tra response có data không

3. **Kiểm tra Vercel Logs:**
   - Vào Vercel Dashboard
   - Chọn project → **Logs**
   - Tìm lỗi liên quan đến Sanity

4. **Test Query Trực Tiếp:**
   - Vào Sanity Vision (trong Studio)
   - Chạy query: `*[_type == "post"]`
   - Kiểm tra có trả về data không

---

**Chúc bạn thành công! 🎉**

