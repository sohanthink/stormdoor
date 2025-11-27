"use client";

import Link from "next/link";
import Image from "next/image";
import classicVictorian from "@/public/home/image1.png";
import { useEffect, useRef, useState } from "react";

const products = [
  {
    name: "Classic Victorian",
    description: "Ornate scrollwork and elegant glass panels that capture the grandeur of Victorian architecture.",
    price: "From $899",
    tag: "Best Seller",
  },
  {
    name: "Modern Minimalist",
    description: "Clean lines and expansive glass for contemporary homes that value simplicity and light.",
    price: "From $799",
    tag: "New",
  },
  {
    name: "Craftsman Heritage",
    description: "Authentic Arts & Crafts details with warm wood tones and geometric patterns.",
    price: "From $949",
    tag: "Premium",
  },
];

export default function Products() {
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
      id="products"
      className="section-padding bg-[#f5f3ef] relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #b8956c 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className={`inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Our Collection
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Featured Doors
          </h2>
          <div
            className={`line-gold mx-auto mb-6 ${
              isVisible ? "animate-scale-in delay-200" : "opacity-0"
            }`}
          />
          <p
            className={`text-lg md:text-xl text-secondary max-w-2xl mx-auto ${
              isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            Explore our curated selection of premium storm doors, each designed
            to complement your home&apos;s unique character.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-[#e8e4dc] to-[#d4cfc5]">
                <Image
                  src={classicVictorian}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold tracking-wide rounded-full">
                    {product.tag}
                  </span>
                </div>

                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <button className="px-6 py-3 bg-white text-primary font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-xl md:text-2xl font-semibold text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {product.name}
                  </h3>
                </div>
                
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-divider">
                  <span className="text-gold font-semibold text-lg">
                    {product.price}
                  </span>
                  <Link
                    href="#products"
                    className="flex items-center gap-2 text-primary hover:text-gold transition-colors text-sm font-medium"
                  >
                    Details
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div
          className={`text-center ${
            isVisible ? "animate-fade-in-up delay-600" : "opacity-0"
          }`}
        >
          <Link href="#products" className="btn-primary text-lg px-10 py-4">
            View All Doors
          </Link>
        </div>
      </div>
    </section>
  );
}
