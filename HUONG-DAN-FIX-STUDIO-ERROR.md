# Hướng Dẫn Khắc Phục Lỗi Sanity Studio

## ❌ Lỗi: Declared dependency `styled-components` has an invalid version range: `latest`

Lỗi này xảy ra khi **Sanity CLI** không thể validate dependencies có version `latest`. Sanity CLI yêu cầu **version cụ thể** (ví dụ: `^6.1.13`).

---

## ✅ Giải Pháp

### Đã Sửa Trong package.json

Đã thay đổi các packages từ `latest` sang version cụ thể:

- ✅ `styled-components`: `latest` → `^6.1.13`
- ✅ `@sanity/client`: `latest` → `^6.15.0`
- ✅ `@sanity/vision`: `latest` → `^3.2.0`
- ✅ `next-sanity`: `latest` → `^7.1.0`
- ✅ `sanity`: `latest` → `^3.62.0`

### Bước 1: Cài Đặt Lại Dependencies

```bash
npm install
```

Hoặc nếu vẫn gặp lỗi:

```bash
npm install --legacy-peer-deps
```

### Bước 2: Chạy Studio

```bash
npm run studio
```

Hoặc:

```bash
sanity dev --port 3333
```

### Bước 3: Truy Cập Studio

Mở trình duyệt và vào:
```
http://localhost:3333
```

---

## 🔧 Troubleshooting

### Lỗi vẫn còn sau khi sửa?

**Giải pháp:**
1. ✅ Xóa `node_modules` và `package-lock.json`:
   ```bash
   # Windows
   rmdir /s node_modules
   del package-lock.json
   
   # Mac/Linux
   rm -rf node_modules
   rm package-lock.json
   ```

2. ✅ Cài đặt lại:
   ```bash
   npm install --legacy-peer-deps
   ```

3. ✅ Chạy lại Studio:
   ```bash
   npm run studio
   ```

### Lỗi: "Cannot find module"

**Giải pháp:**
- Đảm bảo đã chạy `npm install` sau khi sửa `package.json`
- Kiểm tra `node_modules` có tồn tại không

### Lỗi: "React version conflict"

**Giải pháp:**
- Nếu gặp lỗi về React version, có thể cần downgrade React về version 18
- Hoặc dùng `--legacy-peer-deps` khi cài đặt

---

## 📝 Checklist

- [ ] Đã sửa `package.json` (thay `latest` → version cụ thể)
- [ ] Đã chạy `npm install` (hoặc `npm install --legacy-peer-deps`)
- [ ] Đã cài đặt Sanity CLI: `npm install -g @sanity/cli`
- [ ] Đã login vào Sanity: `sanity login`
- [ ] Đã chạy `npm run studio`
- [ ] Đã truy cập `http://localhost:3333`

---

## 🎯 Quick Fix

1. **Đã sửa package.json** (thay `latest` → version cụ thể)
2. **Cài đặt lại:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Chạy Studio:**
   ```bash
   npm run studio
   ```
4. **Truy cập:** `http://localhost:3333`

---

**Chúc bạn thành công! 🎉**

