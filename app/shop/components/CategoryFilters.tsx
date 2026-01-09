"use client";

import { useState } from "react";

export type Category =
  | "all"
  | "full-view"
  | "full-view-retractable"
  | "full-view-interchangeable"
  | "three-quarter-view"
  | "mid-view"
  | "premium-hidden-closer";

export const categories = [
  {
    id: "all" as Category,
    name: "All Doors",
    description: "View all products",
  },
  {
    id: "full-view" as Category,
    name: "Full-View Storm Doors",
    description: "Glass from top to bottom",
  },
  {
    id: "full-view-retractable" as Category,
    name: "Full-View with Retractable Screens",
    description: "One-hand retractable screen built into the frame",
  },
  {
    id: "full-view-interchangeable" as Category,
    name: "Full-View with Interchangeable Screens",
    description: "Seasonal glass/screen swap",
  },
  {
    id: "three-quarter-view" as Category,
    name: "3/4-View Storm Doors",
    description: "Top ¾ glass/screen, bottom panel solid",
  },
  {
    id: "mid-view" as Category,
    name: "Mid-View Storm Doors",
    description: "Mid-level glass area",
  },
  {
    id: "premium-hidden-closer" as Category,
    name: "Premium Hidden-Closer Doors",
    description: "High-end doors with closers built into the frame",
  },
];

interface CategoryFiltersProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryFilters({
  selectedCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sticky top-24 z-40 bg-[#faf8f5] border-b border-divider py-6 mb-8">
      <div className="container-custom">
        {/* Mobile: Collapsible */}
        <div className="md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-divider"
          >
            <span className="text-primary font-semibold">
              {categories.find((c) => c.id === selectedCategory)?.name ||
                "All Doors"}
            </span>
            <svg
              className={`w-5 h-5 text-gold transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isExpanded && (
            <div className="mt-4 space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsExpanded(false);
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? "bg-gold text-white shadow-md"
                      : "bg-white text-primary hover:bg-gold-light/10 border border-divider"
                  }`}
                >
                  <div className="font-semibold">{category.name}</div>
                  <div
                    className={`text-xs mt-1 ${
                      selectedCategory === category.id
                        ? "text-white/90"
                        : "text-secondary"
                    }`}
                  >
                    {category.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: Horizontal Scroll */}
        <div className="hidden md:flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group flex-shrink-0 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-gold text-white shadow-lg scale-105"
                  : "bg-white text-primary hover:bg-gold-light/20 border border-divider hover:border-gold"
              }`}
            >
              <span className="font-semibold text-sm">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

