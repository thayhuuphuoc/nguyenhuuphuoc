# Hướng Dẫn Khắc Phục Lỗi: Port 3333 is already in use

## ❌ Lỗi: Port 3333 is already in use

Lỗi này xảy ra khi **port 3333 đã được sử dụng** bởi một process khác (thường là Sanity Studio đang chạy ở terminal khác).

---

## ✅ Giải Pháp

### Cách 1: Đổi Port (Khuyến nghị - Đã sửa)

Đã cập nhật `package.json` để sử dụng port **3334** thay vì 3333:

```json
"studio": "sanity dev --port 3334"
```

**Chạy Studio:**
```bash
npm run studio
```

**Truy cập Studio:**
```
http://localhost:3334
```

### Cách 2: Tìm và Dừng Process đang dùng Port 3333

#### Trên Windows:

1. **Tìm Process ID (PID):**
   ```cmd
   netstat -ano | findstr :3333
   ```

2. **Dừng Process:**
   ```cmd
   taskkill /PID <PID> /F
   ```
   (Thay `<PID>` bằng số PID tìm được)

3. **Hoặc dùng PowerShell:**
   ```powershell
   # Tìm process
   Get-NetTCPConnection -LocalPort 3333 | Select-Object -ExpandProperty OwningProcess
   
   # Dừng process (thay <PID> bằng số tìm được)
   Stop-Process -Id <PID> -Force
   ```

#### Trên Mac/Linux:

1. **Tìm Process:**
   ```bash
   lsof -ti:3333
   ```

2. **Dừng Process:**
   ```bash
   kill -9 $(lsof -ti:3333)
   ```

### Cách 3: Kiểm tra Terminal Khác

1. Kiểm tra các terminal đang mở
2. Tìm terminal đang chạy `npm run studio` hoặc `sanity dev`
3. Dừng process đó (Ctrl+C)

---

## 🎯 Khuyến Nghị

**Sử dụng Cách 1 (Đổi Port)** vì:
- ✅ Nhanh nhất, không cần kill process
- ✅ Có thể chạy nhiều Studio cùng lúc (nếu cần)
- ✅ Tránh xung đột với các service khác

---

## 📝 Đã Cập Nhật

- ✅ Đã đổi port từ `3333` → `3334` trong `package.json`
- ✅ Studio sẽ chạy trên port 3334

---

## ✅ Checklist

- [ ] Đã cập nhật `package.json` (port 3334)
- [ ] Đã chạy `npm run studio`
- [ ] Đã truy cập `http://localhost:3334`
- [ ] Studio hiển thị không còn lỗi port

---

## 🆘 Vẫn Gặp Lỗi?

### Lỗi: "Port 3334 is already in use"

**Giải pháp:**
- Đổi sang port khác (ví dụ: 3335, 3336)
- Hoặc dừng process đang dùng port đó

### Lỗi: "Cannot find module"

**Giải pháp:**
- Chạy `npm install` trước khi chạy Studio
- Đảm bảo `node_modules` tồn tại

---

**Chúc bạn thành công! 🎉**

