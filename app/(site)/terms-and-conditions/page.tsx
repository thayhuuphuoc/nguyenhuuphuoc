import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions - BlogForge",
  description: "Terms and Conditions for BlogForge",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
        <h1>Terms and Conditions</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using BlogForge, you agree to be bound by these Terms and Conditions.
            If you disagree with any part of these terms, then you may not access the service.
          </p>
        </section>

        <section>
          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on BlogForge for
            personal, non-commercial transitory viewing only. This is the grant of a license, not a
            transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on BlogForge</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section>
          <h2>User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate,
            complete, and current at all times. You are responsible for safeguarding the password
            and for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2>Content</h2>
          <p>
            Our service allows you to post, link, store, share and otherwise make available certain
            information, text, graphics, or other material. You are responsible for the content that
            you post to the service.
          </p>
        </section>

        <section>
          <h2>Prohibited Uses</h2>
          <p>You may not use our service:</p>
          <ul>
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material</li>
            <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
          </ul>
        </section>

        <section>
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the service immediately,
            without prior notice or liability, under our sole discretion, for any reason whatsoever
            and without limitation.
          </p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>
            The materials on BlogForge are provided on an 'as is' basis. BlogForge makes no
            warranties, expressed or implied, and hereby disclaims and negates all other warranties
            including, without limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of intellectual property or other
            violation of rights.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at{" "}
            <a href="/contact-us">our contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
