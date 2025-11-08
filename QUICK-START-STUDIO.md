# 🚀 Quick Start: Truy Cập Sanity Studio

## ✅ Đã Setup Xong!

Studio đã được tích hợp vào Next.js app. Bạn có thể truy cập ngay!

---

## 📋 Các Bước

### Bước 1: Kiểm tra Environment Variables

Đảm bảo file `.env.local` có các biến:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_PREVIEW_SECRET=your_preview_secret
```

### Bước 2: Chạy Development Server

```bash
npm run dev
```

### Bước 3: Truy Cập Studio

Mở trình duyệt và vào:
```
http://localhost:3000/studio
```

✅ **Xong! Studio sẽ hiển thị và bạn có thể bắt đầu thêm dữ liệu.**

---

## 🎯 Sau Khi Truy Cập Studio

1. **Tạo Categories** (5-6 categories)
2. **Tạo Authors** (1 author)
3. **Tạo Posts** (6-10 posts)
4. **Publish tất cả**

Xem hướng dẫn chi tiết: `HUONG-DAN-THEM-DU-LIEU-SANITY.md`

---

## ❓ Gặp Vấn Đề?

### Studio không hiển thị?
- Kiểm tra đã chạy `npm run dev` chưa
- Kiểm tra environment variables
- Kiểm tra console có lỗi không

### Không thấy schemas?
- Kiểm tra file `sanity.config.ts`
- Kiểm tra folder `schemaTypes/`
- Restart development server

### Lỗi Project ID?
- Kiểm tra `.env.local` có `NEXT_PUBLIC_SANITY_PROJECT_ID` không
- Đảm bảo Project ID đúng

---

**Chúc bạn thành công! 🎉**

