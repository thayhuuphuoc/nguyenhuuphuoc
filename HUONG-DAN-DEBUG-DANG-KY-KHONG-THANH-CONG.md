# Hướng Dẫn Debug Đăng Ký Không Thành Công

## 🚨 Vấn Đề

Database đã kết nối nhưng **trống** (`Users in database: []`), và **không thấy logs đăng ký** trong terminal.

## 🔍 Nguyên Nhân Có Thể

1. **Chưa thực sự đăng ký** - Form chưa được submit
2. **Lỗi ở frontend** - Request không được gửi đến API
3. **Lỗi network** - Request bị block hoặc fail
4. **Lỗi validation** - Form validation fail trước khi gửi request

## ✅ Giải Pháp

### Bước 1: Test Đăng Ký Và Xem Logs

1. **Mở Browser Console:**
   - Nhấn `F12` hoặc `Ctrl + Shift + I`
   - Chuyển sang tab **Console**

2. **Mở Terminal:**
   - Giữ terminal mở (nơi chạy `npm run dev`)
   - Clear terminal: `Clear-Host` (PowerShell)

3. **Vào trang đăng ký:**
   - Mở: `http://localhost:3000/sign-up`

4. **Điền thông tin:**
   - Name: `Test User`
   - Email: `test@example.com` (dùng email mới)
   - Password: `test123`
   - Confirm Password: `test123`
   - ✅ Check "Tôi đồng ý với Điều khoản & Điều kiện"

5. **Click "Đăng ký"**

6. **Xem Logs:**

#### Trong Browser Console (F12):

Bạn sẽ thấy:
```
📝 Form submitted { name: 'Test User', email: 'test@example.com', ... }
🔄 Sending registration request to /api/auth/register
📥 Registration response status: 201
📥 Registration response data: { message: 'Đăng ký thành công!', ... }
✅ Registration successful!
```

#### Trong Terminal:

Bạn sẽ thấy:
```
📝 Registration request received
📋 Registration data: { name: 'Test User', email: 'test@example.com', ... }
🔌 Connecting to database...
✅ Database connected successfully
🔍 Checking if user exists: test@example.com
✅ User does not exist, creating new user...
💾 Creating user with data: { ... }
✅ User created successfully with ID: ...
✅ User verification successful: { ... }
✅ User found in database after creation
```

### Bước 2: Kiểm Tra Lỗi

#### Nếu Không Thấy Logs Trong Browser Console:

**Có thể:**
- Form không được submit
- JavaScript bị disable
- Có lỗi JavaScript

**Giải pháp:**
- Kiểm tra browser console có lỗi không
- Thử refresh trang
- Thử browser khác

#### Nếu Thấy Lỗi Trong Browser Console:

**Lỗi Network:**
```
Failed to fetch
Network error
```

**Giải pháp:**
- Kiểm tra server đang chạy (`npm run dev`)
- Kiểm tra URL: `http://localhost:3000`
- Kiểm tra CORS settings

#### Nếu Không Thấy Logs Trong Terminal:

**Có thể:**
- Request không đến server
- API route không được gọi
- Có lỗi trước khi đến API

**Giải pháp:**
- Kiểm tra browser console
- Kiểm tra Network tab trong DevTools
- Xem request có được gửi không

### Bước 3: Kiểm Tra Network Request

1. **Mở Browser DevTools (F12)**
2. **Chuyển sang tab Network**
3. **Filter: XHR hoặc Fetch**
4. **Đăng ký lại**
5. **Tìm request:** `register`
6. **Click vào request để xem:**
   - Status code (phải là 201)
   - Request payload
   - Response data

### Bước 4: Kiểm Tra MongoDB Atlas

Sau khi đăng ký thành công:

1. **Vào MongoDB Atlas Dashboard**
2. **Database → Browse Collections**
3. **Tìm collection `users`**
4. **Xem user mới đã được tạo chưa**

## 🐛 Troubleshooting

### Lỗi: "Form submitted" nhưng không có "Sending registration request"

**Nguyên nhân:** Validation fail ở frontend

**Giải pháp:**
- Kiểm tra tất cả fields đã điền đầy đủ
- Kiểm tra password và confirm password khớp
- Kiểm tra checkbox "Tôi đồng ý" đã được check

### Lỗi: "Sending registration request" nhưng không có response

**Nguyên nhân:** Network error hoặc server error

**Giải pháp:**
- Kiểm tra server đang chạy
- Kiểm tra Network tab trong DevTools
- Xem có lỗi CORS không

### Lỗi: Response 500 hoặc error

**Nguyên nhân:** Server error

**Giải pháp:**
- Xem logs trong terminal
- Kiểm tra MongoDB connection
- Kiểm tra error message trong response

### Lỗi: "User created successfully" nhưng không thấy trong database

**Nguyên nhân:** 
- User được tạo nhưng không query được
- Database connection issues
- Wrong database name

**Giải pháp:**
- Kiểm tra MongoDB Atlas
- Kiểm tra database name trong connection string
- Kiểm tra collection name (phải là `users`)

## 📋 Checklist Debug

- [ ] Browser console mở (F12)
- [ ] Terminal mở và clear
- [ ] Đã điền đầy đủ thông tin form
- [ ] Đã check checkbox "Tôi đồng ý"
- [ ] Đã click "Đăng ký"
- [ ] Đã xem logs trong browser console
- [ ] Đã xem logs trong terminal
- [ ] Đã kiểm tra Network tab trong DevTools
- [ ] Đã kiểm tra MongoDB Atlas

## 💡 Tips

1. **Giữ cả browser console và terminal mở** khi test
2. **Xem logs ngay sau khi click "Đăng ký"**
3. **Copy logs** nếu có lỗi để phân tích
4. **Test với email mới** mỗi lần

## 🎯 Bước Tiếp Theo

1. **Test đăng ký** với hướng dẫn trên
2. **Xem logs** trong cả browser console và terminal
3. **Kiểm tra MongoDB Atlas** để xác nhận user
4. **Gửi logs** nếu vẫn có vấn đề

## 📞 Cần Hỗ Trợ?

Nếu vẫn gặp lỗi, cung cấp:

1. **Logs từ browser console** (F12 → Console)
2. **Logs từ terminal** (server logs)
3. **Network request details** (F12 → Network → register request)
4. **Screenshot** MongoDB Atlas (nếu có)

## 🚨 Quan Trọng

**Để debug hiệu quả:**
1. ✅ Mở browser console (F12)
2. ✅ Mở terminal và clear
3. ✅ Test đăng ký
4. ✅ Xem logs ở cả 2 nơi
5. ✅ Kiểm tra Network tab
6. ✅ Kiểm tra MongoDB Atlas



