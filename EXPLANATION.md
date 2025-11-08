# Giải Thích Vì Sao Trang Chủ Không Giống Trang Mẫu

## Vấn Đề Chính

Trang chủ hiện tại (`app/(site)/page.tsx`) có cấu trúc **conditional rendering** - chỉ hiển thị các sections khi có dữ liệu từ Sanity CMS.

## So Sánh

### Trang Mẫu (https://blog-forge-sanity.vercel.app/)
- ✅ Có dữ liệu posts từ Sanity CMS
- ✅ Hiển thị đầy đủ: Featured Articles, Recent Articles, Categories Grid
- ✅ Layout đầy đủ với các cards và images

### Trang Hiện Tại (https://nguyenhuuphuoc-nguyen-huu-phuocs-projects-9e0716c3.vercel.app/)
- ❌ Có thể chưa có dữ liệu posts trong Sanity CMS
- ❌ Chỉ hiển thị: Hero Section + Empty State + Newsletter
- ❌ Không hiển thị các sections có điều kiện (Featured, Recent, Categories)

## Code Hiện Tại

```tsx
// Featured Articles - CHỈ hiển thị khi featuredPosts.length > 0
{featuredPosts.length > 0 && (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
    ...
  </section>
)}

// Recent Articles - CHỈ hiển thị khi recentPosts.length > 0
{recentPosts.length > 0 && (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
    ...
  </section>
)}

// Explore Categories - CHỈ hiển thị khi categories.length > 0
{categories.length > 0 && (
  <section className="mb-16">
    ...
  </section>
)}
```

## Nguyên Nhân

1. **Không có dữ liệu trong Sanity CMS**: 
   - Dataset chưa có posts
   - Hoặc posts chưa được publish
   - Hoặc kết nối Sanity chưa đúng

2. **Conditional Rendering**: 
   - Code chỉ render sections khi có dữ liệu
   - Nếu `posts.length === 0`, chỉ hiển thị Empty State

3. **Layout khác**: 
   - Trang mẫu có thể có layout/styling khác
   - Hero section có thể khác
   - Spacing, colors có thể khác

## Giải Pháp

### Giải pháp 1: Thêm dữ liệu vào Sanity CMS
1. Vào Sanity Studio
2. Tạo posts mới
3. Publish posts
4. Trang chủ sẽ tự động hiển thị đầy đủ

### Giải pháp 2: Thêm placeholder/mock data
- Hiển thị sections ngay cả khi không có dữ liệu
- Dùng mock data để preview layout

### Giải pháp 3: Điều chỉnh layout để giống trang mẫu
- Xem lại cấu trúc layout của trang mẫu
- Điều chỉnh spacing, colors, typography
- Có thể cần thay đổi cách hiển thị cards

## Kiểm Tra

Để kiểm tra xem có dữ liệu hay không:

1. **Kiểm tra Sanity CMS**:
   - Vào Sanity Studio
   - Xem có posts không
   - Kiểm tra posts đã được publish chưa

2. **Kiểm tra Console**:
   - Mở Developer Tools
   - Xem có lỗi fetch data không
   - Kiểm tra network requests

3. **Kiểm tra Environment Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN`

## Kết Luận

Trang chủ không giống trang mẫu chủ yếu vì:
1. **Thiếu dữ liệu** từ Sanity CMS
2. **Conditional rendering** khiến các sections không hiển thị khi không có dữ liệu
3. **Layout/styling** có thể khác một chút

Cần thêm dữ liệu vào Sanity CMS hoặc điều chỉnh code để hiển thị layout ngay cả khi không có dữ liệu.

