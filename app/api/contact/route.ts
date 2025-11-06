import { type NextRequest, NextResponse } from "next/server"

// TODO: Configure email service (e.g., SendGrid, Resend, Nodemailer)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // TODO: Send email using your email service
    // Example with Resend (uncomment when configured):
    // const { data, error } = await resend.emails.send({
    //   from: 'noreply@blogforge.com',
    //   to: 'hello@blogforge.com',
    //   subject: `New Contact Form: ${subject}`,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // })

    // For now, just log the message
    console.log("[Contact Form] New message:", { name, email, subject, message })

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[Contact Form Error]", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
