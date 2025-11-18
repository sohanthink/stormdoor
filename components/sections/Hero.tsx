"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-background to-accent-secondary">
      <div className="w-[85%] mx-auto text-center py-20">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary mb-6 leading-tight">
          Storm Doors,
          <br />
          <span className="text-secondary">Simplified.</span>
        </h1>

        <p className="text-xl md:text-2xl text-secondary mb-8 font-light max-w-2xl mx-auto">
          Discover premium storm doors with historic styles. Elegant designs
          that combine beauty and functionality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#products"
            className="px-8 py-4 bg-cta text-background rounded-full hover:bg-accent-primary transition-colors text-lg"
          >
            Explore Doors
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 border-2 border-primary text-primary rounded-full hover:bg-cta hover:text-background transition-colors text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
