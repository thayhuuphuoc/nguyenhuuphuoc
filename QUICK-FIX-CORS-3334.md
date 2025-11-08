# Quick Fix: Thêm CORS Origin cho Port 3334

## ⚠️ Lỗi: CORS Origin Required

Bạn cần thêm `http://localhost:3334` vào CORS origins trong Sanity project.

---

## ✅ Các Bước (2 phút)

### Bước 1: Truy Cập Sanity Manage

1. Vào [sanity.io/manage](https://sanity.io/manage)
2. Đăng nhập với tài khoản Sanity
3. Chọn project của bạn (Project ID: `vn57pgjz`)

### Bước 2: Thêm CORS Origin

1. Vào **Settings** (icon bánh răng) → **API** → **CORS origins**
2. Click **"Add CORS origin"**
3. Thêm URL:
   ```
   http://localhost:3334
   ```
4. **Bật các options:**
   - ✅ **Allow credentials**
   - ✅ **Allow browser extensions** (nếu có)
5. Click **"Save"**

### Bước 3: Kiểm Tra

1. **Refresh Studio:** Nhấn F5 trong trình duyệt
2. **Hoặc restart Studio:**
   ```bash
   # Dừng server (Ctrl+C)
   npm run studio
   ```
3. **Truy cập:** `http://localhost:3334`
4. ✅ Studio sẽ hoạt động bình thường!

---

## 📝 CORS Origins Cần Thêm

Thêm các origins sau vào Sanity project:

- ✅ `http://localhost:3000` (Next.js app)
- ✅ `http://localhost:3334` (Sanity Studio standalone)

**Options cho mỗi origin:**
- ✅ Allow credentials
- ✅ Allow browser extensions

---

## 🎯 Quick Steps

1. Vào [sanity.io/manage](https://sanity.io/manage)
2. Chọn project → **Settings** → **API** → **CORS origins**
3. Click **"Add CORS origin"**
4. Thêm `http://localhost:3334`
5. Bật **"Allow credentials"**
6. Click **"Save"**
7. Refresh Studio (F5)

---

## ✅ Checklist

- [ ] Đã vào sanity.io/manage
- [ ] Đã chọn đúng project
- [ ] Đã vào Settings → API → CORS origins
- [ ] Đã thêm `http://localhost:3334`
- [ ] Đã bật "Allow credentials"
- [ ] Đã click "Save"
- [ ] Đã refresh Studio
- [ ] Studio hoạt động bình thường

---

**Sau khi thêm CORS origin, Studio sẽ hoạt động ngay! 🎉**

