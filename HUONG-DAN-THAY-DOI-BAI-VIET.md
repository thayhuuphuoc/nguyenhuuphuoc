# Hướng Dẫn Thay Đổi Nội Dung Bài Viết Trên Website

Website sử dụng **Sanity CMS** để quản lý nội dung. Bạn có thể chỉnh sửa bài viết, tạo bài mới, hoặc xóa bài viết thông qua Sanity Studio.

## 📋 Mục Lục

1. [Truy Cập Sanity Studio](#1-truy-cập-sanity-studio)
2. [Tạo Bài Viết Mới](#2-tạo-bài-viết-mới)
3. [Chỉnh Sửa Bài Viết](#3-chỉnh-sửa-bài-viết)
4. [Xóa Bài Viết](#4-xóa-bài-viết)
5. [Publish/Unpublish Bài Viết](#5-publishunpublish-bài-viết)
6. [Quản Lý Categories và Authors](#6-quản-lý-categories-và-authors)

---

## 1. Truy Cập Sanity Studio

### Cách 1: Qua Website (Khuyến nghị)

1. Truy cập website của bạn
2. Điều hướng đến: `https://your-website.com/studio`
   - Ví dụ: `https://nguyenhuuphuoc-nguyen-huu-phuocs-projects-9e0716c3.vercel.app/studio`
3. Đăng nhập nếu được yêu cầu

### Cách 2: Qua Standalone Studio

1. Mở terminal trong thư mục project
2. Chạy lệnh:
   ```bash
   npm run studio
   ```
3. Mở trình duyệt tại: `http://localhost:3334`

---

## 2. Tạo Bài Viết Mới

### Bước 1: Mở Sanity Studio

- Truy cập `/studio` trên website hoặc chạy `npm run studio`

### Bước 2: Tạo Post Mới

1. Trong sidebar bên trái, click vào **"Post"**
2. Click nút **"Create"** hoặc **"+"** ở góc trên bên phải
3. Điền các thông tin sau:

#### **Tiêu Đề (Title)**
- Nhập tiêu đề bài viết
- Ví dụ: "Hướng dẫn sử dụng Next.js 15"

#### **Slug**
- Slug sẽ được tạo tự động từ tiêu đề
- Bạn có thể chỉnh sửa slug để URL thân thiện hơn
- Ví dụ: `huong-dan-su-dung-nextjs-15`
- **Lưu ý**: Slug phải là duy nhất và không có ký tự đặc biệt

#### **Tác Giả (Author)**
- Chọn tác giả từ dropdown
- Nếu chưa có tác giả, cần tạo tác giả trước (xem mục 6)

#### **Danh Mục (Categories)**
- Chọn một hoặc nhiều danh mục
- Ví dụ: Technology, Health, Travel, etc.
- Nếu chưa có danh mục, cần tạo danh mục trước (xem mục 6)

#### **Hình Ảnh Chính (Main Image)**
- Click vào ô "Main Image"
- Upload hình ảnh hoặc chọn từ media library
- **Khuyến nghị**: Kích thước 1200x600px hoặc tỷ lệ 2:1

#### **Tóm Tắt (Excerpt)**
- Nhập mô tả ngắn về bài viết (1-2 câu)
- Đây là phần sẽ hiển thị trong danh sách bài viết

#### **Thời Gian Đọc (Read Time)**
- Nhập số phút đọc dự kiến
- Ví dụ: `5` (5 phút)

#### **Ngày Xuất Bản (Published At)**
- Chọn ngày và giờ xuất bản
- Mặc định là thời gian hiện tại

#### **Nội Dung (Body)**
- Đây là phần nội dung chính của bài viết
- Sử dụng editor rich text để:
  - **Tiêu đề**: Chọn text và click "H2" hoặc "H3"
  - **In đậm**: `Ctrl+B` hoặc click icon **B**
  - **In nghiêng**: `Ctrl+I` hoặc click icon **I**
  - **Danh sách**: Click icon bullet hoặc numbered list
  - **Link**: Chọn text và click icon link
  - **Blockquote**: Click icon quote
  - **Code**: Click icon code để chèn code block

### Bước 3: Lưu và Publish

1. Click nút **"Publish"** ở góc trên bên phải
2. Bài viết sẽ xuất hiện trên website sau vài giây

---

## 3. Chỉnh Sửa Bài Viết

### Bước 1: Tìm Bài Viết

1. Trong Sanity Studio, click **"Post"** trong sidebar
2. Tìm bài viết bạn muốn chỉnh sửa trong danh sách
3. Click vào bài viết để mở editor

### Bước 2: Chỉnh Sửa Nội Dung

1. Thay đổi các trường cần thiết:
   - Tiêu đề
   - Slug (nếu cần)
   - Nội dung (Body)
   - Hình ảnh
   - Danh mục
   - Tóm tắt
   - etc.

2. **Lưu ý**: 
   - Thay đổi sẽ được lưu tự động khi bạn chỉnh sửa
   - Nếu bài viết đã được publish, bạn cần click **"Publish"** lại để cập nhật trên website

### Bước 3: Xem Trước (Preview)

1. Click nút **"Inspect"** (biểu tượng kính lúp) để xem metadata
2. Để xem preview trên website:
   - Click nút **"Open preview"** (nếu có)
   - Hoặc truy cập trực tiếp: `https://your-website.com/blog/your-slug`

---

## 4. Xóa Bài Viết

### Cách 1: Unpublish (Ẩn Bài Viết)

1. Mở bài viết cần ẩn
2. Click nút **"Unpublish"** ở góc trên bên phải
3. Bài viết sẽ không hiển thị trên website nhưng vẫn còn trong Sanity

### Cách 2: Xóa Vĩnh Viễn

1. Mở bài viết cần xóa
2. Click menu **"..."** (3 chấm) ở góc trên bên phải
3. Chọn **"Delete"**
4. Xác nhận xóa
5. **Lưu ý**: Hành động này không thể hoàn tác!

---

## 5. Publish/Unpublish Bài Viết

### Publish Bài Viết

1. Mở bài viết trong Sanity Studio
2. Đảm bảo đã điền đầy đủ thông tin:
   - Title
   - Slug
   - Author
   - Published At
   - Body (nội dung)
3. Click nút **"Publish"** (màu xanh) ở góc trên bên phải
4. Bài viết sẽ xuất hiện trên website sau vài giây

### Unpublish Bài Viết

1. Mở bài viết đã được publish
2. Click nút **"Unpublish"** (màu vàng/cam)
3. Bài viết sẽ ẩn khỏi website nhưng vẫn còn trong Sanity
4. Bạn có thể publish lại bất cứ lúc nào

---

## 6. Quản Lý Categories và Authors

### Tạo Category Mới

1. Trong sidebar, click **"Category"**
2. Click nút **"Create"** hoặc **"+"**
3. Điền thông tin:
   - **Title**: Tên danh mục (ví dụ: "Technology")
   - **Slug**: URL-friendly name (ví dụ: "technology")
   - **Description**: Mô tả danh mục (tùy chọn)
4. Click **"Publish"**

### Tạo Author Mới

1. Trong sidebar, click **"Author"**
2. Click nút **"Create"** hoặc **"+"**
3. Điền thông tin:
   - **Name**: Tên tác giả
   - **Slug**: URL-friendly name
   - **Image**: Ảnh đại diện (khuyến nghị: 400x400px)
   - **Role**: Vai trò (ví dụ: "Staff Writer", "Guest Author")
   - **Bio**: Tiểu sử tác giả (sử dụng rich text editor)
   - **Email**: Email liên hệ (tùy chọn)
4. Click **"Publish"**

---

## 7. Tips và Best Practices

### ✅ Nên Làm

1. **Viết tiêu đề hấp dẫn**: Tiêu đề ngắn gọn, rõ ràng, thu hút
2. **Sử dụng hình ảnh chất lượng**: Hình ảnh rõ nét, kích thước phù hợp
3. **Tối ưu Slug**: Slug ngắn gọn, mô tả nội dung, không có ký tự đặc biệt
4. **Viết Excerpt hay**: Tóm tắt ngắn gọn, hấp dẫn để người đọc muốn đọc tiếp
5. **Chọn Categories phù hợp**: Phân loại đúng để dễ tìm kiếm
6. **Publish đúng thời điểm**: Chọn ngày giờ publish phù hợp

### ❌ Không Nên

1. **Không để trống các trường bắt buộc**: Title, Slug, Author, Body
2. **Không sử dụng slug trùng lặp**: Mỗi bài viết phải có slug duy nhất
3. **Không upload hình ảnh quá lớn**: Tối ưu hình ảnh trước khi upload
4. **Không publish mà không kiểm tra**: Đọc lại nội dung trước khi publish

---

## 8. Xử Lý Sự Cố

### Bài viết không hiển thị trên website

1. **Kiểm tra Publish status**:
   - Đảm bảo bài viết đã được **"Publish"**
   - Không phải ở chế độ **"Draft"**

2. **Kiểm tra Published At**:
   - Ngày publish không được ở tương lai
   - Nếu ngày ở tương lai, bài viết sẽ chưa hiển thị

3. **Kiểm tra Slug**:
   - Slug không được trùng với bài viết khác
   - Slug không có ký tự đặc biệt

4. **Refresh website**:
   - Clear cache trình duyệt
   - Hoặc đợi vài phút để website cập nhật

### Không thể truy cập Sanity Studio

1. **Kiểm tra URL**:
   - Đảm bảo URL đúng: `/studio`
   - Kiểm tra xem có lỗi CORS không

2. **Kiểm tra Environment Variables**:
   - Đảm bảo `.env.local` có đầy đủ thông tin:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `SANITY_API_READ_TOKEN`

3. **Kiểm tra CORS Settings**:
   - Vào [sanity.io/manage](https://sanity.io/manage)
   - Chọn project
   - Settings → API → CORS origins
   - Đảm bảo đã thêm domain của bạn

---

## 9. Tài Liệu Tham Khảo

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Studio Guide](https://www.sanity.io/docs/sanity-studio)

---

## 10. Liên Hệ Hỗ Trợ

Nếu gặp vấn đề khi thay đổi nội dung, vui lòng:
1. Kiểm tra lại các bước trên
2. Xem phần "Xử Lý Sự Cố"
3. Liên hệ với developer nếu vấn đề vẫn chưa được giải quyết

---

**Chúc bạn thành công trong việc quản lý nội dung website! 🎉**

