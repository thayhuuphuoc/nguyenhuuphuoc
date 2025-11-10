# Hướng Dẫn Khắc Phục Lỗi Kết Nối MongoDB

## 🔍 Bước 1: Kiểm Tra Cấu Hình Hiện Tại

### 1.1 Kiểm tra file `.env.local`

Đảm bảo file `.env.local` tồn tại trong thư mục gốc của project và có dòng:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### 1.2 Kiểm tra format MongoDB URI

MongoDB URI phải có format đúng:
- **MongoDB Atlas (Cloud)**: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- **MongoDB Local**: `mongodb://localhost:27017/database`

## 🔍 Bước 2: Kiểm Tra Lỗi Kết Nối

### 2.1 Xem Logs trong Terminal

Khi chạy `npm run dev`, bạn sẽ thấy một trong các thông báo:

**✅ Kết nối thành công:**
```
✅ Connected to MongoDB
```

**❌ Kết nối thất bại:**
```
⚠️ MONGODB_URI is not set. Using fallback demo users mode.
```
hoặc
```
⚠️ MONGODB_URI format is invalid. Using fallback demo users mode.
```
hoặc
```
❌ MongoDB connection error: ...
```

### 2.2 Kiểm Tra Các Lỗi Phổ Biến

#### Lỗi 1: MONGODB_URI không được set
**Triệu chứng:**
```
⚠️ MONGODB_URI is not set. Using fallback demo users mode.
```

**Nguyên nhân:**
- File `.env.local` không tồn tại
- Biến `MONGODB_URI` không được định nghĩa trong `.env.local`
- File `.env.local` không được load đúng cách

**Giải pháp:**
1. Tạo file `.env.local` trong thư mục gốc (nếu chưa có)
2. Thêm dòng: `MONGODB_URI=your_connection_string`
3. Restart dev server: `npm run dev`

#### Lỗi 2: MONGODB_URI format không đúng
**Triệu chứng:**
```
⚠️ MONGODB_URI format is invalid. Using fallback demo users mode.
⚠️ MONGODB_URI should start with 'mongodb://' or 'mongodb+srv://'
```

**Nguyên nhân:**
- Connection string không đúng format
- Thiếu protocol (`mongodb://` hoặc `mongodb+srv://`)

**Giải pháp:**
1. Kiểm tra connection string có bắt đầu bằng `mongodb://` hoặc `mongodb+srv://` không
2. Đảm bảo format đúng: `mongodb+srv://username:password@cluster.mongodb.net/database`

#### Lỗi 3: Password có ký tự đặc biệt chưa được encode
**Triệu chứng:**
```
❌ MongoDB connection error: querySrv EBADNAME _mongodb._tcp...
```

**Nguyên nhân:**
- Password có ký tự đặc biệt (`@`, `<`, `>`, `:`, `/`, `?`, `#`, `[`, `]`, `%`) chưa được URL encode

**Giải pháp:**
1. Encode password bằng URL encoding
2. Ví dụ:
   - Password: `Phu@c1981`
   - Encoded: `Phu%40c1981` (vì `@` = `%40`)

#### Lỗi 4: Database name thiếu
**Triệu chứng:**
```
❌ MongoDB connection error: ...
```

**Nguyên nhân:**
- Connection string thiếu database name
- Ví dụ: `mongodb+srv://user:pass@cluster.mongodb.net/?appName=App` (thiếu database name)

**Giải pháp:**
1. Thêm database name vào connection string
2. Ví dụ: `mongodb+srv://user:pass@cluster.mongodb.net/database?appName=App`

#### Lỗi 5: Network/Firewall issues
**Triệu chứng:**
```
❌ MongoDB connection error: ETIMEDOUT
❌ MongoDB connection error: ENOTFOUND
```

**Nguyên nhân:**
- Firewall chặn kết nối
- Network issues
- MongoDB Atlas IP whitelist chưa được cấu hình

**Giải pháp:**
1. Kiểm tra MongoDB Atlas Network Access
2. Thêm IP hiện tại vào whitelist (hoặc `0.0.0.0/0` để allow all)
3. Kiểm tra firewall settings

## 🔧 Bước 3: Cách Lấy MongoDB Connection String

### 3.1 Từ MongoDB Atlas

1. Đăng nhập vào [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Chọn cluster của bạn
3. Click **Connect**
4. Chọn **Connect your application**
5. Copy connection string
6. Thay `<password>` bằng password thực tế
7. Thay `<database>` bằng database name (ví dụ: `myblog`)

### 3.2 Ví Dụ Connection String Đúng

```env
# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:encoded_password@cluster.mongodb.net/myblog?retryWrites=true&w=majority

# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/myblog
```

## 🔧 Bước 4: URL Encode Password

### 4.1 Các Ký Tự Cần Encode

| Ký tự | URL Encoded |
|-------|-------------|
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `?` | `%3F` |
| `#` | `%23` |
| `[` | `%5B` |
| `]` | `%5D` |
| `%` | `%25` |
| ` ` | `%20` |
| `<` | `%3C` |
| `>` | `%3E` |

### 4.2 Cách Encode Password

#### Cách 1: Sử dụng JavaScript (Browser Console)
```javascript
encodeURIComponent('Phu@c1981')
// Kết quả: "Phu%40c1981"
```

#### Cách 2: Sử dụng Online Tool
- Truy cập: https://www.urlencoder.org/
- Paste password vào
- Copy encoded password

#### Cách 3: Sử dụng PowerShell
```powershell
[System.Web.HttpUtility]::UrlEncode('Phu@c1981')
```

## 🔧 Bước 5: Test Connection String

### 5.1 Test trong MongoDB Compass

1. Mở MongoDB Compass
2. Paste connection string vào
3. Click **Connect**
4. Nếu kết nối thành công, connection string đúng

### 5.2 Test trong Node.js

Tạo file test: `test-mongodb.js`

```javascript
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')
    await mongoose.connection.close()
    console.log('✅ Connection closed')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

testConnection()
```

Chạy test:
```bash
node test-mongodb.js
```

## 🔧 Bước 6: Cấu Hình MongoDB Atlas

### 6.1 Network Access

1. Vào MongoDB Atlas Dashboard
2. Chọn **Network Access**
3. Click **Add IP Address**
4. Chọn **Allow Access from Anywhere** (0.0.0.0/0) hoặc thêm IP cụ thể
5. Click **Confirm**

### 6.2 Database User

1. Vào **Database Access**
2. Tạo user mới (nếu chưa có)
3. Set password
4. Set role: **Read and write to any database**
5. Click **Add User**

### 6.3 Database Name

1. Vào **Database**
2. Tạo database mới (nếu chưa có)
3. Ghi nhớ database name để dùng trong connection string

## 📝 Bước 7: Cập Nhật .env.local

### 7.1 Format Đúng

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:encoded_password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Ví dụ cụ thể:
# MONGODB_URI=mongodb+srv://huuphuoc:Phu%40c1981@phuocblog.a5xkigw.mongodb.net/phuocblog?retryWrites=true&w=majority
```

### 7.2 Lưu Ý

- ✅ **KHÔNG** commit file `.env.local` vào git
- ✅ **KHÔNG** chia sẻ connection string công khai
- ✅ **Đảm bảo** password đã được URL encode
- ✅ **Đảm bảo** database name đã được thêm vào connection string

## 🔍 Bước 8: Debug Connection

### 8.1 Kiểm Tra Logs

1. Restart dev server: `npm run dev`
2. Xem logs trong terminal
3. Tìm các thông báo:
   - `✅ Connected to MongoDB` - Kết nối thành công
   - `⚠️ MONGODB_URI is not set` - Chưa cấu hình
   - `⚠️ MONGODB_URI format is invalid` - Format sai
   - `❌ MongoDB connection error` - Lỗi kết nối

### 8.2 Test API Routes

1. Mở browser: `http://localhost:3000/api/posts/test-slug/views`
2. Kiểm tra response:
   - Nếu thành công: `{"success":true,"count":0}`
   - Nếu lỗi: Xem error message

### 8.3 Kiểm Tra Database

1. Mở MongoDB Atlas Dashboard
2. Vào **Database** → **Browse Collections**
3. Kiểm tra các collections:
   - `users` - Users collection
   - `comments` - Comments collection
   - `viewcounts` - View counts collection

## ✅ Checklist

- [ ] File `.env.local` đã được tạo
- [ ] `MONGODB_URI` đã được thêm vào `.env.local`
- [ ] Password đã được URL encode (nếu có ký tự đặc biệt)
- [ ] Database name đã được thêm vào connection string
- [ ] MongoDB Atlas Network Access đã được cấu hình
- [ ] Database User đã được tạo
- [ ] Dev server đã được restart sau khi cập nhật `.env.local`
- [ ] Terminal shows `✅ Connected to MongoDB`
- [ ] API routes hoạt động đúng
- [ ] Database collections đã được tạo tự động

## 🚨 Lưu Ý Quan Trọng

1. **Restart Server**: Sau khi cập nhật `.env.local`, phải restart dev server
2. **URL Encode**: Password có ký tự đặc biệt phải được URL encode
3. **Database Name**: Phải có database name trong connection string
4. **Network Access**: MongoDB Atlas phải allow IP của bạn
5. **Security**: Không commit `.env.local` vào git

## 🎯 Kết Luận

Nếu vẫn gặp lỗi sau khi làm theo các bước trên:

1. **Kiểm tra lại connection string** trong MongoDB Atlas
2. **Test connection string** trong MongoDB Compass
3. **Xem logs chi tiết** trong terminal
4. **Kiểm tra Network Access** trong MongoDB Atlas
5. **Liên hệ MongoDB Support** nếu cần

## 📞 Cần Hỗ Trợ?

Nếu vẫn gặp vấn đề, cung cấp:
1. Error message từ terminal
2. Connection string format (ẩn password)
3. MongoDB Atlas configuration
4. Network/Firewall settings


