# Hướng Dẫn Setup Sanity Studio

## ✅ Cách 1: Sử dụng Studio tích hợp trong Next.js (Đã setup)

### Bước 1: Kiểm tra Environment Variables

Đảm bảo bạn đã có file `.env.local` với các biến sau:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_PREVIEW_SECRET=your_preview_secret
```

### Bước 2: Chạy Development Server

```bash
npm run dev
```

### Bước 3: Truy cập Studio

Mở trình duyệt và vào:
```
http://localhost:3000/studio
```

✅ **Studio sẽ hiển thị tại route `/studio` trong Next.js app của bạn!**

---

## ✅ Cách 2: Chạy Studio riêng (Standalone)

### Bước 1: Cài đặt Sanity CLI

```bash
npm install -g @sanity/cli
```

### Bước 2: Login vào Sanity

```bash
sanity login
```

### Bước 3: Chạy Studio

```bash
# Từ thư mục project
npm run studio
# Hoặc
sanity dev --port 3333
```

### Bước 4: Truy cập Studio

Mở trình duyệt và vào:
```
http://localhost:3333
```

---

## ✅ Cách 3: Deploy Studio lên Sanity (Khuyến nghị cho Production)

### Bước 1: Cài đặt Sanity CLI

```bash
npm install -g @sanity/cli
```

### Bước 2: Login vào Sanity

```bash
sanity login
```

### Bước 3: Deploy Studio

```bash
# Từ thư mục project
sanity deploy
```

### Bước 4: Truy cập Studio

- Studio sẽ được deploy lên URL: `https://[PROJECT_ID].sanity.studio`
- Bạn sẽ nhận được URL sau khi deploy
- Lưu URL này để truy cập Studio từ bất kỳ đâu

---

## 🎯 Khuyến nghị

### Development (Local):
- ✅ **Sử dụng Cách 1** (Studio tích hợp trong Next.js)
- Truy cập: `http://localhost:3000/studio`
- Dễ sử dụng, không cần chạy thêm server

### Production:
- ✅ **Sử dụng Cách 3** (Deploy Studio lên Sanity)
- Truy cập: `https://[PROJECT_ID].sanity.studio`
- Có thể truy cập từ bất kỳ đâu
- Không cần chạy local server

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find module 'next-sanity/studio'"

**Giải pháp:**
```bash
npm install next-sanity@latest
```

### Lỗi: "Project ID not found"

**Giải pháp:**
1. Kiểm tra file `.env.local` có `NEXT_PUBLIC_SANITY_PROJECT_ID` không
2. Đảm bảo Project ID đúng
3. Restart development server

### Lỗi: "Dataset not found"

**Giải pháp:**
1. Kiểm tra file `.env.local` có `NEXT_PUBLIC_SANITY_DATASET` không
2. Đảm bảo dataset tồn tại trong Sanity project
3. Tạo dataset mới nếu cần (xem DEPLOYMENT.md)

### Studio không hiển thị schemas

**Giải pháp:**
1. Kiểm tra file `sanity.config.ts` có đúng không
2. Kiểm tra folder `schemaTypes/` có các schema files không
3. Restart development server

---

## 📝 Checklist

- [ ] Đã cài đặt dependencies (`npm install`)
- [ ] Đã tạo file `.env.local` với các biến cần thiết
- [ ] Đã có `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Đã có `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Đã có `SANITY_API_READ_TOKEN`
- [ ] Đã chạy `npm run dev`
- [ ] Đã truy cập `http://localhost:3000/studio`
- [ ] Studio hiển thị đúng schemas

---

## 🎉 Hoàn thành!

Sau khi setup xong, bạn có thể:
1. ✅ Truy cập Studio tại `http://localhost:3000/studio`
2. ✅ Tạo Categories, Authors, Posts
3. ✅ Publish content
4. ✅ Xem content trên website

**Xem thêm:**
- `HUONG-DAN-THEM-DU-LIEU-SANITY.md` - Hướng dẫn thêm dữ liệu
- `CHECKLIST-SANITY.md` - Checklist nhanh

---

**Chúc bạn thành công! 🚀**

