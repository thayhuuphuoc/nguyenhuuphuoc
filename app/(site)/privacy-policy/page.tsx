import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Nguyen Huu Phuoc",
  description: "Privacy Policy for Nguyen Huu Phuoc",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to this website. We respect your privacy and are committed to protecting your
            personal data. This privacy policy will inform you about how we look after your
            personal data when you visit our website and tell you about your privacy rights and how
            the law protects you.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
          <ul>
            <li>Identity Data: name, username</li>
            <li>Contact Data: email address, telephone numbers</li>
            <li>Technical Data: internet protocol (IP) address, browser type and version</li>
            <li>Usage Data: information about how you use our website</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our service</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from
            being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to
            your personal data:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="/contact-us">our contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
