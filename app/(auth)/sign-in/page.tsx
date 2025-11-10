"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("🔐 Sign in attempt:", {
      email: formData.email,
      passwordLength: formData.password.length,
    })

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      console.log("🔐 Sign in result:", {
        ok: result?.ok,
        error: result?.error,
        status: result?.status,
        url: result?.url,
      })

      // Check for errors - NextAuth can return error in different ways
      if (result?.error) {
        console.error("❌ Sign in error:", result.error)
        // NextAuth error codes: "CredentialsSignin" for invalid credentials
        if (result.error === "CredentialsSignin") {
          toast.error("Email hoặc mật khẩu không đúng")
        } else {
          toast.error(result.error || "Đăng nhập thất bại. Vui lòng thử lại.")
        }
      } else if (result?.ok === false) {
        // Sometimes NextAuth returns ok: false without error
        console.error("❌ Sign in failed: ok is false")
        toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.")
      } else if (!result) {
        // Result is null or undefined
        console.error("❌ Sign in failed: No result returned")
        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.")
      } else if (result.ok) {
        // Success
        console.log("✅ Sign in successful")
        toast.success("Đăng nhập thành công!")
        router.push("/")
        router.refresh()
      } else {
        // Unexpected result
        console.error("❌ Sign in failed: Unexpected result", result)
        toast.error("Đăng nhập thất bại. Vui lòng thử lại.")
      }
    } catch (error: any) {
      console.error("❌ Sign in exception:", error)
      toast.error(error?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Chào mừng trở lại</h1>
        <p className="text-muted-foreground">Đăng nhập vào tài khoản của bạn để tiếp tục</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
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
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Chưa có tài khoản?{" "}
        <Link href="/sign-up" className="text-primary hover:underline font-semibold">
          Đăng ký
        </Link>
      </p>
    </div>
  )
}

