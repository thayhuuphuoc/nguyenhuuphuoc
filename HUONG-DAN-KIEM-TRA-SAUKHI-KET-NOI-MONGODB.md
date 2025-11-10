# Hướng Dẫn Kiểm Tra Sau Khi Kết Nối MongoDB

## ✅ Kết Nối Thành Công

Kết quả test cho thấy:
- ✅ MongoDB connection thành công
- ✅ Database đã được kết nối
- ✅ Collections đã tồn tại: `users`, `dbuser`

## 🔄 Bước 1: Restart Dev Server

Sau khi kết nối MongoDB thành công, cần restart dev server để ứng dụng sử dụng MongoDB:

```bash
# Dừng server hiện tại (Ctrl + C)
# Sau đó chạy lại:
npm run dev
```

## 🔍 Bước 2: Kiểm Tra Logs

Khi server khởi động, bạn sẽ thấy log:

```
✅ Connected to MongoDB successfully
📊 Database: your_database_name
```

Nếu thấy log này, MongoDB đã được kết nối và ứng dụng sẽ sử dụng database thực.

## 🧪 Bước 3: Test Các Chức Năng

### 3.1 Test View Count

1. Mở một bài viết bất kỳ: `http://localhost:3000/blog/[slug]`
2. Reload trang vài lần
3. Kiểm tra view count có tăng không
4. Xem terminal logs:
   ```
   [Views API] GET request for slug: ...
   [Views API] Found view count for ...: X
   ```

### 3.2 Test Comments

1. Đăng nhập vào website (nếu chưa đăng nhập)
2. Mở một bài viết bất kỳ
3. Thêm một bình luận
4. Kiểm tra bình luận có hiển thị không
5. Xem terminal logs:
   ```
   [Comments API] GET request for slug: ...
   [Comments API] Found X comments for ...
   ```

### 3.3 Test Đăng Ký/Đăng Nhập

1. Vào `/sign-up`
2. Đăng ký tài khoản mới
3. Kiểm tra user có được tạo trong MongoDB không:
   - Vào MongoDB Atlas → Database → Browse Collections → `users`
   - Hoặc chạy test script để xem collections
4. Đăng nhập với tài khoản vừa tạo
5. Kiểm tra có đăng nhập thành công không

## 📊 Bước 4: Kiểm Tra Database

### 4.1 Xem Collections

Có thể kiểm tra collections trong MongoDB Atlas:
1. Vào MongoDB Atlas Dashboard
2. Chọn cluster của bạn
3. Click **Browse Collections**
4. Kiểm tra các collections:
   - `users` - Users collection (nếu có)
   - `comments` - Comments collection (sẽ được tạo khi có comment)
   - `viewcounts` - View counts collection (sẽ được tạo khi có view)

### 4.2 Xem Documents

Kiểm tra documents trong các collections:
- **users**: Xem users đã được tạo
- **comments**: Xem comments đã được thêm
- **viewcounts**: Xem view counts đã được track

## 🐛 Troubleshooting

### Lỗi: View count không tăng

**Nguyên nhân có thể:**
1. MongoDB chưa được kết nối trong ứng dụng
2. API route chưa được gọi
3. Session storage đã lưu view (chỉ count 1 lần mỗi session)

**Giải pháp:**
1. Kiểm tra terminal logs có log `[Views API]` không
2. Kiểm tra browser console có lỗi không
3. Xóa session storage và thử lại
4. Kiểm tra MongoDB connection trong terminal logs

### Lỗi: Comments không hiển thị

**Nguyên nhân có thể:**
1. MongoDB chưa được kết nối
2. User chưa đăng nhập
3. API route có lỗi

**Giải pháp:**
1. Kiểm tra terminal logs có log `[Comments API]` không
2. Kiểm tra user đã đăng nhập chưa
3. Kiểm tra browser console có lỗi không
4. Kiểm tra MongoDB connection trong terminal logs

### Lỗi: Đăng nhập không thành công

**Nguyên nhân có thể:**
1. User chưa được tạo trong database
2. Password không đúng
3. MongoDB chưa được kết nối

**Giải pháp:**
1. Kiểm tra user có trong MongoDB không
2. Thử đăng ký lại user mới
3. Kiểm tra MongoDB connection trong terminal logs
4. Kiểm tra password đã được hash đúng chưa

## ✅ Checklist

Sau khi kết nối MongoDB, kiểm tra:

- [ ] Server đã được restart
- [ ] Terminal logs hiển thị `✅ Connected to MongoDB successfully`
- [ ] View count hoạt động (tăng khi reload trang)
- [ ] Comments hoạt động (thêm và hiển thị comments)
- [ ] Đăng ký hoạt động (tạo user mới)
- [ ] Đăng nhập hoạt động (đăng nhập với user đã tạo)
- [ ] Collections được tạo trong MongoDB (`users`, `comments`, `viewcounts`)
- [ ] Documents được tạo trong collections

## 🎯 Kết Luận

Nếu tất cả các bước trên đều thành công, MongoDB đã được kết nối và ứng dụng đang sử dụng database thực. Các chức năng như view count, comments, đăng ký/đăng nhập sẽ hoạt động bình thường.

## 📝 Lưu Ý

1. **Session Storage**: View count chỉ được tính 1 lần mỗi session (để tránh spam)
2. **Authentication**: Comments yêu cầu user đăng nhập
3. **Database**: Collections sẽ được tạo tự động khi có dữ liệu
4. **Logs**: Luôn kiểm tra terminal logs để debug

## 🔗 Related Files

- `lib/mongodb.ts` - MongoDB connection
- `app/api/posts/[slug]/views/route.ts` - View count API
- `app/api/posts/[slug]/comments/route.ts` - Comments API
- `app/api/auth/register/route.ts` - Registration API
- `lib/auth.ts` - Authentication

