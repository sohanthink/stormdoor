"use client";

export default function Features() {
  const features = [
    {
      icon: "🏛️",
      title: "Historic Styles",
      description:
        "Authentic designs inspired by classic architecture, bringing timeless elegance to your home.",
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description:
        "Crafted with the finest materials and attention to detail for lasting durability.",
    },
    {
      icon: "🔧",
      title: "Easy Installation",
      description:
        "Simplified installation process with expert guidance and support every step of the way.",
    },
    {
      icon: "🌦️",
      title: "Weather Protection",
      description:
        "Superior protection against the elements while maintaining beautiful aesthetics.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="w-[85%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Why Choose Pora Door
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Experience the perfect blend of style, quality, and functionality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-serif font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

