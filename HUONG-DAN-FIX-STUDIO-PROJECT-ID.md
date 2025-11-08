# Hướng Dẫn Khắc Phục Lỗi: Configuration must contain `projectId` trong Studio Standalone

## ❌ Lỗi: Configuration must contain `projectId`

Lỗi này xảy ra khi chạy **Studio standalone** (`npm run studio`) - Sanity CLI không đọc được `projectId` từ environment variables.

---

## 🔍 Nguyên Nhân

**Sanity CLI** (khi chạy `npm run studio`) **không tự động đọc file `.env.local`**. Nó cần:
- File `.env` (không có `.local`)
- Hoặc environment variables được set trực tiếp
- Hoặc hardcode trong `sanity.config.ts` (không khuyến nghị)

---

## ✅ Giải Pháp

### Cách 1: Tạo File .env (Khuyến nghị)

1. **Tạo file `.env`** trong thư mục root (cùng cấp với `package.json`)

2. **Copy nội dung từ `.env.local`**:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
   NEXT_PUBLIC_SANITY_DATASET=myblogdataset
   SANITY_API_READ_TOKEN=skOaM35SKWJkUYH9x0EdPhPqMgMIELWm83Vjtg6NlCbhNtalzg4BPXdDjvJnGoCRysWB1M3eMbza60n8PwV4UXivozXFpUaH45kkj6bWgThvHYgIs7ZHsJhfuQ8jwRHvZeDxz1nMiHfbkLYvxg1MjEwv6ZNV2UYFPvzPhVgrour2jxlWOOZw
   SANITY_PREVIEW_SECRET=12345
   AUTH_SECRET=e91f8bc9aa4bff4818b1351d79887eb1
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Lưu file** (đảm bảo tên file là `.env` - không có `.local`)

4. **Chạy Studio:**
   ```bash
   npm run studio
   ```

### Cách 2: Hardcode Project ID (Tạm thời - Không khuyến nghị)

Nếu cần test nhanh, có thể hardcode trong `sanity.config.ts`:

```typescript
export default defineConfig({
  projectId: "vn57pgjz", // Hardcode - chỉ dùng để test
  dataset: "myblogdataset",
  // ...
})
```

⚠️ **Lưu ý:** Không commit hardcoded values vào Git!

### Cách 3: Sử dụng Environment Variables trực tiếp

**Windows (PowerShell):**
```powershell
$env:NEXT_PUBLIC_SANITY_PROJECT_ID="vn57pgjz"
$env:NEXT_PUBLIC_SANITY_DATASET="myblogdataset"
npm run studio
```

**Mac/Linux:**
```bash
export NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
export NEXT_PUBLIC_SANITY_DATASET=myblogdataset
npm run studio
```

---

## 📝 Đã Cập Nhật sanity.config.ts

Đã cập nhật `sanity.config.ts` để:
- Đọc từ `NEXT_PUBLIC_SANITY_PROJECT_ID` hoặc `SANITY_STUDIO_PROJECT_ID`
- Hiển thị cảnh báo nếu không tìm thấy projectId
- Hỗ trợ cả Next.js và Sanity CLI

---

## ✅ Checklist

- [ ] Đã tạo file `.env` (không có `.local`)
- [ ] Đã copy giá trị từ `.env.local` sang `.env`
- [ ] Đã đảm bảo `NEXT_PUBLIC_SANITY_PROJECT_ID` có giá trị
- [ ] Đã chạy `npm run studio`
- [ ] Đã truy cập `http://localhost:3333`
- [ ] Studio hiển thị không còn lỗi

---

## 🔒 Lưu Ý Bảo Mật

### File .env vs .env.local

- **`.env.local`**: Next.js đọc (đã có trong `.gitignore`)
- **`.env`**: Sanity CLI đọc (cần thêm vào `.gitignore`)

### Kiểm Tra .gitignore

Đảm bảo file `.gitignore` có:
```
.env
.env.local
.env*.local
```

---

## 🎯 Quick Fix

1. **Tạo file `.env`** với nội dung:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
   NEXT_PUBLIC_SANITY_DATASET=myblogdataset
   ```

2. **Chạy Studio:**
   ```bash
   npm run studio
   ```

3. **Truy cập:** `http://localhost:3333`

---

## 🆘 Vẫn Gặp Lỗi?

### Lỗi: "Cannot find module"

**Giải pháp:**
- Đảm bảo đã chạy `npm install` sau khi sửa
- Kiểm tra `node_modules` có tồn tại không

### Lỗi: "Project ID is empty"

**Giải pháp:**
- Kiểm tra file `.env` có đúng tên không (không có `.local`)
- Kiểm tra giá trị `NEXT_PUBLIC_SANITY_PROJECT_ID` có đúng không
- Restart terminal và chạy lại `npm run studio`

---

**Chúc bạn thành công! 🎉**

