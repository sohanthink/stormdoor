"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-linear-to-br from-accent-primary to-cta">
      <div className="w-[85%] mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-text-on-dark">
          Ready to Transform Your Entryway?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-text-on-dark opacity-90 max-w-3xl mx-auto">
          Get started today and discover the perfect storm door for your home.
          Expert consultation and free quotes available.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="px-8 py-4 bg-bg-primary text-primary rounded-full hover:bg-bg-surface transition-colors text-lg"
          >
            Get Free Quote
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 border-2 border-bg-primary text-text-on-dark rounded-full hover:bg-bg-primary hover:text-primary transition-colors text-lg"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
