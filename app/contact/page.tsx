"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <section className="section-padding">
        <div className="container-custom max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              Get in Touch
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Contact Us
            </h1>
            <div className="line-gold mx-auto mb-6 w-24" />
            <p className="text-secondary text-lg">
              Have a question about storm doors or ready for a free quote? Send
              us a message and we&apos;ll get back to you soon.
            </p>
          </div>

          {/* Simple form */}
          <form
            className="bg-white rounded-2xl shadow-sm border border-gold/10 p-6 md:p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gold/20 bg-[#faf8f5] text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gold/20 bg-[#faf8f5] text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-primary mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-gold/20 bg-[#faf8f5] text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40 resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-4 text-lg rounded-full"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact info */}
          <div className="mt-12 text-center">
            <p className="text-muted text-sm mb-4">Or reach us directly</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:hello@poradoor.com"
                className="text-gold font-medium hover:underline"
              >
                hello@poradoor.com
              </Link>
              <Link
                href="tel:+18001234567"
                className="text-gold font-medium hover:underline"
              >
                1-800-123-4567
              </Link>
            </div>
          </div>

          <p className="text-center mt-8">
            <Link href="/" className="text-secondary hover:text-gold text-sm">
              ← Back to home
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
