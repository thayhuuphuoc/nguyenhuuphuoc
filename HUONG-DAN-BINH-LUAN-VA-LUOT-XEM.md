# Hướng Dẫn Sử Dụng Chức Năng Bình Luận Và Đếm Lượt Xem

## 📋 Tổng Quan

Đã triển khai đầy đủ hai chức năng chính:
1. **Bình luận bài viết** - Người dùng có thể bình luận, xem và xóa bình luận
2. **Đếm lượt xem** - Tự động đếm số lần đọc bài viết

## ✨ Tính Năng Đã Triển Khai

### 1. Bình Luận (Comments)

#### Tính năng:
- ✅ Xem tất cả bình luận của bài viết
- ✅ Thêm bình luận mới (yêu cầu đăng nhập)
- ✅ Xóa bình luận của chính mình
- ✅ Admin có thể xóa bất kỳ bình luận nào
- ✅ Hiển thị thời gian bình luận (ví dụ: "2 giờ trước")
- ✅ Hiển thị số lượng bình luận
- ✅ Tự động cập nhật số lượng bình luận sau khi thêm/xóa

#### Cách sử dụng:
1. **Xem bình luận**: Tự động hiển thị ở cuối mỗi bài viết
2. **Thêm bình luận**: 
   - Đăng nhập vào tài khoản
   - Cuộn xuống phần bình luận
   - Nhập nội dung bình luận (tối đa 1000 ký tự)
   - Click "Gửi bình luận"
3. **Xóa bình luận**:
   - Click icon thùng rác trên bình luận của bạn
   - Xác nhận xóa

### 2. Đếm Lượt Xem (View Count)

#### Tính năng:
- ✅ Tự động đếm lượt xem khi người dùng vào trang bài viết
- ✅ Chỉ đếm 1 lần mỗi session (tránh đếm trùng khi refresh)
- ✅ Hiển thị số lượt xem trên trang bài viết
- ✅ Tự động cập nhật số lượt xem

#### Cách hoạt động:
- Khi người dùng vào trang bài viết, hệ thống tự động tăng số lượt xem
- Sử dụng sessionStorage để tránh đếm trùng trong cùng một session
- Số lượt xem được hiển thị ngay cạnh số lượng bình luận

## 🗄️ Cấu Trúc Database

### Collection: `comments`
```javascript
{
  _id: ObjectId,
  postSlug: String,        // Slug của bài viết
  author: {
    id: String,            // ID người dùng
    name: String,          // Tên người dùng
    email: String,         // Email người dùng
    image: String          // URL ảnh đại diện (tùy chọn)
  },
  content: String,         // Nội dung bình luận (tối đa 1000 ký tự)
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `viewcounts`
```javascript
{
  _id: ObjectId,
  postSlug: String,        // Slug của bài viết (unique)
  count: Number,           // Số lượt xem
  lastViewedAt: Date,      // Thời gian xem cuối cùng
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Routes

### 1. Comments API

#### GET `/api/posts/[slug]/comments`
- Lấy tất cả bình luận của bài viết
- Sắp xếp theo thời gian mới nhất
- Response:
```json
{
  "success": true,
  "comments": [...],
  "count": 10
}
```

#### POST `/api/posts/[slug]/comments`
- Tạo bình luận mới
- Yêu cầu đăng nhập
- Body:
```json
{
  "content": "Nội dung bình luận"
}
```
- Response:
```json
{
  "success": true,
  "message": "Bình luận đã được thêm thành công",
  "comment": {...}
}
```

#### DELETE `/api/posts/[slug]/comments/[id]`
- Xóa bình luận
- Yêu cầu đăng nhập
- Chỉ người tạo hoặc admin mới có thể xóa
- Response:
```json
{
  "success": true,
  "message": "Bình luận đã được xóa thành công"
}
```

### 2. View Count API

#### GET `/api/posts/[slug]/views`
- Lấy số lượt xem của bài viết
- Response:
```json
{
  "success": true,
  "count": 123
}
```

#### POST `/api/posts/[slug]/views`
- Tăng số lượt xem
- Tự động được gọi khi trang bài viết được load
- Response:
```json
{
  "success": true,
  "count": 124
}
```

## 🎨 Components

### 1. `CommentsSection`
- Component hiển thị phần bình luận
- Location: `components/comments-section.tsx`
- Props:
  - `postSlug`: Slug của bài viết
  - `onCommentChange?`: Callback khi có thay đổi bình luận

### 2. `ViewTracker`
- Component theo dõi lượt xem
- Location: `components/view-tracker.tsx`
- Props:
  - `postSlug`: Slug của bài viết
- Tự động track view khi component mount

### 3. `PostMeta`
- Component hiển thị metadata (view count, comment count, date)
- Location: `components/post-meta.tsx`
- Props:
  - `postSlug`: Slug của bài viết
  - `publishedAt?`: Ngày xuất bản
  - `refreshTrigger?`: Trigger để refresh data

### 4. `PostMetaWithRefresh`
- Wrapper component để tự động refresh metadata
- Location: `components/post-meta-wrapper.tsx`
- Sử dụng event listener để cập nhật khi có thay đổi bình luận

## 🔒 Bảo Mật

### Comments:
- ✅ Yêu cầu đăng nhập để thêm bình luận
- ✅ Chỉ người tạo hoặc admin mới có thể xóa bình luận
- ✅ Validate nội dung bình luận (không được để trống, tối đa 1000 ký tự)
- ✅ Sanitize input để tránh XSS

### View Count:
- ✅ Sử dụng sessionStorage để tránh đếm trùng
- ✅ Tự động track, không cần tương tác người dùng

## 📱 Responsive Design

- ✅ Giao diện responsive trên mọi thiết bị
- ✅ Form bình luận tối ưu cho mobile
- ✅ Hiển thị bình luận dễ đọc trên mọi kích thước màn hình

## 🌐 Đa Ngôn Ngữ

- ✅ Tất cả text đã được dịch sang tiếng Việt
- ✅ Thời gian hiển thị theo format Việt Nam
- ✅ Toast messages bằng tiếng Việt

## 🚀 Cách Sử Dụng

### Đối với Người Dùng:

1. **Xem bình luận**:
   - Vào bất kỳ bài viết nào
   - Cuộn xuống phần "Bình luận"
   - Xem tất cả bình luận của bài viết

2. **Thêm bình luận**:
   - Đăng nhập vào tài khoản
   - Vào bài viết muốn bình luận
   - Cuộn xuống phần bình luận
   - Nhập nội dung và click "Gửi bình luận"

3. **Xóa bình luận**:
   - Tìm bình luận của bạn
   - Click icon thùng rác
   - Xác nhận xóa

### Đối với Admin:

- Có thể xóa bất kỳ bình luận nào
- Xem số lượt xem và số bình luận của mỗi bài viết

## 🐛 Troubleshooting

### Bình luận không hiển thị:
- Kiểm tra MongoDB connection
- Kiểm tra API route có hoạt động không
- Kiểm tra browser console để xem lỗi

### View count không tăng:
- Kiểm tra MongoDB connection
- Kiểm tra API route có hoạt động không
- Clear sessionStorage và thử lại

### Không thể thêm bình luận:
- Kiểm tra đã đăng nhập chưa
- Kiểm tra nội dung bình luận có hợp lệ không
- Kiểm tra browser console để xem lỗi

## 📝 Ghi Chú

- View count chỉ đếm 1 lần mỗi session để tránh đếm trùng
- Bình luận được sắp xếp theo thời gian mới nhất
- Admin có thể xóa bất kỳ bình luận nào
- Tất cả dữ liệu được lưu trong MongoDB

## 🔄 Cập Nhật Tương Lai

Có thể mở rộng thêm:
- Reply/Phản hồi bình luận
- Like/Dislike bình luận
- Edit bình luận
- Report bình luận
- Filter/Sort bình luận
- Pagination cho bình luận
- Rich text editor cho bình luận
- Upload ảnh trong bình luận

## ✅ Checklist

- [x] Tạo Comment model
- [x] Tạo ViewCount model
- [x] Tạo API routes cho comments
- [x] Tạo API routes cho view count
- [x] Tạo UI components
- [x] Tích hợp vào trang blog post
- [x] Thêm validation và error handling
- [x] Thêm authentication checks
- [x] Thêm responsive design
- [x] Thêm đa ngôn ngữ (tiếng Việt)
- [x] Test tất cả tính năng

## 🎉 Hoàn Thành!

Tất cả tính năng đã được triển khai và sẵn sàng sử dụng. Người dùng có thể:
- ✅ Xem và thêm bình luận
- ✅ Xóa bình luận của mình
- ✅ Xem số lượt xem bài viết
- ✅ Xem số lượng bình luận

Chúc bạn sử dụng thành công! 🚀

