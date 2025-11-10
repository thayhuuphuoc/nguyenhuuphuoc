# Hướng Dẫn Khắc Phục Lỗi Đăng Nhập

## 🐛 Vấn Đề

Đăng ký thành công nhưng đăng nhập không được, hệ thống báo "invalid email or password".

## 🔍 Nguyên Nhân Có Thể

### 1. MongoDB Connection Chưa Được Cấu Hình Trên Vercel

**Triệu chứng:**
- Đăng ký thành công (frontend báo success)
- User không được tạo trong MongoDB
- Đăng nhập không được vì user không tồn tại

**Giải pháp:**
1. Kiểm tra environment variable `MONGODB_URI` trên Vercel
2. Đảm bảo connection string đúng format và password đã URL encode
3. Redeploy application sau khi cấu hình
4. Xem hướng dẫn: `HUONG-DAN-CAU-HINH-VERCEL-MONGODB.md`

### 2. Password Hashing Không Đúng

**Triệu chứng:**
- User được tạo trong MongoDB
- Password được hash nhưng không match khi đăng nhập

**Giải pháp:**
1. Kiểm tra User model có hash password đúng không
2. Kiểm tra `comparePassword` method hoạt động đúng không
3. Xem logs trong Vercel để debug

### 3. Email Không Khớp (Case Sensitivity)

**Triệu chứng:**
- User được tạo với email `User@Example.com`
- Đăng nhập với email `user@example.com` không được

**Giải pháp:**
- User model đã có `lowercase: true` trong schema
- Đảm bảo email được lowercase khi đăng ký và đăng nhập
- Code đã xử lý: `email.toLowerCase().trim()`

### 4. User Không Được Tạo Trong Database

**Triệu chứng:**
- Đăng ký thành công (frontend báo success)
- User không có trong MongoDB Atlas

**Giải pháp:**
1. Kiểm tra MongoDB connection trên Vercel
2. Kiểm tra logs trong Vercel khi đăng ký
3. Kiểm tra MongoDB Atlas → Database → Browse Collections → `users`

## 🔧 Các Bước Khắc Phục

### Bước 1: Kiểm Tra MongoDB Connection Trên Vercel

1. Vào Vercel Dashboard → Project → Settings → Environment Variables
2. Kiểm tra `MONGODB_URI` có được set không
3. Kiểm tra connection string đúng format:
   ```
   mongodb+srv://username:encoded_password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```
4. Redeploy application nếu chưa có

### Bước 2: Kiểm Tra Logs Trong Vercel

1. Vào Vercel Dashboard → Deployments → Chọn deployment mới nhất
2. Click **View Function Logs**
3. Tìm các log khi đăng ký:
   - `✅ Database connected successfully`
   - `✅ User created successfully with ID: ...`
   - `✅ User verification successful`
4. Tìm các log khi đăng nhập:
   - `🔍 Login attempt: { email: ..., passwordLength: ... }`
   - `📊 Database connected, searching in database...`
   - `✅ User found in database`
   - `🔐 Password validation result: true/false`

### Bước 3: Kiểm Tra User Trong MongoDB Atlas

1. Vào MongoDB Atlas Dashboard
2. Chọn cluster của bạn
3. Click **Database** → **Browse Collections**
4. Chọn collection `users`
5. Kiểm tra user đã được tạo chưa
6. Kiểm tra email và password (password phải được hash, bắt đầu bằng `$2`)

### Bước 4: Test Đăng Ký và Đăng Nhập

1. **Test Đăng Ký:**
   - Vào `https://nguyenhuuphuoc.info/sign-up`
   - Đăng ký user mới với email và password
   - Kiểm tra logs trong Vercel
   - Kiểm tra user có trong MongoDB Atlas không

2. **Test Đăng Nhập:**
   - Vào `https://nguyenhuuphuoc.info/sign-in`
   - Đăng nhập với email và password vừa đăng ký
   - Kiểm tra logs trong Vercel
   - Kiểm tra có đăng nhập thành công không

### Bước 5: Debug Chi Tiết

Nếu vẫn không được, kiểm tra:

1. **Password Hashing:**
   - Password phải được hash bằng bcrypt
   - Hash phải bắt đầu bằng `$2` (bcrypt format)
   - Kiểm tra trong MongoDB Atlas

2. **Email Matching:**
   - Email phải được lowercase
   - Không có khoảng trắng
   - Đúng format email

3. **Database Connection:**
   - MongoDB connection phải thành công
   - Database name phải đúng
   - Collection `users` phải tồn tại

## 🧪 Test Cases

### Test Case 1: Đăng Ký User Mới

```
Email: test@example.com
Password: test123
```

**Kết quả mong đợi:**
- ✅ Đăng ký thành công
- ✅ User được tạo trong MongoDB
- ✅ Password được hash (bắt đầu bằng `$2`)
- ✅ Email được lowercase

### Test Case 2: Đăng Nhập Với User Đã Đăng Ký

```
Email: test@example.com
Password: test123
```

**Kết quả mong đợi:**
- ✅ Đăng nhập thành công
- ✅ User được tìm thấy trong database
- ✅ Password match
- ✅ Session được tạo

### Test Case 3: Đăng Nhập Với Password Sai

```
Email: test@example.com
Password: wrongpassword
```

**Kết quả mong đợi:**
- ❌ Đăng nhập thất bại
- ❌ Báo lỗi "invalid email or password"
- ❌ Password không match

## 📝 Checklist

- [ ] MongoDB connection đã được cấu hình trên Vercel
- [ ] Environment variable `MONGODB_URI` đã được set
- [ ] Application đã được redeploy sau khi cấu hình
- [ ] Logs trong Vercel hiển thị `✅ Connected to MongoDB successfully`
- [ ] User được tạo trong MongoDB Atlas khi đăng ký
- [ ] Password được hash đúng (bắt đầu bằng `$2`)
- [ ] Email được lowercase khi đăng ký và đăng nhập
- [ ] Đăng nhập thành công với user đã đăng ký

## 🎯 Kết Luận

Sau khi khắc phục:
1. ✅ MongoDB connection hoạt động trên Vercel
2. ✅ User được tạo đúng cách khi đăng ký
3. ✅ Password được hash và verify đúng
4. ✅ Đăng nhập hoạt động với user đã đăng ký

## 🔗 Related Files

- `lib/mongodb.ts` - MongoDB connection
- `models/User.ts` - User model với password hashing
- `lib/auth.ts` - Authentication logic
- `app/api/auth/register/route.ts` - Registration API
- `HUONG-DAN-CAU-HINH-VERCEL-MONGODB.md` - Hướng dẫn cấu hình Vercel

## 💡 Tips

1. **Always check logs**: Luôn kiểm tra logs trong Vercel để debug
2. **Test locally first**: Test trên local trước khi deploy lên production
3. **Check MongoDB Atlas**: Kiểm tra user có trong database không
4. **Password security**: Password phải được hash bằng bcrypt
5. **Email normalization**: Email phải được lowercase và trim

