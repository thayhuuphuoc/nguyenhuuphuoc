# Hướng Dẫn Test Đăng Ký Và Xem Logs

## 🔍 Vấn Đề Hiện Tại

Database đã kết nối nhưng **trống** (`Users in database: []`), có nghĩa là:
- Đăng ký có thể không thành công
- Hoặc user không được lưu vào database
- Hoặc có lỗi trong quá trình đăng ký

## ✅ Giải Pháp

### Bước 1: Test Đăng Ký Và Xem Logs

1. **Mở terminal** (nơi chạy `npm run dev`)

2. **Clear terminal** (để dễ xem logs mới):
   ```bash
   # Windows PowerShell
   Clear-Host
   ```

3. **Vào trang đăng ký:**
   - Mở browser: `http://localhost:3000/sign-up`

4. **Điền thông tin:**
   - Name: Tên của bạn
   - Email: `test@example.com` (dùng email mới)
   - Password: `test123` (ít nhất 6 ký tự)

5. **Click "Đăng ký"**

6. **Quay lại terminal** và xem logs:

### Logs Mong Đợi Khi Đăng Ký Thành Công:

```
📝 Registration request received
📋 Registration data: { name: '...', email: 'test@example.com', passwordLength: 7 }
🔌 Connecting to database...
✅ Database connected successfully
🔍 Checking if user exists: test@example.com
✅ User does not exist, creating new user...
💾 Creating user with data: { name: '...', email: 'test@example.com', role: 'user' }
✅ User created successfully with ID: 507f1f77bcf86cd799439011
✅ User verification successful: { id: '...', email: 'test@example.com', isHashed: true, ... }
✅ User found in database after creation
```

### Nếu Có Lỗi:

```
❌ Registration error: ...
❌ Error name: ...
❌ Error code: ...
❌ Error message: ...
```

## 🐛 Các Lỗi Thường Gặp

### Lỗi 1: "ValidationError"

**Logs sẽ hiển thị:**
```
❌ Validation error
❌ Validation errors: [...]
```

**Nguyên nhân:**
- Email format không đúng
- Name quá dài (> 50 ký tự)
- Password quá ngắn (< 6 ký tự)

**Giải pháp:**
- Kiểm tra format email
- Rút ngắn name
- Tăng độ dài password

### Lỗi 2: "Duplicate key error"

**Logs sẽ hiển thị:**
```
❌ Duplicate key error - email already exists
```

**Nguyên nhân:**
- Email đã tồn tại trong database

**Giải pháp:**
- Dùng email khác
- Hoặc đăng nhập với email đã có

### Lỗi 3: "Database connection failed"

**Logs sẽ hiển thị:**
```
❌ Database connection failed
```

**Nguyên nhân:**
- MongoDB connection string sai
- Network issues
- MongoDB Atlas IP whitelist chưa config

**Giải pháp:**
- Kiểm tra MONGODB_URI trong `.env.local`
- Kiểm tra Network Access trong MongoDB Atlas
- Restart server

### Lỗi 4: "User created but cannot be retrieved"

**Logs sẽ hiển thị:**
```
✅ User created successfully with ID: ...
❌ ERROR: User was created but cannot be retrieved!
```

**Nguyên nhân:**
- User được tạo nhưng không thể query lại
- Có thể do database connection issues

**Giải pháp:**
- Kiểm tra MongoDB Atlas
- Kiểm tra database connection
- Thử đăng ký lại

## 📋 Checklist Test

- [ ] Terminal đã được clear
- [ ] Đã mở trang `/sign-up`
- [ ] Đã điền đầy đủ thông tin
- [ ] Đã click "Đăng ký"
- [ ] Đã xem logs trong terminal
- [ ] Đã kiểm tra logs có lỗi không
- [ ] Đã kiểm tra MongoDB Atlas (nếu đăng ký thành công)

## 🔍 Kiểm Tra MongoDB Atlas

Sau khi đăng ký thành công:

1. **Vào MongoDB Atlas Dashboard**
2. **Database → Browse Collections**
3. **Tìm collection `users`**
4. **Xem user mới đã được tạo chưa**

**Nếu user không có:**
- Kiểm tra logs trong terminal
- Xem có lỗi gì không
- Thử đăng ký lại

## 💡 Tips

1. **Giữ terminal mở** khi test
2. **Xem logs ngay sau khi click "Đăng ký"**
3. **Copy logs** nếu có lỗi để phân tích
4. **Test với email mới** mỗi lần (hoặc xóa user cũ trong MongoDB Atlas)

## 🎯 Bước Tiếp Theo

1. **Test đăng ký** với email mới
2. **Xem logs** trong terminal
3. **Kiểm tra MongoDB Atlas** để xác nhận user
4. **Test đăng nhập** với tài khoản vừa đăng ký

## 📞 Cần Hỗ Trợ?

Nếu vẫn gặp lỗi:

1. **Copy toàn bộ logs** từ terminal
2. **Screenshot** MongoDB Atlas (nếu có)
3. **Mô tả** các bước bạn đã làm
4. **Gửi cho tôi** để phân tích

## 🚨 Quan Trọng

**Sau khi đăng ký:**
1. ✅ Xem logs trong terminal
2. ✅ Kiểm tra MongoDB Atlas
3. ✅ Test đăng nhập ngay sau đó
4. ✅ Nếu không thấy user trong database, xem logs để tìm lỗi



