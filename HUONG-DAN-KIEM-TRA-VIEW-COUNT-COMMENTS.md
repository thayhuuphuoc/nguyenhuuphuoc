# Hướng Dẫn Kiểm Tra View Count và Comments

## 🔍 Các Bước Kiểm Tra

### 1. Kiểm Tra MongoDB Connection

Đảm bảo MongoDB đã được cấu hình trong `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### 2. Kiểm Tra Browser Console

1. Mở trang bài viết bất kỳ (ví dụ: `http://localhost:3000/blog/sach-hay`)
2. Mở Browser Console (F12 → Console)
3. Tìm các logs:
   - `[PostMeta] Fetching stats for post: ...`
   - `[PostMeta] View count response: ...`
   - `[PostMeta] Comment count response: ...`

### 3. Kiểm Tra Terminal/Server Logs

1. Mở terminal nơi chạy `npm run dev`
2. Tìm các logs:
   - `[Views API] GET request for slug: ...`
   - `[Comments API] GET request for slug: ...`
   - `✅ Connected to MongoDB` hoặc `⚠️ MongoDB not connected`

### 4. Kiểm Tra API Routes Trực Tiếp

#### Test View Count API:
```bash
# GET view count
curl http://localhost:3000/api/posts/sach-hay/views

# POST to increment view count
curl -X POST http://localhost:3000/api/posts/sach-hay/views
```

#### Test Comments API:
```bash
# GET comments
curl http://localhost:3000/api/posts/sach-hay/comments

# POST to add comment (requires authentication)
curl -X POST http://localhost:3000/api/posts/sach-hay/comments \
  -H "Content-Type: application/json" \
  -d '{"content": "Test comment"}'
```

### 5. Kiểm Tra Network Tab

1. Mở Browser DevTools (F12)
2. Chuyển sang tab **Network**
3. Reload trang bài viết
4. Tìm các requests:
   - `/api/posts/[slug]/views` (GET)
   - `/api/posts/[slug]/comments` (GET)
5. Kiểm tra:
   - Status code (phải là 200)
   - Response data
   - Có lỗi CORS không

## 🐛 Troubleshooting

### Vấn đề 1: View count và Comment count luôn hiển thị 0

**Nguyên nhân có thể:**
- MongoDB chưa được cấu hình
- API routes không hoạt động
- Có lỗi trong quá trình fetch

**Giải pháp:**
1. Kiểm tra MongoDB connection trong terminal
2. Kiểm tra browser console để xem có lỗi không
3. Kiểm tra network tab để xem API requests có được gửi không
4. Kiểm tra response từ API

### Vấn đề 2: View count không tăng khi vào trang

**Nguyên nhân có thể:**
- ViewTracker không được gọi
- SessionStorage đã lưu trạng thái "đã track"
- API POST request thất bại

**Giải pháp:**
1. Clear sessionStorage: `sessionStorage.clear()` trong browser console
2. Reload trang
3. Kiểm tra network tab để xem POST request có được gửi không
4. Kiểm tra terminal để xem có logs từ API không

### Vấn đề 3: Comments không hiển thị

**Nguyên nhân có thể:**
- Chưa có comments trong database
- API route không hoạt động
- Có lỗi trong CommentsSection component

**Giải pháp:**
1. Kiểm tra database có comments không
2. Kiểm tra browser console để xem có lỗi không
3. Kiểm tra network tab để xem GET request có được gửi không
4. Thử thêm comment mới để test

### Vấn đề 4: MongoDB không kết nối được

**Nguyên nhân có thể:**
- MONGODB_URI chưa được cấu hình
- MONGODB_URI không đúng format
- Network issues

**Giải pháp:**
1. Kiểm tra `.env.local` có MONGODB_URI không
2. Kiểm tra format của MONGODB_URI
3. Test connection string trong MongoDB Compass
4. Kiểm tra network/firewall settings

## ✅ Checklist

- [ ] MongoDB connection đã được cấu hình
- [ ] Server đang chạy (`npm run dev`)
- [ ] Browser console không có lỗi
- [ ] Network tab shows API requests thành công
- [ ] Terminal shows API logs
- [ ] View count hiển thị đúng
- [ ] Comment count hiển thị đúng
- [ ] Comments hiển thị đúng
- [ ] View count tăng khi vào trang

## 📝 Logs Mẫu

### Terminal Logs (Success):
```
[Views API] GET request for slug: sach-hay
✅ Connected to MongoDB
[Views API] Found view count for sach-hay: 5

[Comments API] GET request for slug: sach-hay
✅ Connected to MongoDB
[Comments API] Found 3 comments for sach-hay
```

### Browser Console Logs (Success):
```
[PostMeta] Fetching stats for post: sach-hay
[PostMeta] View count response: {success: true, count: 5}
[PostMeta] Comment count response: {success: true, count: 3, comments: [...]}
```

### Terminal Logs (MongoDB Not Connected):
```
[Views API] GET request for slug: sach-hay
⚠️ MongoDB not connected for slug: sach-hay, returning 0

[Comments API] GET request for slug: sach-hay
⚠️ MongoDB not connected for slug: sach-hay, returning empty comments
```

## 🎯 Kết Luận

Nếu tất cả các bước trên đều pass, nhưng view count và comment count vẫn không hiển thị, có thể có vấn đề với:
1. Component rendering
2. State management
3. Caching issues

Hãy thử:
- Hard refresh (Ctrl + Shift + R)
- Clear browser cache
- Restart dev server
- Check for any TypeScript/compilation errors


