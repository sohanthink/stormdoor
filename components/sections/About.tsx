"use client";

import aboutbanner from "@/public/home/about.png";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="w-[85%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              About Pora Door
            </h2>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              At Pora Door, we believe that your entryway should make a
              statement. Our storm doors combine historic elegance with modern
              functionality, creating the perfect first impression for your
              home.
            </p>
            <p className="text-lg text-secondary mb-4 leading-relaxed">
              With years of expertise in crafting premium doors, we've perfected
              the art of blending timeless design with durable materials. Each
              door is carefully designed to enhance your home's architecture
              while providing superior protection.
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              Our commitment to quality and customer satisfaction has made us a
              trusted name in premium storm doors. We're here to help you find
              the perfect door that reflects your style and meets your needs.
            </p>
          </div>
          <div className="bg-surface rounded-2xl p-8 shadow-lg">
            <div className="relative aspect-square rounded-xl flex items-center justify-center overflow-hidden">
              <Image
                src={aboutbanner}
                alt="About Pora Door"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
