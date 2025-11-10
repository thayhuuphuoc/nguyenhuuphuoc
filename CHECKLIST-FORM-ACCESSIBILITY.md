# Checklist - Form Accessibility

## ✅ Đã Sửa Các Form Fields

### 1. Sign-in Page (`app/(auth)/sign-in/page.tsx`)
- ✅ Email: `id="email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="email"`
- ✅ Password: `id="password"`, `name="password"`, `autoComplete="current-password"`, label với `htmlFor="password"`

### 2. Sign-up Page (`app/(auth)/signup/page.tsx`)
- ✅ Name: `id="name"`, `name="name"`, `autoComplete="name"`, label với `htmlFor="name"`
- ✅ Email: `id="email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="email"`
- ✅ Password: `id="password"`, `name="password"`, `autoComplete="new-password"`, label với `htmlFor="password"`
- ✅ Confirm Password: `id="confirmPassword"`, `name="confirmPassword"`, `autoComplete="new-password"`, label với `htmlFor="confirmPassword"`
- ✅ Terms: `id="terms"`, `name="terms"`, label với `htmlFor="terms"`

### 3. Sign-up Page Alternative (`app/(auth)/sign-up/page.tsx`)
- ✅ Name: `id="name"`, `name="name"`, `autoComplete="name"`, label với `htmlFor="name"`
- ✅ Email: `id="email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="email"`
- ✅ Password: `id="password"`, `name="password"`, `autoComplete="new-password"`, label với `htmlFor="password"`
- ✅ Confirm Password: `id="confirmPassword"`, `name="confirmPassword"`, `autoComplete="new-password"`, label với `htmlFor="confirmPassword"`
- ✅ Terms: `id="terms"`, `name="terms"`, label với `htmlFor="terms"`

### 4. Sign-in Page Alternative (`app/(auth)/signin/page.tsx`)
- ✅ Email: `id="email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="email"`
- ✅ Password: `id="password"`, `name="password"`, `autoComplete="current-password"`, label với `htmlFor="password"`

### 5. Contact Form (`app/(site)/contact-us/page.tsx`)
- ✅ Name: `id="name"`, `name="name"`, `autoComplete="name"`, label với `htmlFor="name"`
- ✅ Email: `id="email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="email"`
- ✅ Subject: `id="subject"`, `name="subject"`, `autoComplete="off"`, label với `htmlFor="subject"`
- ✅ Message: `id="message"`, `name="message"`, `autoComplete="off"`, label với `htmlFor="message"`

### 6. Newsletter Form (`app/(site)/page.tsx`) ⚠️ QUAN TRỌNG
- ✅ Email: `id="newsletter-email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="newsletter-email"` (sr-only)

### 7. Comments Form (`components/comments-section.tsx`)
- ✅ Comment: `id="comment"`, `name="comment"`, `autoComplete="off"`, label với `htmlFor="comment"` (sr-only)

### 8. Search Dialog (`components/search-dialog.tsx`)
- ✅ Search: `id="search-dialog-input"`, `name="search"`, `autoComplete="off"`, `aria-label`

### 9. Blog Search (`components/blog-search.tsx`)
- ✅ Search: `id="blog-search"`, `name="search"`, `autoComplete="off"`, label với `htmlFor="blog-search"` (sr-only)

### 10. Forgot Password Form (`app/(auth)/forgot-password/page.tsx`)
- ✅ Email: `id="email"`, `name="email"`, `autoComplete="email"`, label với `htmlFor="email"`

### 11. CommandInput Component (`components/ui/command.tsx`)
- ✅ Đã được cải thiện để đảm bảo `id`, `name`, `autoComplete` được set đúng cách
- ✅ Thêm label với `sr-only`
- ✅ Đảm bảo các props được forward đúng cách đến `CommandPrimitive.Input`

## 🔍 Kiểm Tra Lại

### Bước 1: Clear Browser Cache

1. Nhấn `Ctrl + Shift + Delete` (Windows) hoặc `Cmd + Shift + Delete` (Mac)
2. Chọn **Cached images and files**
3. Click **Clear data**
4. Hard refresh: `Ctrl + Shift + R` (Windows) hoặc `Cmd + Shift + R` (Mac)

### Bước 2: Kiểm Tra Browser Console

1. Mở browser console (F12)
2. Vào tab **Issues** hoặc **Accessibility**
3. Kiểm tra xem còn lỗi nào không

### Bước 3: Kiểm Tra HTML Source

1. Right-click trên form field bất kỳ
2. Chọn **Inspect Element**
3. Kiểm tra xem input/textarea element có:
   - `id` attribute
   - `name` attribute
   - `autocomplete` attribute
   - Label được associate

## 🐛 Nếu Vẫn Còn Lỗi

### 1. Xác Định Element Có Vấn Đề

1. Mở browser console (F12)
2. Vào tab **Issues**
3. Click vào lỗi để xem element nào đang báo lỗi
4. Right-click trên element → **Inspect Element**
5. Xem HTML source để xác định component nào đang render element này

### 2. Kiểm Tra Component

1. Tìm file component tương ứng
2. Kiểm tra xem component có set đúng `id`, `name`, `autoComplete` props không
3. Kiểm tra xem component có forward props đúng cách không

### 3. Kiểm Tra Thư Viện Bên Ngoài

1. Kiểm tra xem có thư viện bên ngoài nào render form fields không
2. Kiểm tra xem thư viện có forward props đúng cách không
3. Có thể cần wrap component để đảm bảo props được forward đúng

## 📝 Danh Sách Kiểm Tra

- [ ] Clear browser cache và hard refresh
- [ ] Kiểm tra tất cả các form fields đã có `id` attribute
- [ ] Kiểm tra tất cả các form fields đã có `name` attribute
- [ ] Kiểm tra tất cả các form fields đã có `autoComplete` attribute
- [ ] Kiểm tra tất cả các form fields đã có label được associate
- [ ] Kiểm tra browser console không còn lỗi
- [ ] Kiểm tra HTML source để xác nhận attributes

## 🎯 Kết Luận

Tất cả các form fields đã được sửa để có:
- ✅ `id` attribute
- ✅ `name` attribute
- ✅ `autoComplete` attribute
- ✅ Labels được associate

Nếu vẫn còn lỗi, có thể do:
1. Browser cache - cần clear cache và hard refresh
2. Component được render động - cần kiểm tra lại
3. Thư viện bên ngoài - cần kiểm tra lại

## 🔗 Related Files

- `HUONG-DAN-FIX-FORM-ACCESSIBILITY-COMPLETE.md` - Hướng dẫn chi tiết
- `HUONG-DAN-DEBUG-FORM-ACCESSIBILITY.md` - Hướng dẫn debug

