import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Product Not Found
        </h2>
        <p className="text-secondary mb-8">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-gold text-white rounded-full font-medium hover:bg-green transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}

