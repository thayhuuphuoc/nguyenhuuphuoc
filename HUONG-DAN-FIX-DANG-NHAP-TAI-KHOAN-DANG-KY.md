# Hướng Dẫn Sửa Lỗi Đăng Nhập Với Tài Khoản Đăng Ký

## 🚨 Vấn Đề

- ✅ Đăng nhập với tài khoản demo được
- ❌ Đăng nhập với tài khoản đăng ký không được

## 🔍 Nguyên Nhân Có Thể

1. **MongoDB Connection String sai format**
   - Password có ký tự đặc biệt chưa được URL encode
   - Thiếu database name
   
2. **User không được lưu vào database**
   - Lỗi khi đăng ký
   - Database connection failed
   
3. **Password không khớp**
   - Password không được hash đúng
   - Password input không đúng

## ✅ Giải Pháp

### Bước 1: Sửa MongoDB Connection String

Connection string của bạn:
```
mongodb+srv://huuphuoc:<Phu@c1981>@phuocblog.a5xkigw.mongodb.net/?appName=Phuocblog
```

**Vấn đề:**
1. Password `Phu@c1981` có ký tự `@` cần encode thành `%40`
2. Thiếu database name (ví dụ: `myblog`)
3. Có ký tự `<` và `>` không cần thiết

**Connection string đúng:**
```env
MONGODB_URI=mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
```

**Cách encode password:**
- Mở browser console (F12)
- Chạy: `encodeURIComponent('Phu@c1981')`
- Kết quả: `Phu%40c1981`

### Bước 2: Cập Nhật File .env.local

1. **Mở file `.env.local`**

2. **Cập nhật MONGODB_URI:**
   ```env
   MONGODB_URI=mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
   ```

3. **Lưu file**

### Bước 3: Restart Server

```bash
# Dừng server
Ctrl + C

# Chạy lại
npm run dev
```

### Bước 4: Kiểm Tra Connection

Sau khi restart, kiểm tra logs trong console:

**Nếu thành công:**
```
✅ Connected to MongoDB
```

**Nếu có lỗi:**
```
❌ MongoDB connection error: ...
```

### Bước 5: Test Đăng Ký

1. **Vào `/sign-up`**
2. **Đăng ký tài khoản mới:**
   - Name: Tên của bạn
   - Email: email@example.com
   - Password: mật khẩu (ít nhất 6 ký tự)
3. **Kiểm tra logs trong console:**
   ```
   Creating user with email: email@example.com
   User created successfully with ID: ...
   User verification: { isHashed: true, ... }
   ```
4. **Kiểm tra MongoDB Atlas:**
   - Vào MongoDB Atlas Dashboard
   - Database → Browse Collections
   - Tìm collection `users`
   - Xem user mới đã được tạo chưa

### Bước 6: Test Đăng Nhập

1. **Vào `/sign-in`**
2. **Đăng nhập với tài khoản vừa đăng ký**
3. **Kiểm tra logs trong console:**
   ```
   🔍 Login attempt: { email: 'email@example.com', ... }
   📊 Database connected, searching in database...
   ✅ User found in database: { ... }
   🔐 Password validation result: true
   ```

## 🐛 Troubleshooting

### Lỗi: "User not found in database"

**Kiểm tra:**
1. User có được tạo trong MongoDB Atlas không?
2. Email có đúng không? (case-sensitive)
3. Database connection có hoạt động không?

**Giải pháp:**
1. Kiểm tra MongoDB Atlas → Database → Browse Collections → `users`
2. Xem logs khi đăng ký có lỗi không
3. Thử đăng ký lại với email khác

### Lỗi: "Password mismatch"

**Kiểm tra:**
1. Password có đúng không?
2. Password có được hash không? (kiểm tra trong MongoDB Atlas)
3. Logs có hiển thị `isHashed: true` khi đăng ký không?

**Giải pháp:**
1. Kiểm tra password trong database (phải bắt đầu với `$2`)
2. Thử đăng nhập lại với password chính xác
3. Nếu vẫn lỗi, thử đăng ký lại với password mới

### Lỗi: "MongoDB connection error"

**Kiểm tra:**
1. MONGODB_URI có đúng format không?
2. Password đã được encode chưa?
3. Database name có đúng không?
4. Network Access trong MongoDB Atlas đã được config chưa?

**Giải pháp:**
1. Kiểm tra và sửa MONGODB_URI (xem Bước 1)
2. Kiểm tra Network Access trong MongoDB Atlas (whitelist IP)
3. Thử connection string mới từ MongoDB Atlas

## 📋 Checklist

- [ ] MONGODB_URI đã được sửa (password encoded, có database name)
- [ ] File `.env.local` đã được cập nhật
- [ ] Server đã được restart
- [ ] Logs hiển thị "✅ Connected to MongoDB"
- [ ] Đã test đăng ký tài khoản mới
- [ ] User đã được tạo trong MongoDB Atlas
- [ ] Đã test đăng nhập với tài khoản đã đăng ký
- [ ] Logs hiển thị "✅ User found in database"
- [ ] Logs hiển thị "🔐 Password validation result: true"

## 💡 Tips

1. **Kiểm tra logs chi tiết:** Xem console logs khi đăng ký và đăng nhập
2. **Kiểm tra MongoDB Atlas:** Xác nhận user đã được tạo
3. **Test với demo users trước:** Đảm bảo code hoạt động
4. **Sử dụng email đơn giản:** Tránh ký tự đặc biệt khi test

## 🎯 Tóm Tắt

1. **Sửa MONGODB_URI:**
   - Encode password: `Phu@c1981` → `Phu%40c1981`
   - Thêm database name: `myblog`
   - Format đúng: `mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority`

2. **Cập nhật .env.local:**
   - Thêm MONGODB_URI đã sửa

3. **Restart server:**
   - `Ctrl + C` → `npm run dev`

4. **Test:**
   - Đăng ký tài khoản mới
   - Kiểm tra trong MongoDB Atlas
   - Đăng nhập với tài khoản đã đăng ký

## 📞 Cần Hỗ Trợ?

Nếu vẫn gặp lỗi:

1. **Xem logs chi tiết** trong console
2. **Kiểm tra MongoDB Atlas** để xác nhận user
3. **Thử đăng ký lại** với email/password mới
4. **Kiểm tra connection string** một lần nữa



