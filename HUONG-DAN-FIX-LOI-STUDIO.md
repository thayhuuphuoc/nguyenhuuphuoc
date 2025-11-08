# Hướng Dẫn Khắc Phục Lỗi NextStudio

## ❌ Lỗi: Configuration must contain `projectId`

Lỗi này xảy ra khi **NextStudio** không nhận được `projectId` từ config.

---

## 🔍 Nguyên Nhân

1. **File `.env.local` chưa được tạo** hoặc không có giá trị `NEXT_PUBLIC_SANITY_PROJECT_ID`
2. **Environment variables chưa được load** - Next.js chưa đọc file `.env.local`
3. **Config không đúng** - `sanity.config.ts` không nhận được giá trị từ environment variables

---

## ✅ Giải Pháp

### Bước 1: Tạo File .env.local

1. **Tạo file `.env.local`** trong thư mục root của project (có dấu chấm ở đầu!)

2. **Điền các giá trị:**
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
   NEXT_PUBLIC_SANITY_DATASET=myblogdataset
   SANITY_API_READ_TOKEN=skOaM35SKWJkUYH9x0EdPhPqMgMIELWm83Vjtg6NlCbhNtalzg4BPXdDjvJnGoCRysWB1M3eMbza60n8PwV4UXivozXFpUaH45kkj6bWgThvHYgIs7ZHsJhfuQ8jwRHvZeDxz1nMiHfbkLYvxg1MjEwv6ZNV2UYFPvzPhVgrour2jxlWOOZw
   SANITY_PREVIEW_SECRET=12345
   AUTH_SECRET=e91f8bc9aa4bff4818b1351d79887eb1
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Lưu file** (đảm bảo tên file là `.env.local` với dấu chấm ở đầu)

### Bước 2: Restart Development Server

**QUAN TRỌNG:** Sau khi tạo/sửa file `.env.local`, bạn **PHẢI restart server**:

```bash
# Dừng server (Ctrl+C)
# Chạy lại
npm run dev
```

**Lý do:** Next.js chỉ đọc `.env.local` khi server khởi động. Nếu bạn sửa file khi server đang chạy, phải restart.

### Bước 3: Kiểm Tra

1. **Kiểm tra console:**
   - Không có cảnh báo về missing `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - Server chạy thành công

2. **Truy cập Studio:**
   - Mở: `http://localhost:3000/studio`
   - Studio sẽ hiển thị nếu config đúng

---

## 🔧 Troubleshooting

### Lỗi vẫn còn sau khi tạo .env.local?

**Giải pháp:**
1. ✅ Đảm bảo file tên là `.env.local` (có dấu chấm ở đầu)
2. ✅ Đảm bảo file ở thư mục root (cùng cấp với `package.json`)
3. ✅ Đảm bảo không có khoảng trắng thừa trong file
4. ✅ **Restart development server** (QUAN TRỌNG!)
5. ✅ Xóa cache: `rm -rf .next` và chạy lại `npm run dev`

### Lỗi: "Cannot find module 'next-sanity/studio'"

**Giải pháp:**
```bash
npm install next-sanity@latest
```

### Lỗi: "Config is not a function" hoặc tương tự

**Giải pháp:**
- Kiểm tra file `sanity.config.ts` có export đúng không
- Đảm bảo `defineConfig` được import từ `sanity`

---

## 📝 Checklist

- [ ] Đã tạo file `.env.local` (có dấu chấm ở đầu)
- [ ] Đã điền `NEXT_PUBLIC_SANITY_PROJECT_ID` vào file
- [ ] Đã điền `NEXT_PUBLIC_SANITY_DATASET` vào file
- [ ] Đã điền `SANITY_API_READ_TOKEN` vào file
- [ ] Đã điền `SANITY_PREVIEW_SECRET` vào file
- [ ] File `.env.local` ở thư mục root
- [ ] **Đã restart development server** (QUAN TRỌNG!)
- [ ] Đã kiểm tra console không có lỗi
- [ ] Đã truy cập `http://localhost:3000/studio`

---

## 🎯 Quick Fix

1. **Tạo file `.env.local`** với nội dung từ file `env.local` (đã có sẵn)
2. **Đổi tên** từ `env.local` → `.env.local` (thêm dấu chấm)
3. **Sửa** `NEXTAUTH_URL_LOCALHOST` → `NEXTAUTH_URL`
4. **Restart server**: `npm run dev`
5. **Truy cập**: `http://localhost:3000/studio`

---

**Chúc bạn thành công! 🎉**

