# Hướng Dẫn Cấu Hình .env.local

## ✅ Đã Tạo File .env.local

File `.env.local` đã được tạo sẵn cho bạn. Bây giờ bạn cần điền các giá trị thực tế.

---

## 📋 Các Bước Cấu Hình

### Bước 1: Mở File .env.local

Mở file `.env.local` trong thư mục root của project.

### Bước 2: Điền Thông Tin Sanity CMS

#### 2.1. Lấy NEXT_PUBLIC_SANITY_PROJECT_ID

1. Vào [sanity.io/manage](https://sanity.io/manage)
2. Đăng nhập với tài khoản Sanity
3. Chọn project của bạn
4. Vào **Settings** (icon bánh răng) → **API**
5. Copy **Project ID**
6. Dán vào `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
   ```
   (Thay `vn57pgjz` bằng Project ID thực tế của bạn)

#### 2.2. Lấy NEXT_PUBLIC_SANITY_DATASET

1. Vẫn trong **Settings** → **API**
2. Tìm **Dataset** (thường là `production`)
3. Điền vào `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
   (Hoặc tên dataset khác nếu bạn đã tạo)

#### 2.3. Tạo SANITY_API_READ_TOKEN

1. Vẫn trong **Settings** → **API**
2. Scroll xuống phần **"Tokens"**
3. Click **"Add API token"**
4. Đặt tên: `Production Read Token`
5. Chọn quyền: **"Read"** (đủ cho preview mode)
6. Click **"Save"**
7. **Copy token ngay** (chỉ hiển thị 1 lần!)
8. Dán vào `.env.local`:
   ```
   SANITY_API_READ_TOKEN=skxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   (Thay bằng token thực tế của bạn)

#### 2.4. Tạo SANITY_PREVIEW_SECRET

1. Tạo một chuỗi ngẫu nhiên bất kỳ (ví dụ: `my-secret-preview-key-123`)
2. Điền vào `.env.local`:
   ```
   SANITY_PREVIEW_SECRET=my-secret-preview-key-123
   ```
   (Có thể dùng bất kỳ chuỗi nào, nhưng nên dùng chuỗi ngẫu nhiên mạnh)

### Bước 3: Điền Thông Tin NextAuth

#### 3.1. Tạo AUTH_SECRET

**Trên Windows (PowerShell):**
```powershell
# Nếu có OpenSSL:
openssl rand -base64 32

# Hoặc sử dụng online tool:
# https://generate-secret.vercel.app/32
```

**Trên Mac/Linux:**
```bash
openssl rand -base64 32
```

**Hoặc sử dụng online:**
- Vào [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
- Copy secret được tạo
- Dán vào `.env.local`:
  ```
  AUTH_SECRET=your_generated_secret_here
  ```

#### 3.2. Điền NEXTAUTH_URL

- **Development**: `http://localhost:3000` (đã có sẵn)
- **Production**: URL của website (ví dụ: `https://your-domain.vercel.app`)

---

## 📝 File .env.local Hoàn Chỉnh

Sau khi điền xong, file `.env.local` sẽ trông như thế này:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=skxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SANITY_PREVIEW_SECRET=my-secret-preview-key-123

# NextAuth Configuration
AUTH_SECRET=abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ==
NEXTAUTH_URL=http://localhost:3000
```

---

## ✅ Kiểm Tra

Sau khi điền xong:

1. **Lưu file** `.env.local`
2. **Restart development server**:
   ```bash
   # Dừng server (Ctrl+C)
   # Chạy lại
   npm run dev
   ```
3. **Kiểm tra console**:
   - Không có cảnh báo về missing environment variables
   - Server chạy thành công

---

## 🔒 Lưu Ý Bảo Mật

### ⚠️ QUAN TRỌNG:

1. **KHÔNG commit file `.env.local` vào Git**
   - File này đã được thêm vào `.gitignore`
   - Chứa thông tin nhạy cảm (API tokens, secrets)

2. **KHÔNG chia sẻ file `.env.local`**
   - Giữ bí mật các giá trị trong file này
   - Chỉ chia sẻ với người cần thiết

3. **Sử dụng `.env.local.example` cho team**
   - File `.env.local.example` có thể commit vào Git
   - Chứa template với placeholder values
   - Team members copy và điền giá trị thực tế

---

## 🎯 Checklist

- [ ] Đã lấy `NEXT_PUBLIC_SANITY_PROJECT_ID` từ Sanity Dashboard
- [ ] Đã lấy `NEXT_PUBLIC_SANITY_DATASET` từ Sanity Dashboard
- [ ] Đã tạo `SANITY_API_READ_TOKEN` trong Sanity Dashboard
- [ ] Đã tạo `SANITY_PREVIEW_SECRET` (chuỗi ngẫu nhiên)
- [ ] Đã tạo `AUTH_SECRET` (bằng openssl hoặc online tool)
- [ ] Đã điền `NEXTAUTH_URL` (http://localhost:3000 cho development)
- [ ] Đã lưu file `.env.local`
- [ ] Đã restart development server
- [ ] Đã kiểm tra không có lỗi trong console

---

## 🆘 Troubleshooting

### Lỗi: "NEXT_PUBLIC_SANITY_PROJECT_ID is not set"
- ✅ Kiểm tra đã điền giá trị vào `.env.local` chưa
- ✅ Kiểm tra tên biến có đúng không (không có khoảng trắng)
- ✅ Restart development server

### Lỗi: "Dataset not found"
- ✅ Kiểm tra `NEXT_PUBLIC_SANITY_DATASET` có đúng không
- ✅ Kiểm tra dataset có tồn tại trong Sanity project không
- ✅ Tạo dataset mới nếu cần

### Lỗi: "Invalid token"
- ✅ Kiểm tra `SANITY_API_READ_TOKEN` có đúng không
- ✅ Đảm bảo token có quyền "Read"
- ✅ Tạo token mới nếu cần

### Environment variables không được nhận
- ✅ Đảm bảo file tên là `.env.local` (có dấu chấm ở đầu)
- ✅ Đảm bảo file ở thư mục root của project
- ✅ Restart development server
- ✅ Kiểm tra không có lỗi syntax trong file

---

## 📚 Tài Liệu Tham Khảo

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)

---

**Chúc bạn thành công! 🎉**

