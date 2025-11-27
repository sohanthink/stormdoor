"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10 text-center py-32 md:py-40">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gold/20 mb-8 ${
            mounted ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          <span className="text-sm font-medium text-secondary tracking-wide">
            Premium Craftsmanship Since 1985
          </span>
        </div>

        {/* Main heading */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 leading-[1.1] tracking-tight ${
            mounted ? "animate-fade-in-up delay-100" : "opacity-0"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Storm Doors,
          <br />
          <span className="text-shimmer text-shimmer-animate">
            Reimagined.
          </span>
        </h1>

        {/* Decorative line */}
        <div
          className={`line-gold mx-auto mb-8 ${
            mounted ? "animate-scale-in delay-200" : "opacity-0"
          }`}
        />

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl lg:text-2xl text-secondary mb-12 font-light max-w-2xl mx-auto leading-relaxed ${
            mounted ? "animate-fade-in-up delay-300" : "opacity-0"
          }`}
        >
          Where historic elegance meets modern protection. Handcrafted doors 
          that transform your entryway into a statement of refined taste.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
            mounted ? "animate-fade-in-up delay-400" : "opacity-0"
          }`}
        >
          <Link href="#products" className="btn-primary text-lg px-10 py-4">
            View Collection
          </Link>
          <Link href="#features" className="btn-outline text-lg px-10 py-4">
            Discover More
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto ${
            mounted ? "animate-fade-in-up delay-500" : "opacity-0"
          }`}
        >
          {[
            { value: "40+", label: "Years Experience" },
            { value: "15K", label: "Doors Installed" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-gold mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${
          mounted ? "animate-fade-in delay-700" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
