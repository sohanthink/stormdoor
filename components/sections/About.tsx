"use client";

import aboutbanner from "@/public/home/about.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "1985", label: "Founded" },
  { value: "40+", label: "Master Craftsmen" },
  { value: "50K+", label: "Homes Transformed" },
];

export default function About() {
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
      id="about"
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gold/5 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div
            className={`relative ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src={aboutbanner}
                alt="About Pora Door - Master Craftsmanship"
                fill
                className="object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-gold text-white p-6 md:p-8 rounded-2xl shadow-xl">
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                40+
              </div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>

            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-3xl" />
          </div>

          {/* Content side */}
          <div>
            <span
              className={`inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              Our Story
            </span>

            <h2
              className={`text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight ${
                isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
              }`}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A Legacy of
              <br />
              <span className="text-gold">Craftsmanship</span>
            </h2>

            <div
              className={`line-gold mb-8 ${
                isVisible ? "animate-scale-in delay-200" : "opacity-0"
              }`}
            />

            <div
              className={`space-y-4 mb-8 ${
                isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
              }`}
            >
              <p className="text-lg text-secondary leading-relaxed">
                At Pora Door, we believe your entryway should make a statement.
                For over four decades, we&apos;ve combined historic elegance with
                modern engineering to create storm doors that are as beautiful
                as they are functional.
              </p>
              <p className="text-secondary leading-relaxed">
                Our master craftsmen bring generations of expertise to every
                door, using time-honored techniques alongside cutting-edge
                materials. The result? Doors that protect your home while
                elevating its character.
              </p>
              <p className="text-secondary leading-relaxed">
                From Victorian mansions to modern farmhouses, we&apos;ve helped
                transform over 50,000 homes across America. Each installation
                reflects our unwavering commitment to quality and customer
                satisfaction.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-6 pt-8 border-t border-divider ${
                isVisible ? "animate-fade-in-up delay-400" : "opacity-0"
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <div
                    className="text-2xl md:text-3xl font-bold text-gold mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
