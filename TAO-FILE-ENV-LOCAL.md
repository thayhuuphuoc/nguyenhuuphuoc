# Hướng Dẫn Tạo File .env.local

## ✅ Đã Tạo Template File

File `env.local.template` đã được tạo sẵn. Bây giờ bạn cần:

---

## 📋 Các Bước

### Bước 1: Copy Template File

**Trên Windows (PowerShell hoặc Command Prompt):**
```powershell
# Từ thư mục project
copy env.local.template .env.local
```

**Trên Mac/Linux:**
```bash
# Từ thư mục project
cp env.local.template .env.local
```

**Hoặc thủ công:**
1. Mở file `env.local.template`
2. Copy toàn bộ nội dung
3. Tạo file mới tên `.env.local` (có dấu chấm ở đầu)
4. Paste nội dung vào

### Bước 2: Điền Thông Tin Thực Tế

Mở file `.env.local` và thay thế các giá trị placeholder:

#### 1. NEXT_PUBLIC_SANITY_PROJECT_ID

1. Vào [sanity.io/manage](https://sanity.io/manage)
2. Chọn project của bạn
3. Vào **Settings** → **API**
4. Copy **Project ID**
5. Thay thế trong `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=vn57pgjz
   ```
   (Thay `vn57pgjz` bằng Project ID thực tế của bạn)

#### 2. NEXT_PUBLIC_SANITY_DATASET

Thường là `production`, nhưng kiểm tra lại trong Sanity Dashboard:
```
NEXT_PUBLIC_SANITY_DATASET=production
```

#### 3. SANITY_API_READ_TOKEN

1. Vẫn trong **Settings** → **API**
2. Scroll xuống phần **"Tokens"**
3. Click **"Add API token"**
4. Đặt tên: `Production Read Token`
5. Chọn quyền: **"Read"**
6. Click **"Save"**
7. **Copy token ngay** (chỉ hiển thị 1 lần!)
8. Thay thế trong `.env.local`:
   ```
   SANITY_API_READ_TOKEN=skxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### 4. SANITY_PREVIEW_SECRET

Tạo một chuỗi ngẫu nhiên bất kỳ:
```
SANITY_PREVIEW_SECRET=my-secret-preview-key-123
```
(Có thể dùng bất kỳ chuỗi nào, nhưng nên dùng chuỗi ngẫu nhiên mạnh)

#### 5. AUTH_SECRET

**Tạo bằng OpenSSL:**

**Windows (PowerShell):**
```powershell
openssl rand -base64 32
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

**Hoặc sử dụng online tool:**
- Vào [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)
- Copy secret được tạo
- Thay thế trong `.env.local`:
  ```
  AUTH_SECRET=abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ==
  ```

#### 6. NEXTAUTH_URL

Để mặc định cho development:
```
NEXTAUTH_URL=http://localhost:3000
```

---

## ✅ File .env.local Hoàn Chỉnh

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

## 🔒 Lưu Ý Bảo Mật

### ⚠️ QUAN TRỌNG:

1. **File `.env.local` đã được thêm vào `.gitignore`**
   - Không được commit vào Git
   - Chứa thông tin nhạy cảm

2. **KHÔNG chia sẻ file `.env.local`**
   - Giữ bí mật các giá trị
   - Chỉ chia sẻ với người cần thiết

---

## ✅ Kiểm Tra

Sau khi tạo và điền file `.env.local`:

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
   - Có thể truy cập Studio tại `http://localhost:3000/studio`

---

## 🆘 Troubleshooting

### Không tìm thấy file .env.local?
- ✅ Đảm bảo file tên là `.env.local` (có dấu chấm ở đầu)
- ✅ Đảm bảo file ở thư mục root của project
- ✅ Kiểm tra file có được ẩn không (trên Windows: View → Show hidden files)

### Environment variables không được nhận?
- ✅ Đảm bảo không có khoảng trắng thừa
- ✅ Đảm bảo không có dấu ngoặc kép thừa
- ✅ Restart development server
- ✅ Kiểm tra không có lỗi syntax trong file

---

## 📚 Xem Thêm

- `HUONG-DAN-ENV-LOCAL.md` - Hướng dẫn chi tiết về từng biến
- `QUICK-START-STUDIO.md` - Hướng dẫn truy cập Studio
- `HUONG-DAN-THEM-DU-LIEU-SANITY.md` - Hướng dẫn thêm dữ liệu

---

**Chúc bạn thành công! 🎉**

