"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { Category } from "./CategoryFilters";

export type PriceSort = "" | "price-asc" | "price-desc";

interface ProductGridProps {
  products: Product[];
  selectedCategory: Category;
  priceSort?: PriceSort;
}

function getProductPrice(p: Product): number {
  return p.poraDoorPrice ?? p.priceRange?.min ?? 0;
}

export default function ProductGrid({
  products,
  selectedCategory,
  priceSort = "",
}: ProductGridProps) {
  const [isVisible, setIsVisible] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let list =
      selectedCategory === "all"
        ? [...products]
        : products.filter((p) => p.category === selectedCategory);
    if (priceSort === "price-asc") {
      list = [...list].sort((a, b) => getProductPrice(a) - getProductPrice(b));
    } else if (priceSort === "price-desc") {
      list = [...list].sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }
    return list;
  }, [products, selectedCategory, priceSort]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <svg
            className="w-24 h-24 mx-auto text-secondary/30 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3
            className="text-2xl font-semibold text-primary mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            No Products Found
          </h3>
          <p className="text-secondary">
            We couldn&apos;t find any products in this category. Try selecting a
            different category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
      {filteredAndSortedProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}
