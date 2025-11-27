"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1814 0%, #2a2620 50%, #3d3529 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gold tracking-wide">
              Free Consultation Available
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
            style={{ fontFamily: "var(--font-serif)", color: "#faf8f5" }}
          >
            Ready to Transform
            <br />
            <span className="text-gold">Your Entryway?</span>
          </h2>

          {/* Decorative line */}
          <div
            className={`line-gold mx-auto mb-8 ${
              isVisible ? "animate-scale-in delay-200" : "opacity-0"
            }`}
          />

          {/* Description */}
          <p
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${
              isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
            }`}
            style={{ color: "rgba(250, 248, 245, 0.8)" }}
          >
            Schedule a free consultation with our design experts. We&apos;ll help you
            find the perfect door that complements your home&apos;s architecture and
            reflects your personal style.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${
              isVisible ? "animate-fade-in-up delay-400" : "opacity-0"
            }`}
          >
            <Link
              href="#contact"
              className="px-10 py-4 bg-gold text-white rounded-full font-medium text-lg hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
            >
              Get Free Quote
            </Link>
            <Link
              href="tel:+18001234567"
              className="px-10 py-4 border-2 border-gold/40 text-gold rounded-full font-medium text-lg hover:bg-gold/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us Now
            </Link>
          </div>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap justify-center items-center gap-8 ${
              isVisible ? "animate-fade-in-up delay-500" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2" style={{ color: "rgba(250, 248, 245, 0.6)" }}>
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: "rgba(250, 248, 245, 0.6)" }}>
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Same-Week Installation</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: "rgba(250, 248, 245, 0.6)" }}>
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span className="text-sm">Flexible Financing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
