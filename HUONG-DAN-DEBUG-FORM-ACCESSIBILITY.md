# Hướng Dẫn Debug Form Accessibility Issues

## 🔍 Cách Kiểm Tra Lỗi Form Accessibility

### Bước 1: Mở Browser DevTools

1. Mở website trong browser
2. Nhấn `F12` hoặc `Ctrl + Shift + I` (Windows) hoặc `Cmd + Option + I` (Mac)
3. Vào tab **Issues** hoặc **Accessibility**

### Bước 2: Tìm Lỗi Form Fields

1. Trong tab **Issues**, tìm các lỗi:
   - "A form field element has neither an id nor a name attribute"
   - "No label associated with a form field"
   - "An element doesn't have an autocomplete attribute"

2. Click vào lỗi để xem element nào đang báo lỗi

### Bước 3: Kiểm Tra Element

1. Right-click trên element có vấn đề
2. Chọn **Inspect Element**
3. Kiểm tra xem input/textarea element có:
   - `id` attribute
   - `name` attribute
   - `autocomplete` attribute
   - Label được associate (qua `htmlFor` hoặc `aria-labelledby`)

### Bước 4: Xác Định Component

1. Xem HTML source để xác định component nào đang render element này
2. Kiểm tra file component tương ứng
3. Đảm bảo component có set đúng `id`, `name`, `autoComplete` props

## 🔧 Các Form Đã Được Sửa

### ✅ Sign-in Form (`/sign-in`)
- Email input: `id="email"`, `name="email"`, `autoComplete="email"`
- Password input: `id="password"`, `name="password"`, `autoComplete="current-password"`

### ✅ Sign-up Form (`/sign-up`)
- Name input: `id="name"`, `name="name"`, `autoComplete="name"`
- Email input: `id="email"`, `name="email"`, `autoComplete="email"`
- Password input: `id="password"`, `name="password"`, `autoComplete="new-password"`
- Confirm password input: `id="confirmPassword"`, `name="confirmPassword"`, `autoComplete="new-password"`
- Terms checkbox: `id="terms"`, `name="terms"`

### ✅ Contact Form (`/contact-us`)
- Name input: `id="name"`, `name="name"`, `autoComplete="name"`
- Email input: `id="email"`, `name="email"`, `autoComplete="email"`
- Subject input: `id="subject"`, `name="subject"`, `autoComplete="off"`
- Message textarea: `id="message"`, `name="message"`, `autoComplete="off"`

### ✅ Newsletter Form (Homepage)
- Email input: `id="newsletter-email"`, `name="email"`, `autoComplete="email"`

### ✅ Comments Form (Blog Post Page)
- Comment textarea: `id="comment"`, `name="comment"`, `autoComplete="off"`

### ✅ Search Dialog (Header)
- Search input: `id="search-dialog-input"`, `name="search"`, `autoComplete="off"`

### ✅ Blog Search (Blog Page)
- Search input: `id="blog-search"`, `name="search"`, `autoComplete="off"`

### ✅ Forgot Password Form (`/forgot-password`)
- Email input: `id="email"`, `name="email"`, `autoComplete="email"`

## 🐛 Nếu Vẫn Còn Lỗi

### 1. Clear Browser Cache

1. Nhấn `Ctrl + Shift + Delete` (Windows) hoặc `Cmd + Shift + Delete` (Mac)
2. Chọn **Cached images and files**
3. Click **Clear data**
4. Hard refresh: `Ctrl + Shift + R` (Windows) hoặc `Cmd + Shift + R` (Mac)

### 2. Kiểm Tra HTML Source

1. Right-click trên trang → **View Page Source**
2. Tìm form field có vấn đề
3. Kiểm tra xem attributes có được render đúng không

### 3. Kiểm Tra React DevTools

1. Cài đặt React DevTools extension
2. Mở React DevTools
3. Tìm component đang render form field có vấn đề
4. Kiểm tra props của component

### 4. Kiểm Tra Server-Side Rendering

1. Kiểm tra xem form có được render trên server-side không
2. Đảm bảo các attributes được set đúng trong server-side rendering
3. Kiểm tra hydration có vấn đề không

## 📝 Checklist Debug

- [ ] Clear browser cache và hard refresh
- [ ] Kiểm tra HTML source trong browser
- [ ] Kiểm tra React DevTools
- [ ] Kiểm tra server-side rendering
- [ ] Kiểm tra tất cả các form fields
- [ ] Kiểm tra các component được render động
- [ ] Kiểm tra các thư viện bên ngoài

## 💡 Tips

1. **Always check browser console**: Luôn kiểm tra browser console để xem lỗi
2. **Use React DevTools**: Sử dụng React DevTools để debug components
3. **Check HTML source**: Kiểm tra HTML source để xác nhận attributes
4. **Clear cache**: Clear browser cache sau khi thay đổi code
5. **Hard refresh**: Hard refresh browser để load code mới

## 🚨 Nếu Vẫn Không Tìm Thấy Nguyên Nhân

Nếu vẫn không tìm thấy nguyên nhân, cung cấp:
1. Browser console logs
2. HTML source của element có vấn đề
3. Component code đang render element này
4. React DevTools screenshot
5. Browser và version

