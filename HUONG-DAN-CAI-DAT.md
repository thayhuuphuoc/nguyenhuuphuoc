# Hướng Dẫn Cài Đặt Dependencies

## ❌ Lỗi: 'next' is not recognized

Lỗi này xảy ra khi **dependencies chưa được cài đặt**. Bạn cần cài đặt các packages trước khi chạy `npm run dev`.

---

## 📋 Các Bước Cài Đặt

### Bước 1: Kiểm tra Package Manager

Project này có thể sử dụng **pnpm** hoặc **npm**. Kiểm tra:

1. **Nếu có file `pnpm-lock.yaml`** → Dùng **pnpm**
2. **Nếu có file `package-lock.json`** → Dùng **npm**
3. **Nếu không có cả hai** → Có thể dùng **npm** hoặc **pnpm**

### Bước 2: Cài Đặt Dependencies

#### Cách 1: Sử dụng npm (Khuyến nghị nếu chưa có pnpm)

```bash
# Từ thư mục project
npm install
```

#### Cách 2: Sử dụng pnpm (Nếu đã cài pnpm)

```bash
# Cài đặt pnpm nếu chưa có
npm install -g pnpm

# Cài đặt dependencies
pnpm install
```

#### Cách 3: Sử dụng yarn (Nếu thích)

```bash
# Cài đặt yarn nếu chưa có
npm install -g yarn

# Cài đặt dependencies
yarn install
```

---

## ✅ Sau Khi Cài Đặt

### Bước 1: Kiểm tra

Đảm bảo folder `node_modules` đã được tạo:

```bash
# Kiểm tra folder node_modules có tồn tại không
dir node_modules
# Hoặc
ls node_modules
```

### Bước 2: Chạy Development Server

```bash
# Nếu dùng npm
npm run dev

# Nếu dùng pnpm
pnpm dev

# Nếu dùng yarn
yarn dev
```

### Bước 3: Truy cập

Mở trình duyệt và vào:
- Website: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`

---

## 🔧 Troubleshooting

### Lỗi: "npm is not recognized"

**Giải pháp:**
1. **Cài đặt Node.js:**
   - Tải từ [nodejs.org](https://nodejs.org/)
   - Cài đặt phiên bản LTS (khuyến nghị: v18 hoặc v20)
   - Restart terminal sau khi cài đặt

2. **Kiểm tra cài đặt:**
   ```bash
   node --version
   npm --version
   ```

### Lỗi: "Permission denied" hoặc "EACCES"

**Giải pháp:**
- **Windows**: Chạy terminal với quyền Administrator
- **Mac/Linux**: Dùng `sudo` (không khuyến nghị) hoặc fix permissions

### Lỗi: "Cannot find module" sau khi cài đặt

**Giải pháp:**
1. Xóa `node_modules` và `package-lock.json` (hoặc `pnpm-lock.yaml`):
   ```bash
   # Windows
   rmdir /s node_modules
   del package-lock.json
   
   # Mac/Linux
   rm -rf node_modules
   rm package-lock.json
   ```

2. Cài đặt lại:
   ```bash
   npm install
   ```

### Lỗi: "Out of memory" khi cài đặt

**Giải pháp:**
1. Tăng memory limit cho Node.js:
   ```bash
   # Windows (PowerShell)
   $env:NODE_OPTIONS="--max-old-space-size=4096"
   npm install
   ```

2. Hoặc cài đặt từng phần:
   ```bash
   npm install --legacy-peer-deps
   ```

---

## 📝 Checklist

- [ ] Đã cài đặt Node.js (v18 hoặc v20)
- [ ] Đã kiểm tra `node --version` và `npm --version`
- [ ] Đã chạy `npm install` (hoặc `pnpm install`)
- [ ] Đã kiểm tra folder `node_modules` tồn tại
- [ ] Đã chạy `npm run dev` thành công
- [ ] Đã truy cập `http://localhost:3000`

---

## 🎯 Quick Start

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy development server
npm run dev

# 3. Mở trình duyệt
# - Website: http://localhost:3000
# - Studio: http://localhost:3000/studio
```

---

## 📚 Tài Liệu Tham Khảo

- [Node.js Installation](https://nodejs.org/)
- [npm Documentation](https://docs.npmjs.com/)
- [pnpm Documentation](https://pnpm.io/)

---

**Chúc bạn thành công! 🎉**

