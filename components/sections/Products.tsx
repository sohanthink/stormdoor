"use client";

import Link from "next/link";
import Image from "next/image";
import classicVictorian from "@/public/home/image1.png";

export default function Products() {
  const products = [
    {
      name: "Classic Victorian",
      description: "Elegant Victorian-style storm door with intricate details",
      price: "Starting at $899",
    },
    {
      name: "Modern Minimalist",
      description: "Sleek contemporary design with clean lines",
      price: "Starting at $799",
    },
    {
      name: "Craftsman Heritage",
      description: "Traditional craftsman style with authentic charm",
      price: "Starting at $949",
    },
  ];

  return (
    <section id="products" className="py-20 md:py-32 bg-surface">
      <div className="w-[85%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Explore our collection of premium storm doors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="aspect-[3/4] bg-accent-secondary flex items-center justify-center relative overflow-hidden">
                <Image
                  src={classicVictorian}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-serif font-semibold text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-secondary mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-primary mb-4">
                  {product.price}
                </p>
                <Link
                  href="#products"
                  className="block w-full px-4 py-2 border-2 border-primary text-primary rounded-full hover:bg-cta hover:text-background transition-colors text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#products"
            className="inline-block px-8 py-4 bg-cta text-background rounded-full hover:bg-accent-primary transition-colors text-lg"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
