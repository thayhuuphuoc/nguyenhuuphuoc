# Hướng Dẫn Khắc Phục Lỗi Đăng Nhập Không Báo Lỗi

## 🐛 Vấn Đề

Đăng nhập không thành công nhưng hệ thống không báo lỗi cho người dùng.

## 🔍 Nguyên Nhân

1. **Error handling không đầy đủ**: Code chỉ kiểm tra `result?.error` nhưng NextAuth có thể trả về lỗi theo nhiều cách khác nhau
2. **Thiếu logging**: Không có logging chi tiết để debug
3. **Thông báo lỗi không rõ ràng**: Thông báo lỗi bằng tiếng Anh và không chi tiết

## ✅ Giải Pháp Đã Áp Dụng

### 1. Cải Thiện Error Handling

Đã cập nhật `app/(auth)/sign-in/page.tsx` để kiểm tra nhiều trường hợp lỗi:

```typescript
// Kiểm tra nhiều trường hợp lỗi
if (result?.error) {
  // Lỗi từ NextAuth
  if (result.error === "CredentialsSignin") {
    toast.error("Email hoặc mật khẩu không đúng")
  } else {
    toast.error(result.error || "Đăng nhập thất bại. Vui lòng thử lại.")
  }
} else if (result?.ok === false) {
  // NextAuth trả về ok: false nhưng không có error
  toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.")
} else if (!result) {
  // Result là null hoặc undefined
  toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.")
} else if (result.ok) {
  // Thành công
  toast.success("Đăng nhập thành công!")
  router.push("/")
  router.refresh()
} else {
  // Trường hợp không mong đợi
  toast.error("Đăng nhập thất bại. Vui lòng thử lại.")
}
```

### 2. Thêm Logging Chi Tiết

Đã thêm console.log để debug:

```typescript
console.log("🔐 Sign in attempt:", {
  email: formData.email,
  passwordLength: formData.password.length,
})

console.log("🔐 Sign in result:", {
  ok: result?.ok,
  error: result?.error,
  status: result?.status,
  url: result?.url,
})
```

### 3. Dịch UI Sang Tiếng Việt

Đã dịch toàn bộ UI sang tiếng Việt:
- "Welcome back" → "Chào mừng trở lại"
- "Sign in to your account to continue" → "Đăng nhập vào tài khoản của bạn để tiếp tục"
- "Password" → "Mật khẩu"
- "Forgot password?" → "Quên mật khẩu?"
- "Signing in..." → "Đang đăng nhập..."
- "Sign In" → "Đăng nhập"
- "Don't have an account?" → "Chưa có tài khoản?"
- "Sign up" → "Đăng ký"

## 🔧 Cách Kiểm Tra

### Bước 1: Mở Browser Console

1. Mở trang đăng nhập: `http://localhost:3000/sign-in`
2. Mở Browser Console (F12)
3. Thử đăng nhập với thông tin sai
4. Xem logs trong console

### Bước 2: Kiểm Tra Logs

Bạn sẽ thấy các logs sau:

**Khi đăng nhập:**
```
🔐 Sign in attempt: { email: "test@example.com", passwordLength: 8 }
🔐 Sign in result: { ok: false, error: "CredentialsSignin", status: 401, url: null }
❌ Sign in error: CredentialsSignin
```

**Khi thành công:**
```
🔐 Sign in attempt: { email: "test@example.com", passwordLength: 8 }
🔐 Sign in result: { ok: true, error: null, status: 200, url: "/" }
✅ Sign in successful
```

### Bước 3: Kiểm Tra Server Logs

Kiểm tra logs trong terminal (nếu chạy local) hoặc Vercel logs (nếu trên production):

**Khi đăng nhập:**
```
🔍 Login attempt: { email: "test@example.com", passwordLength: 8 }
📊 Database connected, searching in database...
❌ User not found in database
❌ No user found in database or demo users
```

**Khi thành công:**
```
🔍 Login attempt: { email: "test@example.com", passwordLength: 8 }
📊 Database connected, searching in database...
✅ User found in database: { id: "...", email: "test@example.com", hasPassword: true }
🔐 Password validation result: true
```

## 🐛 Troubleshooting

### Lỗi: Vẫn Không Báo Lỗi

**Nguyên nhân:**
- Toast notification không hiển thị
- Browser console có lỗi JavaScript
- NextAuth không trả về error đúng cách

**Giải pháp:**
1. Kiểm tra browser console có lỗi không
2. Kiểm tra toast notification có được import đúng không
3. Kiểm tra NextAuth configuration có đúng không
4. Kiểm tra server logs để xem có lỗi không

### Lỗi: "CredentialsSignin" Không Hiển Thị

**Nguyên nhân:**
- NextAuth không set error code đúng cách
- authorize() function không return null đúng cách

**Giải pháp:**
1. Kiểm tra `lib/auth.ts` - authorize() function phải return `null` khi đăng nhập thất bại
2. Kiểm tra NextAuth version có đúng không
3. Kiểm tra error handling trong sign-in page

### Lỗi: Logs Không Hiển Thị

**Nguyên nhân:**
- Console.log không hoạt động
- Browser console bị tắt
- Production build không có logs

**Giải pháp:**
1. Đảm bảo browser console đang mở
2. Kiểm tra console không bị filter
3. Kiểm tra production logs trong Vercel

## 📝 Checklist

- [ ] Error handling đã được cải thiện
- [ ] Logging chi tiết đã được thêm
- [ ] UI đã được dịch sang tiếng Việt
- [ ] Toast notifications hoạt động đúng
- [ ] Browser console hiển thị logs
- [ ] Server logs hiển thị chi tiết
- [ ] Lỗi được báo cho người dùng

## 🎯 Kết Luận

Sau khi cải thiện error handling:
1. ✅ Lỗi đăng nhập sẽ được báo cho người dùng
2. ✅ Logging chi tiết giúp debug dễ dàng hơn
3. ✅ UI đã được dịch sang tiếng Việt
4. ✅ Thông báo lỗi rõ ràng và dễ hiểu

## 🔗 Related Files

- `app/(auth)/sign-in/page.tsx` - Sign-in page với error handling
- `lib/auth.ts` - NextAuth configuration
- `HUONG-DAN-FIX-LOI-DANG-NHAP.md` - Hướng dẫn khắc phục lỗi đăng nhập

## 💡 Tips

1. **Always check console**: Luôn kiểm tra browser console để debug
2. **Check server logs**: Kiểm tra server logs để xem chi tiết lỗi
3. **Test with wrong credentials**: Test với thông tin đăng nhập sai để kiểm tra error handling
4. **Check NextAuth docs**: Tham khảo NextAuth documentation để hiểu cách error handling

