"use client";

import Link from "next/link";

function PlaceholderImage({
  label,
  aspectRatio = "aspect-video",
}: {
  label: string;
  aspectRatio?: string;
}) {
  return (
    <div
      className={`${aspectRatio} w-full rounded-2xl bg-linear-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center`}
    >
      <span className="text-center text-secondary text-sm px-4 font-medium">
        [PLACEHOLDER: {label}]
      </span>
    </div>
  );
}

const viewTypes = [
  {
    title: "Full View",
    description:
      "Full glass panel for maximum light and visibility. Ideal for homeowners who want an unobstructed view and abundant natural light.",
    imageLabel: "Diagram of full-view storm door showing full glass panel",
  },
  {
    title: "Mid View (3/4 View)",
    description:
      "Glass on top with solid bottom panel. Offers a balance of light and privacy, with a lower maintenance solid section.",
    imageLabel: "Diagram of mid-view door: top glass, bottom solid panel",
  },
  {
    title: "Interchangeable Panel Doors",
    description:
      "Swap between glass and screen depending on season. Change panels to suit the weather—glass in winter, screen in summer.",
    imageLabel: "Diagram showing interchangeable glass vs screen panels",
  },
  {
    title: "Full View with Retractable Screen (Split View)",
    description:
      "Full glass with hidden screen that pulls down from the top for ventilation without changing panels. Best of both worlds.",
    imageLabel: "Diagram of split-view door with retractable screen mechanism",
  },
];

const closers = [
  {
    title: "Hidden Closer",
    description:
      "Premium feature integrated into the door frame. Clean look with no visible arm, and holds the door open when pushed fully open.",
    imageLabel: "Diagram of door with hidden closer integrated in frame",
  },
  {
    title: "Exposed Closer",
    description:
      "Visible arm on the inside. Functions well and typically includes toe-touch hold-open feature for hands-free convenience.",
    imageLabel: "Diagram of door with exposed closer arm",
  },
];

const additionalPoints = [
  {
    title: "Frame Material",
    items: ["Aluminum vs reinforced composite"],
    imageLabel: "Side-by-side comparison of aluminum vs composite frame",
  },
  {
    title: "Glass Type",
    items: ["Tempered safety glass vs low-E energy-efficient glass"],
    imageLabel: "Comparison of tempered vs low-E glass options",
  },
  {
    title: "Ventilation Options",
    items: ["Fixed screen vs retractable screen systems"],
    imageLabel: "Diagram of fixed vs retractable screen systems",
  },
  {
    title: "Hinge Side / Swing Direction",
    items: ["Left-hand vs right-hand opening"],
    imageLabel: "Diagram showing left-hand vs right-hand swing directions",
  },
  {
    title: "Color & Finish Options",
    items: ["Standard colors vs custom finishes"],
    imageLabel: "Color swatches or finished door samples",
  },
  {
    title: "Pet Door Options",
    items: ["Built-in pet access doors for convenience"],
    imageLabel: "Storm door with integrated pet door",
  },
  {
    title: "Security Features",
    items: ["Reinforced corners", "Multi-point locking systems"],
    imageLabel: "Diagram highlighting reinforced corners and locking points",
  },
  {
    title: "Weatherstripping & Seals",
    items: ["Draft protection", "Energy performance"],
    imageLabel: "Detail of weatherstripping and seal placement",
  },
];

export default function BasicsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              Buyer&apos;s Guide
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Basics of a Storm Door
            </h1>
            <div className="line-gold w-24 mb-6" />
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8">
              Understanding the key components and options helps you choose the
              right storm door for your home. PoraDoor is your trusted guide to
              make that decision with confidence.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 btn-primary text-sm"
            >
              Browse Doors
              <svg
                className="w-4 h-4"
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
      </section>

      {/* Door View Types */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              1. Door View Types
            </h2>
            <p className="text-secondary max-w-2xl">
              The view type determines how much glass or screen you have and how
              you use the door throughout the year.
            </p>
          </div>
          <div className="space-y-16">
            {viewTypes.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
              >
                <div>
                  <PlaceholderImage label={item.imageLabel} />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold text-primary mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closers */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              2. Closers (How the Door Opens & Stays Open)
            </h2>
            <p className="text-secondary max-w-2xl">
              The closer controls how the door opens, closes, and stays open.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {closers.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gold/10"
              >
                <div className="mb-6">
                  <PlaceholderImage
                    label={item.imageLabel}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
                <h3
                  className="text-xl font-semibold text-primary mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handles & Hardware */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              3. Handles & Hardware
            </h2>
            <p className="text-secondary max-w-2xl">
              Handle inclusion varies by door tier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-gold/20 bg-gold/5">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Value Doors
              </h3>
              <p className="text-secondary">Handle typically included.</p>
            </div>
            <div className="p-6 rounded-2xl border border-gold/20 bg-gold/5">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Premium Doors
              </h3>
              <p className="text-secondary">
                Handle purchased separately with multiple style and finish
                options.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <PlaceholderImage
              label="Assortment of handle styles and finishes"
              aspectRatio="aspect-[21/9]"
            />
          </div>
        </div>
      </section>

      {/* Standard Sizing */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              4. Standard Sizing
            </h2>
            <p className="text-secondary max-w-2xl mb-6">
              90% of homes use{" "}
              <span className="font-semibold text-primary">
                36&Prime; wide × 80&Prime; tall
              </span>{" "}
              storm doors. Additional sizes and custom sizing options are
              available for unique openings.
            </p>
            <PlaceholderImage
              label="Size comparison diagram: 36x80 vs other common sizes"
              aspectRatio="aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Additional Educational Points */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              5. What Else to Consider
            </h2>
            <p className="text-secondary max-w-2xl">
              These factors affect durability, efficiency, and suitability for
              your home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalPoints.map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-divider hover:border-gold/30 transition-colors"
              >
                <h3 className="font-semibold text-primary mb-3">
                  {item.title}
                </h3>
                <ul className="space-y-1 text-secondary text-sm">
                  {item.items.map((bullet, j) => (
                    <li key={j}>• {bullet}</li>
                  ))}
                </ul>
                <div className="mt-4">
                  <PlaceholderImage
                    label={item.imageLabel}
                    aspectRatio="aspect-square"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2
            className="text-2xl md:text-3xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Ready to Find Your Door?
          </h2>
          <p className="text-secondary mb-6 max-w-xl mx-auto">
            Use what you&apos;ve learned to explore our curated selection of
            premium storm doors.
          </p>
          <Link href="/shop" className="btn-primary">
            Shop Storm Doors
          </Link>
        </div>
      </section>
    </main>
  );
}
