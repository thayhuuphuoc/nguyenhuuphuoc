# Hướng dẫn Debug Lỗi Đăng Nhập

## Vấn đề

Đăng ký thành công nhưng đăng nhập báo "email hoặc mật khẩu không đúng" mặc dù đã kiểm tra email và mật khẩu đúng.

## Nguyên nhân có thể

1. **Password không được hash đúng cách** - Password có thể không được hash trong quá trình đăng ký
2. **Email không khớp** - Email có thể có khoảng trắng hoặc ký tự đặc biệt
3. **MongoDB connection issue** - Database có thể không kết nối được trong production
4. **Password comparison issue** - Bcrypt comparison có thể fail do lỗi trong code

## Cách Debug

### 1. Kiểm tra Console Logs

Sau khi cập nhật code, các console logs sẽ hiển thị thông tin chi tiết về:

#### Trong quá trình đăng ký:
- `🔐 Hashing password before save...` - Password đang được hash
- `🔐 Password hashed successfully` - Password đã được hash thành công
- `✅ User created successfully` - User đã được tạo
- `✅ User verification successful` - User đã được verify trong database

#### Trong quá trình đăng nhập:
- `🔍 Login attempt:` - Thông tin đăng nhập
- `📊 Database connected, searching in database...` - Đang tìm user trong database
- `✅ User found in database:` - User đã được tìm thấy
- `🔐 Comparing password:` - Đang so sánh password
- `🔐 Password comparison result:` - Kết quả so sánh password

### 2. Kiểm tra MongoDB Connection

Đảm bảo `MONGODB_URI` đã được cấu hình đúng trong `.env.local` (local) hoặc Vercel Environment Variables (production).

```bash
# Kiểm tra trong terminal
echo $MONGODB_URI
```

### 3. Kiểm tra User trong Database

Sử dụng MongoDB Atlas hoặc MongoDB Compass để kiểm tra:

1. User có được tạo trong database không?
2. Password có được hash (bắt đầu với `$2`) không?
3. Email có đúng format không?

### 4. Kiểm tra Email và Password

Đảm bảo:
- Email không có khoảng trắng ở đầu hoặc cuối
- Password không có khoảng trắng ở đầu hoặc cuối
- Email và password đúng như đã đăng ký

### 5. Test với Demo Users

Nếu MongoDB không kết nối được, hệ thống sẽ sử dụng demo users:
- Email: `admin@blogforge.com`, Password: `admin123`
- Email: `user@blogforge.com`, Password: `user123`

## Các Bước Khắc Phục

### Bước 1: Kiểm tra Console Logs

1. Mở terminal và chạy `npm run dev`
2. Đăng ký một tài khoản mới
3. Kiểm tra console logs để xem:
   - Password có được hash không?
   - User có được tạo không?
   - User có được verify không?

### Bước 2: Kiểm tra Đăng Nhập

1. Thử đăng nhập với tài khoản vừa tạo
2. Kiểm tra console logs để xem:
   - User có được tìm thấy không?
   - Password có được so sánh không?
   - Kết quả so sánh password là gì?

### Bước 3: Kiểm tra MongoDB

1. Kiểm tra `MONGODB_URI` trong `.env.local` (local) hoặc Vercel (production)
2. Đảm bảo connection string đúng format
3. Kiểm tra MongoDB Atlas Network Access (IP whitelist)
4. Kiểm tra MongoDB Atlas Database Access (user permissions)

### Bước 4: Test với MongoDB Atlas

1. Đăng nhập vào MongoDB Atlas
2. Kiểm tra collection `users`
3. Xem user có được tạo không
4. Xem password có được hash không (bắt đầu với `$2`)

### Bước 5: Xóa và Tạo Lại User

Nếu vẫn không hoạt động:

1. Xóa user cũ trong database
2. Đăng ký lại với email và password mới
3. Thử đăng nhập lại

## Logging Chi Tiết

Code đã được cập nhật với logging chi tiết để giúp debug:

### Trong `models/User.ts`:
- Logging trong `pre("save")` hook để xem password có được hash không
- Logging trong `comparePassword` method để xem password có được so sánh không

### Trong `lib/auth.ts`:
- Logging khi tìm user trong database
- Logging khi so sánh password
- Logging khi user không được tìm thấy

### Trong `app/api/auth/register/route.ts`:
- Logging khi tạo user
- Logging khi verify user

## Troubleshooting

### Lỗi: "User not found in database"
- **Nguyên nhân**: Email không khớp hoặc user chưa được tạo
- **Giải pháp**: Kiểm tra email có đúng không, kiểm tra database có user không

### Lỗi: "Password mismatch"
- **Nguyên nhân**: Password không đúng hoặc password không được hash đúng cách
- **Giải pháp**: Kiểm tra password có đúng không, kiểm tra password có được hash không

### Lỗi: "Database not connected"
- **Nguyên nhân**: MongoDB không kết nối được
- **Giải pháp**: Kiểm tra `MONGODB_URI`, kiểm tra MongoDB Atlas Network Access

### Lỗi: "Password is not hashed"
- **Nguyên nhân**: Password không được hash trong quá trình đăng ký
- **Giải pháp**: Kiểm tra pre-save hook có chạy không, kiểm tra console logs

## Liên hệ

Nếu vẫn gặp vấn đề, vui lòng cung cấp:
1. Console logs từ quá trình đăng ký
2. Console logs từ quá trình đăng nhập
3. Thông tin về MongoDB connection
4. Thông tin về user trong database

