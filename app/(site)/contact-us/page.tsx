"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import type { Metadata } from "next"

export default function ContactUsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Gửi tin nhắn thành công!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast.error(data.error || "Gửi tin nhắn thất bại")
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-muted-foreground text-lg">
            Nếu bạn có câu hỏi hoặc muốn liên hệ với chúng tôi? Chúng tôi rất vui được lắng nghe bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg p-8 border">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Tên
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Tên của bạn"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
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

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              Chủ đề
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              autoComplete="off"
              required
              placeholder="Đây là về vấn đề gì?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Tin nhắn
            </label>
            <Textarea
              id="message"
              name="message"
              autoComplete="off"
              required
              placeholder="Tin nhắn của bạn..."
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Đang gửi..." : "Gửi tin nhắn"}
          </Button>
        </form>
      </div>
    </div>
  )
}
