# ✅ Checklist: Thêm Dữ Liệu Vào Sanity CMS

## 🎯 Mục Tiêu
Thêm đủ dữ liệu để trang chủ hiển thị đầy đủ như trang mẫu.

---

## 📋 Checklist

### 1. Truy Cập Sanity Studio
- [ ] Đăng nhập vào [sanity.io/manage](https://www.sanity.io/manage)
- [ ] Chọn đúng project (Project ID khớp với `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- [ ] Mở Content Studio

### 2. Tạo Categories (Danh Mục)
- [ ] Technology (slug: technology)
- [ ] Health (slug: health)
- [ ] Travel (slug: travel)
- [ ] Lifestyle (slug: lifestyle)
- [ ] Culture (slug: culture)
- [ ] Knowledge (slug: knowledge)
- [ ] **Tất cả đã Publish** ✅

### 3. Tạo Authors (Tác Giả)
- [ ] Nguyen Huu Phuoc (slug: nguyen-huu-phuoc)
  - [ ] Name: "Nguyen Huu Phuoc"
  - [ ] Image: Upload ảnh đại diện
  - [ ] Role: "Blogger" hoặc "Writer"
  - [ ] Bio: Mô tả ngắn
- [ ] **Đã Publish** ✅

### 4. Tạo Posts (Bài Viết) - Tối thiểu 6 bài

#### Post 1: Featured Article
- [ ] Title: "Top Articles to Read on Technology"
- [ ] Slug: auto-generated
- [ ] Published at: ✅ **Đã set ngày** (QUAN TRỌNG!)
- [ ] Author: Nguyen Huu Phuoc
- [ ] Category: Technology
- [ ] Main Image: ✅ Upload ảnh
- [ ] Body: ✅ Có nội dung (500+ từ)
- [ ] Reading Time: 5-10 phút
- [ ] **Đã Publish** ✅

#### Post 2: Featured Article
- [ ] Title: "Technical Blogging - A Skill with Many Benefits"
- [ ] Published at: ✅ **Đã set ngày**
- [ ] Author: Nguyen Huu Phuoc
- [ ] Category: Technology
- [ ] Main Image: ✅ Upload ảnh
- [ ] Body: ✅ Có nội dung
- [ ] Reading Time: 5-10 phút
- [ ] **Đã Publish** ✅

#### Post 3-6: Regular Posts
- [ ] Post 3: "The Top 25 Health & Wellness Blogs" (Category: Health)
  - [ ] Published at: ✅
  - [ ] Main Image: ✅
  - [ ] Body: ✅
  - [ ] **Đã Publish** ✅

- [ ] Post 4: "The Best Travel Blogs of 2024" (Category: Travel)
  - [ ] Published at: ✅
  - [ ] Main Image: ✅
  - [ ] Body: ✅
  - [ ] **Đã Publish** ✅

- [ ] Post 5: "I wish I knew this before creating a travel blog" (Category: Travel)
  - [ ] Published at: ✅
  - [ ] Main Image: ✅
  - [ ] Body: ✅
  - [ ] **Đã Publish** ✅

- [ ] Post 6: "How To Start A Travel Blog - An Easy Step By Step Guide" (Category: Travel)
  - [ ] Published at: ✅
  - [ ] Main Image: ✅
  - [ ] Body: ✅
  - [ ] **Đã Publish** ✅

#### Posts 7-10 (Tùy chọn - để có nhiều dữ liệu hơn)
- [ ] Post 7: (Category: Lifestyle)
- [ ] Post 8: (Category: Culture)
- [ ] Post 9: (Category: Knowledge)
- [ ] Post 10: (Category: Technology)
- [ ] **Tất cả đã Publish** ✅

### 5. Kiểm Tra Trên Website
- [ ] Refresh trang chủ (Ctrl+F5)
- [ ] Kiểm tra Featured Articles (2 bài) ✅
- [ ] Kiểm tra Recent Articles (3 bài) ✅
- [ ] Kiểm tra Categories Grid (6+ bài) ✅
- [ ] Kiểm tra Newsletter section ✅
- [ ] Kiểm tra trang `/blog` ✅
- [ ] Kiểm tra trang `/author` ✅
- [ ] Kiểm tra trang chi tiết post `/blog/[slug]` ✅

### 6. Kiểm Tra Console (Developer Tools)
- [ ] Mở Developer Tools (F12)
- [ ] Tab Console: Không có lỗi ✅
- [ ] Tab Network: API calls đến Sanity thành công ✅

---

## ⚠️ Lưu Ý Quan Trọng

### ❌ Lỗi Thường Gặp
1. **Posts không hiển thị**
   - ❌ Chưa set **Published at**
   - ✅ **Giải pháp**: Set ngày và Publish lại

2. **Images không hiển thị**
   - ❌ Chưa upload Main Image
   - ✅ **Giải pháp**: Upload và set Main Image

3. **Categories/Authors không hiển thị**
   - ❌ Chưa Publish
   - ✅ **Giải pháp**: Publish trước khi tạo posts

### ✅ Quy Tắc Vàng
1. **Published at là BẮT BUỘC** - Post chỉ hiển thị khi có ngày này
2. **Publish ngay sau khi tạo** - Draft không hiển thị trên website
3. **Tạo Categories và Authors trước** - Posts cần reference đến chúng
4. **Main Image nên có** - Để website hiển thị đẹp
5. **Body nên có nội dung** - Ít nhất 500 từ

---

## 🎯 Thứ Tự Thực Hiện (Khuyến nghị)

1. ✅ **Bước 1**: Tạo 5-6 Categories → Publish
2. ✅ **Bước 2**: Tạo 1 Author → Publish
3. ✅ **Bước 3**: Tạo 6-10 Posts → Publish
4. ✅ **Bước 4**: Kiểm tra trên website
5. ✅ **Bước 5**: Điều chỉnh nếu cần

---

## 📊 Kết Quả Mong Đợi

Sau khi hoàn thành checklist:
- ✅ Trang chủ hiển thị đầy đủ các sections
- ✅ Featured Articles: 2 bài
- ✅ Recent Articles: 3 bài
- ✅ Categories Grid: 6+ bài
- ✅ Newsletter section: Hiển thị
- ✅ Trang chủ giống với trang mẫu
- ✅ Website hoạt động bình thường

---

## 🆘 Cần Hỗ Trợ?

Nếu gặp vấn đề:
1. Xem file `HUONG-DAN-THEM-DU-LIEU-SANITY.md` để có hướng dẫn chi tiết
2. Kiểm tra Console trong Developer Tools
3. Kiểm tra Network tab
4. Kiểm tra Sanity Studio xem content đã Published chưa

---

**Chúc bạn thành công! 🎉**

