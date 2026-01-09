"use client";

import { useEffect, useRef, useState } from "react";

export default function ShopHero() {
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
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f5f3ef] to-[#faf8f5]"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #b8956c 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <span
            className={`inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-6 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Premium Collection
          </span>
          <h1
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Shop Doors
          </h1>
          <div
            className={`line-gold mx-auto mb-8 ${
              isVisible ? "animate-scale-in delay-200" : "opacity-0"
            }`}
          />
          <p
            className={`text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed ${
              isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
            }`}
          >
            Discover our curated selection of premium storm doors from Larson
            and Andersen, the most trusted manufacturers in America. Each door
            combines timeless elegance with modern functionality.
          </p>
        </div>
      </div>
    </section>
  );
}

