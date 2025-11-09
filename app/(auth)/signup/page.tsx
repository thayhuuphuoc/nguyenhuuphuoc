"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("📝 Form submitted", {
      name: formData.name,
      email: formData.email,
      passwordLength: formData.password.length,
    })
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      console.log("❌ Validation failed: Missing fields")
      toast.error("Vui lòng điền đầy đủ thông tin")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      console.log("❌ Validation failed: Passwords don't match")
      toast.error("Mật khẩu không khớp")
      return
    }

    if (formData.password.length < 6) {
      console.log("❌ Validation failed: Password too short")
      toast.error("Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    setIsLoading(true)
    
    try {
      console.log("🔄 Sending registration request to /api/auth/register")
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      console.log("📥 Registration response status:", response.status)
      const data = await response.json()
      console.log("📥 Registration response data:", data)

      if (response.ok) {
        console.log("✅ Registration successful!")
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.")
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        // Redirect to sign in page
        router.push("/sign-in")
      } else {
        console.error("❌ Registration failed:", data.error)
        toast.error(data.error || "Đăng ký thất bại. Vui lòng thử lại.")
      }
    } catch (error) {
      console.error("❌ Registration error:", error)
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Tạo tài khoản</h1>
        <p className="text-muted-foreground">Tham gia cộng đồng của chúng tôi</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Họ và tên
          </label>
          <Input
            id="name"
            type="text"
            required
            placeholder="Nguyễn Văn A"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Mật khẩu
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 w-4 h-4 rounded border-border bg-background"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            Tôi đồng ý với{" "}
            <Link href="/terms-and-conditions" className="text-primary hover:underline">
              Điều khoản & Điều kiện
            </Link>
          </label>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Đang tạo tài khoản..." : "Đăng ký"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link href="/sign-in" className="text-primary hover:underline font-semibold">
          Đăng nhập
        </Link>
      </p>
    </div>
  )
}
