# Hướng Dẫn Khắc Phục Lỗi npm install

## ❌ Lỗi: ERESOLVE unable to resolve dependency tree

Lỗi này xảy ra do **xung đột phiên bản** giữa React 19.2.0 và một số packages chưa hỗ trợ React 19.

---

## ✅ Giải Pháp

### Cách 1: Sử dụng --legacy-peer-deps (Khuyến nghị - Nhanh nhất)

```bash
npm install --legacy-peer-deps
```

**Giải thích:**
- Flag `--legacy-peer-deps` bỏ qua việc kiểm tra peer dependencies
- Cho phép cài đặt các packages ngay cả khi có xung đột phiên bản
- Thường hoạt động tốt và không gây vấn đề

### Cách 2: Sử dụng --force

```bash
npm install --force
```

**Lưu ý:**
- Có thể gây ra các vấn đề không mong muốn
- Chỉ sử dụng nếu `--legacy-peer-deps` không hoạt động

### Cách 3: Sử dụng pnpm (Khuyến nghị cho project này)

```bash
# Cài đặt pnpm
npm install -g pnpm

# Cài đặt dependencies
pnpm install
```

**Lợi ích:**
- pnpm xử lý peer dependencies tốt hơn
- Nhanh hơn npm
- Project đã có `pnpm-lock.yaml`

### Cách 4: Cấu hình npm để luôn dùng --legacy-peer-deps

Tạo file `.npmrc` trong thư mục root:

```
legacy-peer-deps=true
```

Sau đó chạy:
```bash
npm install
```

---

## 🎯 Khuyến Nghị

### Bước 1: Thử Cách 1 (--legacy-peer-deps)

```bash
npm install --legacy-peer-deps
```

### Bước 2: Nếu không được, thử Cách 3 (pnpm)

```bash
npm install -g pnpm
pnpm install
```

### Bước 3: Sau khi cài đặt thành công

```bash
# Nếu dùng npm
npm run dev

# Nếu dùng pnpm
pnpm dev
```

---

## 📝 Đã Cập Nhật package.json

Đã cập nhật `vaul` từ `^0.9.9` lên `^1.1.1` (version mới hơn có thể hỗ trợ React 19 tốt hơn).

---

## 🔧 Tạo File .npmrc (Tùy chọn)

Để tránh phải nhớ flag mỗi lần, tạo file `.npmrc`:

```
legacy-peer-deps=true
```

Sau đó chạy `npm install` bình thường.

---

## ✅ Checklist

- [ ] Đã thử `npm install --legacy-peer-deps`
- [ ] Hoặc đã cài đặt pnpm và chạy `pnpm install`
- [ ] Đã kiểm tra folder `node_modules` tồn tại
- [ ] Đã chạy `npm run dev` (hoặc `pnpm dev`) thành công
- [ ] Đã truy cập `http://localhost:3000`

---

## 🆘 Vẫn Gặp Lỗi?

### Lỗi: "Cannot find module" sau khi cài đặt

**Giải pháp:**
```bash
# Xóa và cài lại
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Lỗi: "Out of memory"

**Giải pháp:**
```bash
# Tăng memory limit
set NODE_OPTIONS=--max-old-space-size=4096
npm install --legacy-peer-deps
```

### Lỗi: "Permission denied"

**Giải pháp:**
- Windows: Chạy terminal với quyền Administrator
- Mac/Linux: Fix permissions hoặc dùng `sudo` (không khuyến nghị)

---

**Chúc bạn thành công! 🎉**

