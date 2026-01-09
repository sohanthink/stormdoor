"use client";

import Image from "next/image";
import Link from "next/link";
import door1 from "@/public/products/door1.png";

export interface Product {
  id: string;
  name: string;
  brand: "Larson" | "Andersen";
  category: string;
  description: string;
  price: string;
  priceRange?: { min: number; max: number };
  tag?: string;
  image?: string;
  features?: string[];
  // Extended fields for PDP
  type?: string; // Mid-View, Full-View, 3/4-View, etc.
  venting?: string; // Self-storing, Retractable, Interchangeable
  closer?: string; // Standard exposed, Hidden Click & Hold™, Hidden SmoothControl+™
  handleIncluded?: boolean;
  handleRequired?: boolean; // If true, handle must be selected
  colors?: string[];
  swingType?: "universal" | "lrh"; // universal or must choose left/right
  retailPrice?: number;
  poraDoorPrice?: number;
  keyFeatures?: string[];
  images?: string[]; // Multiple product images
}

interface ProductCardProps {
  product: Product;
  index?: number;
  isVisible?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  isVisible = true,
}: ProductCardProps) {
  return (
    <div
      className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#e8e4dc] to-[#d4cfc5]">
        <Image
          src={product.image || door1}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Brand badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1.5 backdrop-blur-sm text-xs font-bold tracking-wide rounded-full ${
              product.brand === "Larson"
                ? "bg-blue-600/90 text-white"
                : "bg-red-600/90 text-white"
            }`}
          >
            {product.brand}
          </span>
        </div>

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold tracking-wide rounded-full">
              {product.tag}
            </span>
          </div>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
          <Link
            href={`/shop/${product.id}`}
            className="px-6 py-3 bg-white text-primary font-medium rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3
              className="text-xl md:text-2xl font-semibold text-primary mb-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {product.name}
            </h3>
            <p className="text-xs text-secondary uppercase tracking-wide">
              {product.brand}
            </p>
          </div>
        </div>

        <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Features preview */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gold-light/20 text-gold text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-divider">
          <span className="text-gold font-semibold text-lg">
            {product.price}
          </span>
          <Link
            href={`/shop/${product.id}`}
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
  );
}

