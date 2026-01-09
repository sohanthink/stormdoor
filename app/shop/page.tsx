"use client";

import { useState } from "react";
import ShopHero from "./components/ShopHero";
import CategoryFilters, {
  Category,
  categories,
} from "./components/CategoryFilters";
import ProductGrid from "./components/ProductGrid";
import { products } from "./data/products";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <ShopHero />
      <CategoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="container-custom pb-20">
        <div className="mb-8 flex items-center justify-between">
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
                ? `Showing ${products.length} premium storm doors`
                : `${
                    products.filter((p) => p.category === selectedCategory)
                      .length
                  } products available`}
            </p>
          </div>
        </div>
        <ProductGrid products={products} selectedCategory={selectedCategory} />
      </div>
    </main>
  );
}
