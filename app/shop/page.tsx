"use client";

import { useState } from "react";
import ShopHero from "./components/ShopHero";
import CategoryFilters, {
  Category,
  categories,
} from "./components/CategoryFilters";
import ProductGrid, { PriceSort } from "./components/ProductGrid";
import { products } from "./data/products";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [priceSort, setPriceSort] = useState<PriceSort>("");

  const filteredCount =
    selectedCategory === "all"
      ? products.length
      : products.filter((p) => p.category === selectedCategory).length;

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <ShopHero />
      <CategoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="container-custom pb-20">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {selectedCategory === "all"
                ? "All Products"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-secondary">
              {selectedCategory === "all"
                ? `Showing ${filteredCount} premium storm doors`
                : `${filteredCount} products available`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary whitespace-nowrap">Sort by:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as PriceSort)}
              className="px-4 py-2 rounded-full border border-divider bg-white text-primary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/40"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          priceSort={priceSort}
        />
      </div>
    </main>
  );
}
