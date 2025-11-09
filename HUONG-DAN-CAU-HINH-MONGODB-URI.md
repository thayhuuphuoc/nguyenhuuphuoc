# Hướng Dẫn Cấu Hình MONGODB_URI

## 🔧 Vấn Đề Với Connection String

Connection string của bạn:
```
mongodb+srv://huuphuoc:<Phu@c1981>@phuocblog.a5xkigw.mongodb.net/?appName=Phuocblog
```

**Các vấn đề:**
1. ❌ Password có ký tự đặc biệt (`@`) cần được URL encode
2. ❌ Thiếu database name trong connection string
3. ❌ Có ký tự `<` và `>` không cần thiết

## ✅ Giải Pháp

### Bước 1: URL Encode Password

Password của bạn: `Phu@c1981`

**Ký tự đặc biệt cần encode:**
- `@` → `%40`
- `<` → `%3C`
- `>` → `%3E`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`
- `?` → `%3F`
- `/` → `%2F`
- `:` → `%3A`
- `;` → `%3B`

**Password sau khi encode:**
```
Phu@c1981 → Phu%40c1981
```

### Bước 2: Thêm Database Name

Thêm tên database vào connection string (ví dụ: `myblog`):

```
mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
```

### Bước 3: Cấu Hình Trong .env.local

Thêm vào file `.env.local`:

```env
MONGODB_URI=mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
```

## 🛠️ Cách URL Encode Password

### Cách 1: Dùng JavaScript (Browser Console)

1. Mở browser console (F12)
2. Chạy lệnh:
   ```javascript
   encodeURIComponent('Phu@c1981')
   // Kết quả: "Phu%40c1981"
   ```

### Cách 2: Dùng Online Tool

1. Truy cập: https://www.urlencoder.org/
2. Paste password: `Phu@c1981`
3. Click "Encode"
4. Copy kết quả: `Phu%40c1981`

### Cách 3: Dùng PowerShell

```powershell
[System.Web.HttpUtility]::UrlEncode("Phu@c1981")
# Kết quả: "Phu%40c1981"
```

## 📝 Connection String Đúng Format

### Format Chuẩn:

```
mongodb+srv://username:encoded_password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

### Ví Dụ Của Bạn:

```env
MONGODB_URI=mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
```

**Giải thích:**
- `huuphuoc` - Username
- `Phu%40c1981` - Password đã encode (`Phu@c1981`)
- `phuocblog.a5xkigw.mongodb.net` - Cluster
- `myblog` - Database name (bạn có thể đổi thành tên khác)
- `?retryWrites=true&w=majority` - Options

## 🔍 Kiểm Tra Connection String

### Bước 1: Test Connection

Sau khi cấu hình, restart server và kiểm tra logs:

```bash
npm run dev
```

**Logs mong đợi:**
```
✅ Connected to MongoDB
```

**Nếu có lỗi:**
```
❌ MongoDB connection error: ...
```

### Bước 2: Test Đăng Ký

1. Vào `/sign-up`
2. Đăng ký tài khoản mới
3. Kiểm tra logs trong console
4. Kiểm tra MongoDB Atlas → Database → Browse Collections → `users`

### Bước 3: Test Đăng Nhập

1. Vào `/sign-in`
2. Đăng nhập với tài khoản vừa đăng ký
3. Kiểm tra logs trong console

## 🐛 Troubleshooting

### Lỗi: "Authentication failed"

**Nguyên nhân:** Password không đúng hoặc chưa encode

**Giải pháp:**
1. Kiểm tra password đã encode chưa
2. Thử encode lại password
3. Kiểm tra username có đúng không

### Lỗi: "Database not found"

**Nguyên nhân:** Database name không tồn tại

**Giải pháp:**
1. MongoDB Atlas sẽ tự động tạo database khi có dữ liệu
2. Hoặc tạo database trước trong MongoDB Atlas
3. Kiểm tra database name trong connection string

### Lỗi: "Connection timeout"

**Nguyên nhân:** Network issues hoặc IP chưa được whitelist

**Giải pháp:**
1. Kiểm tra Network Access trong MongoDB Atlas
2. Whitelist IP của bạn (hoặc cho phép 0.0.0.0/0)
3. Kiểm tra firewall

## 📋 Checklist

- [ ] Password đã được URL encode
- [ ] Connection string có database name
- [ ] Connection string không có ký tự `<` và `>`
- [ ] Đã thêm MONGODB_URI vào `.env.local`
- [ ] Restart server sau khi sửa
- [ ] Kiểm tra logs: `✅ Connected to MongoDB`
- [ ] Test đăng ký tài khoản mới
- [ ] Test đăng nhập với tài khoản đã đăng ký
- [ ] Kiểm tra user trong MongoDB Atlas

## 💡 Tips

1. **Database Name:** Bạn có thể đặt tên database bất kỳ (ví dụ: `myblog`, `phuocblog`, `blog`)
2. **Password:** Nếu đổi password trong MongoDB Atlas, nhớ encode lại
3. **Security:** Không commit file `.env.local` lên Git
4. **Testing:** Test với demo users trước, sau đó test với database

## 🎯 Tóm Tắt

1. **Encode password:** `Phu@c1981` → `Phu%40c1981`
2. **Thêm database name:** `myblog`
3. **Connection string đúng:**
   ```
   mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
   ```
4. **Thêm vào .env.local:**
   ```env
   MONGODB_URI=mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
   ```
5. **Restart server và test**



