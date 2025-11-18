"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface backdrop-blur-sm border-b border-divider">
      <nav className="w-[85%] mx-auto flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-serif font-bold text-primary">
          Pora Door
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#products"
            className="text-primary hover:text-secondary transition-colors"
          >
            Products
          </Link>
          <Link
            href="#features"
            className="text-primary hover:text-secondary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-primary hover:text-secondary transition-colors"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-primary hover:text-secondary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link
            href="#products"
            className="px-6 py-3 bg-cta text-background rounded-full hover:bg-accent-primary transition-colors"
          >
            Explore Doors
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-primary"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-[85%] mx-auto py-4 border-t border-divider">
          <div className="flex flex-col space-y-4">
            <Link
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-primary hover:text-secondary py-2"
            >
              Products
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-primary hover:text-secondary py-2"
            >
              Features
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-primary hover:text-secondary py-2"
            >
              About
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-primary hover:text-secondary py-2"
            >
              Contact
            </Link>
            <Link
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-3 bg-cta text-background rounded-full hover:bg-accent-primary transition-colors text-center"
            >
              Explore Doors
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
