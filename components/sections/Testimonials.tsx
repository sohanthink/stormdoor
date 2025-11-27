"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Portland, OR",
    text: "The Classic Victorian door completely transformed our 1920s Craftsman home. The attention to detail is extraordinary—every scroll and glass panel is perfect. Our neighbors can't stop complimenting it.",
    rating: 5,
    image: "SJ",
  },
  {
    name: "Michael Chen",
    location: "Seattle, WA",
    text: "We chose the Modern Minimalist for our contemporary home and couldn't be happier. The installation team was professional, and the door exceeded our expectations in both quality and aesthetics.",
    rating: 5,
    image: "MC",
  },
  {
    name: "Emily Rodriguez",
    location: "San Francisco, CA",
    text: "After searching for months, we found Pora Door. The Craftsman Heritage model added so much character to our home. Worth every penny—this is true craftsmanship.",
    rating: 5,
    image: "ER",
  },
];

export default function Testimonials() {
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
      className="section-padding bg-[#f5f3ef] relative overflow-hidden"
    >
      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 text-gold/10 text-[200px] font-serif leading-none select-none">
        &ldquo;
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className={`inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            Testimonials
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Loved by Homeowners
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
            Don&apos;t just take our word for it—hear from families who&apos;ve
            transformed their homes with Pora Door.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-gold/20">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-secondary leading-relaxed mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-divider">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold">
                  {testimonial.image}
                </div>
                <div>
                  <p
                    className="font-semibold text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div
          className={`mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 ${
            isVisible ? "animate-fade-in-up delay-600" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-1" style={{ fontFamily: "var(--font-serif)" }}>
              4.9/5
            </div>
            <div className="text-sm text-muted">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-divider hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-1" style={{ fontFamily: "var(--font-serif)" }}>
              2,500+
            </div>
            <div className="text-sm text-muted">5-Star Reviews</div>
          </div>
          <div className="w-px h-12 bg-divider hidden md:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-1" style={{ fontFamily: "var(--font-serif)" }}>
              98%
            </div>
            <div className="text-sm text-muted">Would Recommend</div>
          </div>
        </div>
      </div>
    </section>
  );
}
