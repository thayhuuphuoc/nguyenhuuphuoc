# Hướng Dẫn Đổi Tên Miền Website Sang nguyenhuuphuoc.info

## Tổng Quan

Hướng dẫn này sẽ giúp bạn cấu hình domain `nguyenhuuphuoc.info` cho website đã được deploy trên Vercel.

## Bước 1: Truy Cập Vercel Dashboard

1. Đăng nhập vào tài khoản Vercel của bạn tại [vercel.com](https://vercel.com)
2. Chọn project website của bạn từ dashboard
3. Vào **Settings** → **Domains**

## Bước 2: Thêm Domain vào Vercel

1. Trong trang **Domains**, nhấn vào nút **Add Domain**
2. Nhập domain `nguyenhuuphuoc.info`
3. Vercel sẽ tự động detect và hiển thị các loại domain records cần cấu hình:
   - **A Record** hoặc **CNAME Record** cho domain chính
   - **CNAME Record** cho www subdomain (nếu cần)

## Bước 3: Cấu Hình DNS Records

### 3.1. Truy Cập DNS Provider

Đăng nhập vào nhà cung cấp DNS của bạn (nơi bạn mua domain `nguyenhuuphuoc.info`), ví dụ:
- **Namecheap**
- **GoDaddy**
- **Google Domains**
- **Cloudflare**
- Hoặc nhà cung cấp khác

### 3.2. Thêm DNS Records

Trong phần quản lý DNS của domain `nguyenhuuphuoc.info`, thêm các records sau:

#### Option 1: Sử dụng CNAME (Khuyến nghị)

```
Type: CNAME
Name: @ (hoặc để trống, tùy nhà cung cấp)
Value: cname.vercel-dns.com
TTL: 3600 (hoặc Auto)
```

Nếu nhà cung cấp DNS không hỗ trợ CNAME cho root domain (@), sử dụng Option 2.

#### Option 2: Sử dụng A Records

```
Type: A
Name: @ (hoặc để trống)
Value: 76.76.21.21
TTL: 3600
```

**Lưu ý:** Vercel có thể cung cấp các địa chỉ IP khác nhau. Kiểm tra trong Vercel Dashboard để có IP chính xác.

#### Option 3: Sử dụng ALIAS/ANAME (Nếu hỗ trợ)

Một số nhà cung cấp DNS hỗ trợ ALIAS/ANAME records:

```
Type: ALIAS (hoặc ANAME)
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

### 3.3. Thêm www Subdomain (Tùy chọn)

Nếu muốn hỗ trợ `www.nguyenhuuphuoc.info`:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

## Bước 4: Xác Minh Domain trong Vercel

1. Sau khi thêm DNS records, quay lại Vercel Dashboard
2. Vercel sẽ tự động kiểm tra và xác minh domain
3. Quá trình này có thể mất từ vài phút đến 48 giờ (thường là 5-30 phút)
4. Khi domain được xác minh, trạng thái sẽ chuyển sang **Valid**

## Bước 5: Cấu Hình SSL Certificate

1. Vercel sẽ tự động cấp SSL certificate (HTTPS) cho domain
2. Quá trình này thường tự động sau khi domain được xác minh
3. Kiểm tra trạng thái SSL trong **Settings** → **Domains**

## Bước 6: Cấu Hình Redirects (Tùy chọn)

### 6.1. Redirect www sang non-www (hoặc ngược lại)

Trong file `next.config.js` hoặc `next.config.mjs`, thêm:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.nguyenhuuphuoc.info',
          },
        ],
        destination: 'https://nguyenhuuphuoc.info/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

### 6.2. Redirect old domain sang new domain

Nếu bạn có domain cũ (ví dụ: `nguyenhuuphuoc-nguyen-huu-phuocs-projects-9e0716c3.vercel.app`):

```javascript
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'nguyenhuuphuoc-nguyen-huu-phuocs-projects-9e0716c3.vercel.app',
        },
      ],
      destination: 'https://nguyenhuuphuoc.info/:path*',
      permanent: true,
    },
  ]
}
```

## Bước 7: Cập Nhật Environment Variables (Nếu cần)

Nếu website sử dụng domain trong environment variables, cập nhật:

1. Vào **Settings** → **Environment Variables**
2. Cập nhật các biến như:
   - `NEXT_PUBLIC_SITE_URL` → `https://nguyenhuuphuoc.info`
   - `NEXTAUTH_URL` → `https://nguyenhuuphuoc.info`
   - Các biến khác có liên quan đến domain

## Bước 8: Kiểm Tra và Test

1. **Kiểm tra DNS Propagation:**
   ```bash
   # Kiểm tra DNS records
   nslookup nguyenhuuphuoc.info
   dig nguyenhuuphuoc.info
   
   # Hoặc sử dụng online tools:
   # - https://dnschecker.org
   # - https://www.whatsmydns.net
   ```

2. **Kiểm tra Website:**
   - Truy cập `https://nguyenhuuphuoc.info`
   - Kiểm tra SSL certificate (🔒 trong browser)
   - Kiểm tra tất cả các trang hoạt động đúng

3. **Kiểm tra Performance:**
   - Test tốc độ load trang
   - Kiểm tra các API endpoints
   - Kiểm tra các tính năng authentication (nếu có)

## Bước 9: Cập Nhật CORS Settings (Nếu có)

Nếu website sử dụng Sanity CMS hoặc các service khác:

1. **Sanity CMS:**
   - Vào [sanity.io/manage](https://sanity.io/manage)
   - Chọn project
   - Vào **API** → **CORS origins**
   - Thêm `https://nguyenhuuphuoc.info` và `https://www.nguyenhuuphuoc.info`

2. **NextAuth (Nếu sử dụng):**
   - Cập nhật `NEXTAUTH_URL` trong environment variables
   - Thêm domain mới vào `NEXTAUTH_URL` trong `.env.local`

## Bước 10: Cập Nhật Social Media và SEO

1. **Google Search Console:**
   - Thêm property mới với domain `nguyenhuuphuoc.info`
   - Submit sitemap
   - Request indexing

2. **Google Analytics:**
   - Cập nhật domain trong Google Analytics settings

3. **Social Media:**
   - Cập nhật links trong các profile social media
   - Cập nhật Open Graph tags trong metadata

## Troubleshooting

### Domain không hoạt động sau 48 giờ

1. **Kiểm tra DNS Records:**
   - Đảm bảo DNS records đã được cấu hình đúng
   - Kiểm tra TTL và đợi propagation

2. **Kiểm tra Vercel Settings:**
   - Đảm bảo domain đã được thêm vào project
   - Kiểm tra trạng thái domain (Valid/Invalid)

3. **Clear DNS Cache:**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### SSL Certificate không được cấp

1. Đảm bảo domain đã được xác minh trong Vercel
2. Kiểm tra DNS records đã propagate đúng
3. Liên hệ Vercel support nếu vấn đề vẫn tiếp tục

### Website không load sau khi đổi domain

1. Kiểm tra DNS propagation
2. Kiểm tra Vercel deployment logs
3. Kiểm tra environment variables
4. Kiểm tra CORS settings (nếu có)

## Lưu Ý Quan Trọng

1. **DNS Propagation:** Có thể mất từ vài phút đến 48 giờ để DNS propagate hoàn toàn
2. **SSL Certificate:** Vercel tự động cấp SSL, nhưng có thể mất vài phút
3. **Old Domain:** Domain cũ (vercel.app) vẫn sẽ hoạt động, nhưng nên redirect sang domain mới
4. **Backup:** Luôn backup cấu hình và code trước khi thay đổi

## Tài Liệu Tham Khảo

- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Vercel DNS Configuration](https://vercel.com/docs/concepts/projects/domains/dns-records)
- [Next.js Domain Configuration](https://nextjs.org/docs/app/building-your-application/configuring/domains)

## Hỗ Trợ

Nếu gặp vấn đề, bạn có thể:
1. Kiểm tra [Vercel Status Page](https://vercel-status.com)
2. Xem [Vercel Documentation](https://vercel.com/docs)
3. Liên hệ [Vercel Support](https://vercel.com/support)

---

**Chúc bạn thành công! 🎉**

