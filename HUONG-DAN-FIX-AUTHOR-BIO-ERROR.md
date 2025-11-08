# Hướng Dẫn Khắc Phục Lỗi: Objects are not valid as a React child

## ❌ Lỗi: Objects are not valid as a React child

Lỗi này xảy ra khi cố gắng render một **object** (PortableText block content) trực tiếp như một React child.

---

## 🔍 Nguyên Nhân

Trong schema Sanity, field `bio` của Author được định nghĩa là **PortableText** (array of blocks):

```typescript
defineField({
  name: "bio",
  title: "Bio",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
    },
  ],
}),
```

Nhưng trong code, `author.bio` đang được render trực tiếp như một string:
```tsx
{author.bio && <p>{author.bio}</p>}  // ❌ Lỗi!
```

**Vấn đề:** `author.bio` là một array của objects, không phải string, nên không thể render trực tiếp.

---

## ✅ Giải Pháp

### Đã Sửa Trong Code

Đã cập nhật 2 files:

1. **`app/(site)/author/page.tsx`**:
   - Thêm helper function `extractTextFromPortableText()` để convert PortableText thành string
   - Sử dụng function này để render bio

2. **`app/(site)/author/[slug]/page.tsx`**:
   - Thêm helper function `extractTextFromPortableText()` 
   - Sử dụng `PortableText` component để render full bio với formatting
   - Sử dụng helper function cho metadata description

### Helper Function

```typescript
function extractTextFromPortableText(content: any): string {
  if (typeof content === "string") return content
  if (!Array.isArray(content)) return ""
  return content
    .map((block: any) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child: any) => child.text || "").join("")
      }
      return ""
    })
    .join(" ")
    .trim()
}
```

### Cách Sử Dụng

**Cho preview/truncated text:**
```tsx
{author.bio && (
  <p className="line-clamp-2">
    {extractTextFromPortableText(author.bio)}
  </p>
)}
```

**Cho full content với formatting:**
```tsx
{author.bio && (
  <div>
    {Array.isArray(author.bio) ? (
      <PortableText value={author.bio} components={portableTextComponents} />
    ) : (
      <p>{author.bio}</p>
    )}
  </div>
)}
```

---

## ✅ Sau Khi Sửa

1. **Build sẽ thành công:**
   ```bash
   npm run build
   ```

2. **Website sẽ hiển thị đúng:**
   - Author bio được render đúng (string hoặc PortableText)
   - Không còn lỗi "Objects are not valid as a React child"

---

## 🔧 Troubleshooting

### Lỗi vẫn còn?

**Giải pháp:**
1. ✅ Đảm bảo đã import `PortableText` và `portableTextComponents`
2. ✅ Đảm bảo đã sử dụng helper function hoặc `PortableText` component
3. ✅ Kiểm tra xem `author.bio` có phải là array không
4. ✅ Restart development server

### Lỗi: "Cannot find module '@portabletext/react'"

**Giải pháp:**
```bash
npm install @portabletext/react
```

---

## 📝 Checklist

- [ ] Đã sửa `app/(site)/author/page.tsx`
- [ ] Đã sửa `app/(site)/author/[slug]/page.tsx`
- [ ] Đã thêm helper function `extractTextFromPortableText()`
- [ ] Đã import `PortableText` và `portableTextComponents`
- [ ] Đã chạy `npm run build` thành công
- [ ] Website hiển thị author bio đúng

---

**Chúc bạn thành công! 🎉**

