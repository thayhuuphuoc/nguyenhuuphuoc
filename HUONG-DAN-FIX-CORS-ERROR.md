# Hướng Dẫn Khắc Phục Lỗi CORS Origin Error

## ❌ Lỗi: CorsOriginError

Lỗi này xảy ra khi **Sanity Studio** cố gắng kết nối đến Sanity API nhưng bị chặn bởi **CORS policy**.

---

## 🔍 Nguyên Nhân

Sanity project của bạn chưa được cấu hình để cho phép requests từ `http://localhost:3000` (hoặc domain bạn đang dùng).

---

## ✅ Giải Pháp

### Bước 1: Truy Cập Sanity Manage

1. Vào [sanity.io/manage](https://sanity.io/manage)
2. Đăng nhập với tài khoản Sanity
3. Chọn project của bạn (có Project ID: `vn57pgjz`)

### Bước 2: Cấu Hình CORS Origins

1. Vào **Settings** (icon bánh răng) → **API** → **CORS origins**
2. Click **"Add CORS origin"**
3. Thêm các origins sau:

   **Development (Local):**
   ```
   http://localhost:3000
   http://localhost:3334
   ```

   **Nếu dùng port khác:**
   ```
   http://localhost:3001
   http://localhost:3333
   ```

   **Production (Khi deploy):**
   ```
   https://your-domain.vercel.app
   https://your-domain.com
   ```

4. **Quan trọng:** Bật các options:
   - ✅ **Allow credentials**
   - ✅ **Allow browser extensions**

5. Click **"Save"**

### Bước 3: Restart Development Server

Sau khi cấu hình CORS:

```bash
# Dừng server (Ctrl+C)
# Chạy lại
npm run dev
```

### Bước 4: Kiểm Tra

1. Truy cập: `http://localhost:3000/studio`
2. Lỗi CORS sẽ biến mất
3. Studio sẽ load thành công

---

## 🔧 Cách Khác: Sử Dụng Studio Standalone

Nếu vẫn gặp vấn đề với CORS, bạn có thể chạy Studio riêng:

### Bước 1: Cài Đặt Sanity CLI

```bash
npm install -g @sanity/cli
```

### Bước 2: Login vào Sanity

```bash
sanity login
```

### Bước 3: Chạy Studio

```bash
npm run studio
# Hoặc
sanity dev --port 3333
```

### Bước 4: Truy Cập Studio

Mở trình duyệt và vào:
```
http://localhost:3333
```

---

## 📝 Checklist CORS Origins

Thêm các origins sau vào Sanity project:

- [ ] `http://localhost:3000` (Development)
- [ ] `http://localhost:3001` (Nếu dùng port khác)
- [ ] `http://localhost:3333` (Studio standalone)
- [ ] `https://your-domain.vercel.app` (Production - thay bằng domain thực tế)
- [ ] `https://your-domain.com` (Production - nếu có custom domain)

**Options:**
- [ ] ✅ Allow credentials
- [ ] ✅ Allow browser extensions

---

## 🆘 Vẫn Gặp Lỗi?

### Lỗi vẫn còn sau khi thêm CORS origins?

**Giải pháp:**
1. ✅ Đảm bảo đã click **"Save"** sau khi thêm origins
2. ✅ Đảm bảo đã bật **"Allow credentials"**
3. ✅ **Restart development server**
4. ✅ Xóa cache trình duyệt (Ctrl+Shift+Delete)
5. ✅ Thử truy cập lại Studio

### Lỗi: "Invalid origin"

**Giải pháp:**
- Đảm bảo URL chính xác (không có dấu `/` ở cuối)
- Đảm bảo protocol đúng (`http://` cho local, `https://` cho production)

### Lỗi: "Cannot connect to Sanity"

**Giải pháp:**
- Kiểm tra `NEXT_PUBLIC_SANITY_PROJECT_ID` trong `.env.local`
- Kiểm tra kết nối internet
- Kiểm tra Sanity project có đang hoạt động không

---

## 🎯 Quick Fix

1. Vào [sanity.io/manage](https://sanity.io/manage)
2. Chọn project → **Settings** → **API** → **CORS origins**
3. Thêm `http://localhost:3000`
4. Bật **"Allow credentials"**
5. Click **"Save"**
6. Restart server: `npm run dev`
7. Truy cập: `http://localhost:3000/studio`

---

**Chúc bạn thành công! 🎉**

