"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { products } from "@/app/shop/data/products";
import door1 from "@/public/products/door1.png";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "full-view-retractable", label: "Full-View Retractable" },
    { id: "mid-view", label: "Mid-View" },
    { id: "three-quarter-view", label: "3/4 View" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout
      title="Products"
      subtitle={`${filteredProducts.length} products in catalog`}
    >
      {/* Filters */}
      <div className="card-premium p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary"
            />
          </div>
          {/* Category Filter */}
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gold text-white"
                    : "bg-surface text-secondary hover:bg-gold-light/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card-premium overflow-hidden">
            {/* Product Image */}
            <div className="relative w-full h-48 bg-gradient-to-b from-[#e8e4dc] to-[#d4cfc5]">
              <Image
                src={product.image || door1}
                alt={product.name}
                fill
                className="object-cover"
              />
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
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3
                className="text-xl font-semibold text-primary mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h3>
              <p className="text-sm text-secondary mb-4 line-clamp-2">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gold-light/20 text-gold text-xs rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* Price and Details */}
              <div className="flex items-center justify-between pt-4 border-t border-divider">
                <span className="text-gold font-semibold text-lg">
                  {product.price}
                </span>
                <Link
                  href={`/shop/${product.id}`}
                  className="text-primary hover:text-gold text-sm font-medium transition-colors"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="card-premium p-12 text-center">
          <p className="text-secondary text-lg">No products found</p>
          <p className="text-secondary text-sm mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
