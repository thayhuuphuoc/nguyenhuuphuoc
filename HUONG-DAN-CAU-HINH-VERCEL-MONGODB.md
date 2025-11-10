# Hướng Dẫn Cấu Hình MongoDB Trên Vercel

## 🔧 Vấn Đề

Khi deploy lên Vercel (production), các chức năng sau không hoạt động:
1. ❌ View count và comments không hiển thị
2. ❌ Đăng nhập không được sau khi đăng ký

**Nguyên nhân**: MongoDB connection string chưa được cấu hình trên Vercel.

## ✅ Giải Pháp: Cấu Hình Environment Variables Trên Vercel

### Bước 1: Truy Cập Vercel Dashboard

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn (`Myblog` hoặc tên project tương ứng)
3. Vào **Settings** → **Environment Variables**

### Bước 2: Thêm MongoDB Connection String

1. Click **Add New**
2. **Key**: `MONGODB_URI`
3. **Value**: Connection string của bạn (đã URL encode password)
   ```
   mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/myblog?retryWrites=true&w=majority
   ```
4. **Environment**: Chọn **Production**, **Preview**, và **Development** (hoặc chỉ **Production** nếu chỉ cần cho production)
5. Click **Save**

### Bước 3: Redeploy Application

Sau khi thêm environment variable, cần redeploy:

1. Vào **Deployments** tab
2. Click **⋮** (three dots) trên deployment mới nhất
3. Chọn **Redeploy**
4. Hoặc push một commit mới lên Git repository

### Bước 4: Kiểm Tra Logs

Sau khi redeploy, kiểm tra logs:

1. Vào **Deployments** → Chọn deployment mới nhất
2. Click **View Function Logs**
3. Tìm log: `✅ Connected to MongoDB successfully`

Nếu thấy log này, MongoDB đã được kết nối thành công.

## 🔍 Kiểm Tra MongoDB Connection

### Cách 1: Kiểm Tra Logs Trong Vercel

1. Vào **Deployments** → Chọn deployment mới nhất
2. Click **View Function Logs**
3. Tìm các log:
   - `✅ Connected to MongoDB successfully` - Kết nối thành công
   - `⚠️ MONGODB_URI is not set` - Chưa cấu hình
   - `❌ MongoDB connection error` - Lỗi kết nối

### Cách 2: Test API Routes

1. Mở browser: `https://nguyenhuuphuoc.info/api/posts/[slug]/views`
2. Kiểm tra response:
   - Nếu thành công: `{"success":true,"count":0}`
   - Nếu lỗi: Xem error message

### Cách 3: Test Đăng Ký/Đăng Nhập

1. Vào `https://nguyenhuuphuoc.info/sign-up`
2. Đăng ký tài khoản mới
3. Kiểm tra logs trong Vercel để xem có lỗi không
4. Đăng nhập với tài khoản vừa tạo
5. Kiểm tra có đăng nhập thành công không

## 🐛 Troubleshooting

### Lỗi: View Count và Comments Không Hiển Thị

**Nguyên nhân:**
1. MongoDB connection chưa được cấu hình trên Vercel
2. Environment variable `MONGODB_URI` chưa được set
3. API routes trả về error

**Giải pháp:**
1. Kiểm tra environment variables trong Vercel
2. Đảm bảo `MONGODB_URI` đã được thêm và đúng format
3. Redeploy application
4. Kiểm tra logs trong Vercel
5. Test API routes trực tiếp

### Lỗi: Đăng Nhập Không Được Sau Khi Đăng Ký

**Nguyên nhân:**
1. MongoDB connection chưa được cấu hình trên Vercel
2. User không được tạo trong database
3. Password hashing không đúng
4. Email không khớp (case sensitivity)

**Giải pháp:**
1. Kiểm tra MongoDB connection trên Vercel
2. Kiểm tra user có được tạo trong MongoDB Atlas không
3. Kiểm tra logs trong Vercel để xem có lỗi không
4. Đảm bảo email được lowercase khi đăng ký và đăng nhập
5. Thử đăng ký lại user mới

### Lỗi: "MongoDB connection error"

**Nguyên nhân:**
1. Connection string không đúng
2. Password chưa được URL encode
3. MongoDB Atlas Network Access chưa được cấu hình
4. Database name không đúng

**Giải pháp:**
1. Kiểm tra connection string format
2. Đảm bảo password đã được URL encode
3. Kiểm tra MongoDB Atlas Network Access (cho phép `0.0.0.0/0` hoặc IP của Vercel)
4. Kiểm tra database name trong connection string

## 📝 Checklist

- [ ] Environment variable `MONGODB_URI` đã được thêm vào Vercel
- [ ] Connection string đúng format và password đã được URL encode
- [ ] Environment variable được set cho **Production** environment
- [ ] Application đã được redeploy sau khi thêm environment variable
- [ ] Logs trong Vercel hiển thị `✅ Connected to MongoDB successfully`
- [ ] API routes hoạt động đúng (test `/api/posts/[slug]/views`)
- [ ] View count và comments hiển thị trên website
- [ ] Đăng ký tạo user thành công
- [ ] Đăng nhập với user đã đăng ký thành công

## 🎯 Kết Luận

Sau khi cấu hình MongoDB trên Vercel:
1. ✅ View count và comments sẽ hiển thị
2. ✅ Đăng ký và đăng nhập sẽ hoạt động
3. ✅ Tất cả chức năng liên quan đến MongoDB sẽ hoạt động bình thường

## 🔗 Related Files

- `lib/mongodb.ts` - MongoDB connection
- `app/api/posts/[slug]/views/route.ts` - View count API
- `app/api/posts/[slug]/comments/route.ts` - Comments API
- `app/api/auth/register/route.ts` - Registration API
- `lib/auth.ts` - Authentication

## 💡 Tips

1. **Environment Variables**: Luôn cấu hình environment variables trên Vercel cho production
2. **Redeploy**: Sau khi thêm environment variables, phải redeploy application
3. **Logs**: Luôn kiểm tra logs trong Vercel để debug
4. **Testing**: Test các chức năng sau khi redeploy
5. **Security**: Không commit `.env.local` vào Git repository

