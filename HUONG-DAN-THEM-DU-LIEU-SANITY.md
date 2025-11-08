# Hướng Dẫn Chi Tiết: Thêm Dữ Liệu Vào Sanity CMS

## Mục Lục
1. [Truy Cập Sanity Studio](#1-truy-cập-sanity-studio)
2. [Tạo Categories (Danh Mục)](#2-tạo-categories-danh-mục)
3. [Tạo Authors (Tác Giả)](#3-tạo-authors-tác-giả)
4. [Tạo Posts (Bài Viết)](#4-tạo-posts-bài-viết)
5. [Publish Content](#5-publish-content)
6. [Kiểm Tra Dữ Liệu](#6-kiểm-tra-dữ-liệu)
7. [Lưu Ý Quan Trọng](#7-lưu-ý-quan-trọng)

---

## 1. Truy Cập Sanity Studio

### ✅ Cách 1: Sử dụng Studio tích hợp trong Next.js (Khuyến nghị - Đã setup sẵn)

1. **Kiểm tra Environment Variables:**
   - Đảm bảo file `.env.local` có các biến:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `SANITY_API_READ_TOKEN`
     - `SANITY_PREVIEW_SECRET`

2. **Chạy Development Server:**
   ```bash
   npm run dev
   ```

3. **Truy cập Studio:**
   - Mở trình duyệt và vào: `http://localhost:3000/studio`
   - ✅ **Studio sẽ hiển thị ngay tại route `/studio`!**

### Cách 2: Deploy Studio lên Sanity (Cho Production)

1. **Cài đặt Sanity CLI:**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login vào Sanity:**
   ```bash
   sanity login
   ```

3. **Deploy Studio:**
   ```bash
   # Từ thư mục project
   sanity deploy
   ```

4. **Truy cập Studio:**
   - Studio sẽ được deploy lên: `https://[PROJECT_ID].sanity.studio`
   - Bạn sẽ nhận được URL sau khi deploy

### Cách 3: Chạy Studio riêng (Standalone)

1. **Cài đặt Sanity CLI:**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login vào Sanity:**
   ```bash
   sanity login
   ```

3. **Khởi chạy Studio:**
   ```bash
   npm run studio
   # Hoặc
   sanity dev --port 3333
   ```

4. **Truy cập Studio:**
   - Mở trình duyệt và vào: `http://localhost:3333`

---

## 2. Tạo Categories (Danh Mục)

### Bước 1: Tạo Category Mới

1. **Trong Sanity Studio:**
   - Click vào **"Category"** trong menu bên trái
   - Click nút **"Create new"** hoặc **"+"**

2. **Điền thông tin:**
   - **Title**: Tên danh mục (ví dụ: "Technology", "Health", "Travel")
   - **Slug**: Sẽ tự động tạo từ Title (hoặc nhập thủ công)
     - Ví dụ: "technology", "health", "travel"
   - **Description**: Mô tả ngắn về danh mục (optional)

3. **Lưu:**
   - Click nút **"Publish"** ở góc trên bên phải

### Bước 2: Tạo Nhiều Categories

Tạo ít nhất 5-6 categories phổ biến:

- **Technology** (slug: "technology")
- **Health** (slug: "health")
- **Travel** (slug: "travel")
- **Lifestyle** (slug: "lifestyle")
- **Culture** (slug: "culture")
- **Knowledge** (slug: "knowledge")

### Lưu Ý:
- ✅ **Slug** phải là chữ thường, không dấu, không khoảng trắng
- ✅ Mỗi category cần có **Title** và **Slug**
- ✅ Nhớ **Publish** sau khi tạo

---

## 3. Tạo Authors (Tác Giả)

### Bước 1: Tạo Author Mới

1. **Trong Sanity Studio:**
   - Click vào **"Author"** trong menu bên trái
   - Click nút **"Create new"** hoặc **"+"**

2. **Điền thông tin:**
   - **Name**: Tên tác giả (ví dụ: "Nguyen Huu Phuoc")
   - **Slug**: Sẽ tự động tạo từ Name (ví dụ: "nguyen-huu-phuoc")
   - **Image**: Upload ảnh đại diện (optional nhưng nên có)
     - Click "Select" → Upload image → Crop nếu cần
   - **Bio**: Tiểu sử ngắn (optional)
   - **Role**: Vai trò (ví dụ: "Blogger", "Writer", "Developer")
   - **Email**: Email liên hệ (optional)

3. **Lưu:**
   - Click nút **"Publish"** ở góc trên bên phải

### Bước 2: Tạo Author Chính

Tạo ít nhất 1 author (có thể là chính bạn):

- **Name**: "Nguyen Huu Phuoc"
- **Slug**: "nguyen-huu-phuoc"
- **Image**: Upload ảnh đại diện
- **Role**: "Blogger" hoặc "Writer"
- **Bio**: "Personal blog sharing insights and stories"
- **Email**: Email của bạn (optional)

### Lưu Ý:
- ✅ **Name** là bắt buộc
- ✅ **Slug** sẽ tự động tạo từ Name
- ✅ Nên upload **Image** để hiển thị đẹp trên website
- ✅ Nhớ **Publish** sau khi tạo

---

## 4. Tạo Posts (Bài Viết)

### Bước 1: Tạo Post Mới

1. **Trong Sanity Studio:**
   - Click vào **"Blog Post"** trong menu bên trái
   - Click nút **"Create new"** hoặc **"+"**

2. **Điền thông tin cơ bản:**
   - **Title**: Tiêu đề bài viết (ví dụ: "Top Articles to Read on Technology")
   - **Slug**: Sẽ tự động tạo từ Title
     - Ví dụ: "top-articles-to-read-on-technology"
   - **Excerpt**: Mô tả ngắn (2-3 câu)
     - Ví dụ: "Discover the latest technology trends and insights in this comprehensive guide."
   - **Published at**: Ngày xuất bản
     - Click vào field → Chọn ngày và giờ
     - **QUAN TRỌNG**: Phải set ngày này thì post mới hiển thị!

3. **Chọn Author:**
   - Click vào **"Author"**
   - Chọn author đã tạo ở bước 3
   - Nếu chưa có, quay lại tạo Author trước

4. **Chọn Categories:**
   - Click vào **"Categories"**
   - Click **"Add item"**
   - Chọn 1 hoặc nhiều categories
   - Có thể chọn nhiều categories cho 1 post

5. **Upload Main Image:**
   - Click vào **"Main image"**
   - Click **"Select"** → Upload image
   - Crop nếu cần (recommended: 1200x600px)
   - Click **"Set"**

6. **Viết Nội Dung (Body):**
   - Click vào **"Body"**
   - Sử dụng editor để viết nội dung
   - Có thể:
     - Thêm headings (H1, H2, H3)
     - Thêm paragraphs
     - Thêm lists (bullet, numbered)
     - Thêm links
     - Thêm images
     - Thêm code blocks
   - Viết nội dung đầy đủ cho bài viết

7. **Reading Time:**
   - **Reading Time (in minutes)**: Số phút đọc (ví dụ: 5, 10, 15)
   - Tính toán dựa trên độ dài nội dung
   - Ví dụ: 1000 từ ≈ 4-5 phút

### Bước 2: Tạo Nhiều Posts

Tạo ít nhất **6-10 posts** để trang chủ hiển thị đầy đủ:

#### Post 1: Featured Article
- **Title**: "Top Articles to Read on Technology"
- **Category**: Technology
- **Author**: Nguyen Huu Phuoc
- **Published at**: Ngày gần đây
- **Reading Time**: 5
- **Main Image**: Upload ảnh công nghệ
- **Body**: Viết nội dung đầy đủ

#### Post 2: Featured Article
- **Title**: "Technical Blogging - A Skill with Many Benefits"
- **Category**: Technology
- **Author**: Nguyen Huu Phuoc
- **Published at**: Ngày gần đây
- **Reading Time**: 7
- **Main Image**: Upload ảnh
- **Body**: Viết nội dung đầy đủ

#### Post 3-10: Regular Posts
- Tạo thêm 8 posts với các categories khác nhau
- Mỗi post cần:
  - Title
  - Category (ít nhất 1)
  - Author
  - Published at (QUAN TRỌNG!)
  - Main Image
  - Body (nội dung đầy đủ)
  - Reading Time

### Lưu Ý Quan Trọng:
- ✅ **Title** và **Slug** là bắt buộc
- ✅ **Published at** là BẮT BUỘC - post chỉ hiển thị khi có ngày này!
- ✅ Nên có **Main Image** để hiển thị đẹp
- ✅ **Body** nên có nội dung đầy đủ (ít nhất 500 từ)
- ✅ Nhớ **Publish** sau khi tạo

---

## 5. Publish Content

### Bước 1: Publish từng item

1. **Sau khi tạo/chỉnh sửa:**
   - Click nút **"Publish"** ở góc trên bên phải
   - Hoặc nhấn `Ctrl+P` (Windows) / `Cmd+P` (Mac)

2. **Xác nhận:**
   - Click **"Publish"** trong dialog
   - Status sẽ chuyển từ "Draft" → "Published"

### Bước 2: Kiểm tra Published Status

- ✅ Icon xanh lá: Đã Published
- ⚠️ Icon vàng: Draft (chưa publish)
- ❌ Icon đỏ: Có lỗi

### Lưu Ý:
- ✅ **Chỉ những content đã Published mới hiển thị trên website!**
- ✅ Draft chỉ hiển thị khi dùng Preview Mode
- ✅ Nên publish ngay sau khi tạo để kiểm tra

---

## 6. Kiểm Tra Dữ Liệu

### Bước 1: Kiểm tra trong Sanity Studio

1. **Kiểm tra Posts:**
   - Vào **"Blog Post"**
   - Đếm số posts đã Published
   - Nên có ít nhất 6-10 posts

2. **Kiểm tra Authors:**
   - Vào **"Author"**
   - Đảm bảo có ít nhất 1 author

3. **Kiểm tra Categories:**
   - Vào **"Category"**
   - Đảm bảo có ít nhất 5-6 categories

### Bước 2: Kiểm tra trên Website

1. **Refresh trang chủ:**
   - Vào website: `https://your-domain.vercel.app/`
   - Nhấn `Ctrl+F5` (hard refresh)
   - Kiểm tra xem có hiển thị:
     - ✅ Featured Articles (2 bài)
     - ✅ Recent Articles (3 bài)
     - ✅ Categories Grid (6+ bài)
     - ✅ Newsletter section

2. **Kiểm tra Console:**
   - Mở Developer Tools (F12)
   - Vào tab **Console**
   - Xem có lỗi nào không
   - Vào tab **Network**
   - Kiểm tra API calls đến Sanity

3. **Kiểm tra các trang khác:**
   - `/blog` - Xem có hiển thị posts không
   - `/author` - Xem có hiển thị authors không
   - `/blog/[slug]` - Xem có hiển thị chi tiết post không

---

## 7. Lưu Ý Quan Trọng

### ⚠️ Lỗi Thường Gặp

1. **Posts không hiển thị:**
   - ❌ Chưa set **Published at**
   - ✅ **Giải pháp**: Set ngày Published at và Publish lại

2. **Images không hiển thị:**
   - ❌ Chưa upload Main Image
   - ✅ **Giải pháp**: Upload image và set làm Main Image

3. **Categories/Authors không hiển thị:**
   - ❌ Chưa Publish
   - ✅ **Giải pháp**: Publish categories/authors trước khi tạo posts

4. **Website vẫn không có dữ liệu:**
   - ❌ Environment variables chưa đúng
   - ❌ Dataset chưa đúng
   - ✅ **Giải pháp**: Kiểm tra lại environment variables trong Vercel

### ✅ Checklist Trước Khi Kiểm Tra

- [ ] Đã tạo ít nhất 5-6 Categories và Publish
- [ ] Đã tạo ít nhất 1 Author và Publish
- [ ] Đã tạo ít nhất 6-10 Posts và Publish
- [ ] Mỗi Post đã có:
  - [ ] Title
  - [ ] Slug
  - [ ] Published at (QUAN TRỌNG!)
  - [ ] Author
  - [ ] Category (ít nhất 1)
  - [ ] Main Image
  - [ ] Body (nội dung)
  - [ ] Reading Time
- [ ] Đã Publish tất cả content
- [ ] Đã refresh website (hard refresh: Ctrl+F5)

### 🎯 Thứ Tự Tạo Dữ Liệu (Khuyến nghị)

1. **Bước 1**: Tạo Categories trước (5-6 categories)
2. **Bước 2**: Tạo Authors (1-2 authors)
3. **Bước 3**: Tạo Posts (6-10 posts)
   - Mỗi post cần reference đến Author và Categories đã tạo
4. **Bước 4**: Publish tất cả
5. **Bước 5**: Kiểm tra trên website

---

## 8. Quick Start - Tạo Dữ Liệu Mẫu Nhanh

### Tạo 3 Categories:
1. Technology (slug: technology)
2. Health (slug: health)
3. Travel (slug: travel)

### Tạo 1 Author:
- Name: Nguyen Huu Phuoc
- Slug: nguyen-huu-phuoc
- Role: Blogger
- Image: Upload ảnh

### Tạo 6 Posts:
1. "Top Articles to Read on Technology" (Category: Technology)
2. "Technical Blogging - A Skill with Many Benefits" (Category: Technology)
3. "The Top 25 Health & Wellness Blogs" (Category: Health)
4. "The Best Travel Blogs of 2024" (Category: Travel)
5. "I wish I knew this before creating a travel blog" (Category: Travel)
6. "How To Start A Travel Blog - An Easy Step By Step Guide" (Category: Travel)

**Mỗi post cần:**
- Title
- Published at (set ngày hôm nay)
- Author: Nguyen Huu Phuoc
- Category (chọn 1 trong 3 categories)
- Main Image (upload ảnh)
- Body (viết nội dung)
- Reading Time (5-10 phút)

---

## 9. Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra Console trong Developer Tools
2. Kiểm tra Network tab để xem API calls
3. Kiểm tra Sanity Studio xem content đã Published chưa
4. Kiểm tra Environment Variables trong Vercel
5. Xem lại file `HUONG-DAN-THEM-DU-LIEU-SANITY.md` này

---

## 10. Tổng Kết

Sau khi hoàn thành:
- ✅ Có ít nhất 5-6 Categories
- ✅ Có ít nhất 1 Author
- ✅ Có ít nhất 6-10 Posts
- ✅ Tất cả đã được Publish
- ✅ Website hiển thị đầy đủ các sections
- ✅ Trang chủ giống với trang mẫu

**Chúc bạn thành công! 🎉**

