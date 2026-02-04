"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "./ProductCard";
import { getHandleOptionsForProduct, HandleOption } from "../data/handles";
import {
  calculatePriceBreakdown,
  isWithinServiceRadius,
  INSTALLATION_PRICE,
} from "../utils/pricing";
import { getColorInfo } from "../utils/colors";
import { useCart } from "@/contexts/CartContext";
import door1 from "@/public/products/door1.png";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || ""
  );
  const [selectedHandle, setSelectedHandle] = useState<string>("");
  const [selectedSwing, setSelectedSwing] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [installationSelected, setInstallationSelected] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [canAddToCart, setCanAddToCart] = useState(false);
  const [showMeasurementGuide, setShowMeasurementGuide] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Get handle options if handle is required
  const handleOptions = product.handleRequired
    ? getHandleOptionsForProduct(product.id)
    : [];
  const selectedHandleData = handleOptions.find((h) => h.id === selectedHandle);

  // Calculate pricing
  const doorPrice = product.poraDoorPrice || 0;
  const handlePrice = selectedHandleData?.price || 0;
  const priceBreakdown = calculatePriceBreakdown(
    doorPrice,
    handlePrice,
    installationSelected,
    zipCode || null
  );

  // Validate if can add to cart
  useEffect(() => {
    let valid = true;

    // Check swing selection if required
    if (product.swingType === "lrh" && !selectedSwing) {
      valid = false;
    }

    // Check handle selection if required
    if (product.handleRequired && !selectedHandle) {
      valid = false;
    }

    setCanAddToCart(valid);
  }, [
    product.swingType,
    product.handleRequired,
    selectedSwing,
    selectedHandle,
  ]);

  const handleAddToCart = () => {
    if (!canAddToCart) return;

    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: doorPrice + handlePrice,
      image: product.image,
      color: selectedColor,
      swingType: selectedSwing || undefined,
      handleId: selectedHandle || undefined,
      handleName: selectedHandleData?.name,
      handlePrice: handlePrice || undefined,
      handleIncluded: product.handleIncluded,
      installation: installationSelected,
      zipCode: zipCode || undefined,
    });

    setAddedToCart(true);
    setTimeout(() => {
      router.push("/cart");
    }, 500);
  };

  // Product images (placeholder - you'd replace with actual images)
  const productImages = [door1, door1, door1]; // Replace with actual product images

  return (
    <div className="min-h-screen bg-[#faf8f5] mt-18">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-divider">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gold transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-linear-to-b from-[#e8e4dc] to-[#d4cfc5] rounded-3xl overflow-hidden group">
              <Image
                src={productImages[activeImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-2 backdrop-blur-sm text-sm font-bold tracking-wide rounded-full ${
                    product.brand === "Larson"
                      ? "bg-blue-600/90 text-white"
                      : "bg-red-600/90 text-white"
                  }`}
                >
                  {product.brand}
                </span>
              </div>
              {product.tag && (
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold tracking-wide rounded-full">
                    {product.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === index
                        ? "border-gold shadow-lg"
                        : "border-transparent hover:border-gold-light"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Feature Highlights Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
              <h3
                className="text-xl font-semibold text-primary mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Key Features
              </h3>
              <ul className="space-y-3">
                {product.keyFeatures?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gold mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-divider">
                <h4 className="font-semibold text-primary mb-3">
                  Specifications
                </h4>
                <div className="space-y-2 text-sm">
                  {product.type && (
                    <div className="flex justify-between">
                      <span className="text-secondary">Type:</span>
                      <span className="text-primary font-medium">
                        {product.type}
                      </span>
                    </div>
                  )}
                  {product.venting && (
                    <div className="flex justify-between">
                      <span className="text-secondary">Venting:</span>
                      <span className="text-primary font-medium">
                        {product.venting}
                      </span>
                    </div>
                  )}
                  {product.closer && (
                    <div className="flex justify-between">
                      <span className="text-secondary">Closer:</span>
                      <span className="text-primary font-medium">
                        {product.closer}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-secondary">Handle:</span>
                    <span className="text-primary font-medium">
                      {product.handleIncluded
                        ? "Included"
                        : product.handleRequired
                        ? "Required (select below)"
                        : "Not included"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Swing:</span>
                    <span className="text-primary font-medium">
                      {product.swingType === "universal"
                        ? "Universal"
                        : "Left-Hand or Right-Hand"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Configuration */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h1>
              <p className="text-lg text-secondary mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-4">
                {product.retailPrice && (
                  <span className="text-sm text-secondary line-through">
                    Retail: ${product.retailPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-gold">
                  ${priceBreakdown.doorPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="block font-semibold text-primary mb-3">
                  Select Color <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map((color) => {
                    const colorInfo = getColorInfo(color);
                    const isSelected = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`group flex flex-col items-center gap-2 transition-all ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-80 hover:opacity-100"
                        }`}
                        title={colorInfo.displayName}
                      >
                        <div
                          className={`relative w-16 h-16 rounded-full border-4 transition-all shadow-md ${
                            isSelected
                              ? "scale-110 shadow-lg ring-4 ring-gold-light/30"
                              : "hover:scale-105"
                          }`}
                          style={{
                            backgroundColor: colorInfo.hex,
                            borderColor: isSelected ? "#b8956c" : "#d1d5db",
                          }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center shadow-lg">
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium transition-colors ${
                            isSelected ? "text-gold" : "text-secondary"
                          }`}
                        >
                          {colorInfo.displayName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Handle Selector */}
            {product.handleRequired && handleOptions.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border-gold/30">
                <label className="block font-semibold text-primary mb-2">
                  Select Handle <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-secondary mb-4">
                  Handle required for this product. Select style and finish.
                </p>
                <select
                  value={selectedHandle}
                  onChange={(e) => setSelectedHandle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-divider focus:border-gold focus:outline-none transition-colors bg-white"
                  required
                >
                  <option value="">Choose a handle...</option>
                  {handleOptions.map((handle) => (
                    <option key={handle.id} value={handle.id}>
                      {handle.name} - ${handle.price}
                    </option>
                  ))}
                </select>
                {selectedHandleData && (
                  <div className="mt-3 p-3 bg-gold-light/10 rounded-lg">
                    <p className="text-sm text-primary">
                      <strong>Selected:</strong> {selectedHandleData.name} - $
                      {selectedHandleData.price}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Swing Direction Selector */}
            {product.swingType === "lrh" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border-gold/30">
                <label className="block font-semibold text-primary mb-2">
                  Select Swing Direction <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-secondary mb-4">
                  This door requires a specific swing direction. Determine which
                  side your hinges will be on when viewing from outside.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedSwing("left")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSwing === "left"
                        ? "border-gold bg-gold-light/20"
                        : "border-divider hover:border-gold-light"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">←</div>
                      <div className="font-semibold text-primary">
                        Left-Hand Outswing
                      </div>
                      <div className="text-xs text-secondary mt-1">
                        Hinge on left
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedSwing("right")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedSwing === "right"
                        ? "border-gold bg-gold-light/20"
                        : "border-divider hover:border-gold-light"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">→</div>
                      <div className="font-semibold text-primary">
                        Right-Hand Outswing
                      </div>
                      <div className="text-xs text-secondary mt-1">
                        Hinge on right
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* ZIP Code Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <label className="block font-semibold text-primary mb-2">
                Enter ZIP Code
              </label>
              <p className="text-sm text-secondary mb-4">
                Calculate delivery costs and check installation availability
              </p>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 5);
                  setZipCode(value);
                }}
                placeholder="12345"
                className="w-full px-4 py-3 rounded-xl border-2 border-divider focus:border-gold focus:outline-none transition-colors"
                maxLength={5}
              />
              {zipCode && zipCode.length === 5 && (
                <div className="mt-3 p-3 bg-green/10 rounded-lg">
                  <p className="text-sm text-green">
                    {isWithinServiceRadius(zipCode)
                      ? "✓ Delivery available - FREE"
                      : `Delivery available - $${99} fee`}
                  </p>
                </div>
              )}
            </div>

            {/* Installation Option */}
            {zipCode && zipCode.length === 5 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={installationSelected}
                    onChange={(e) => setInstallationSelected(e.target.checked)}
                    className="w-5 h-5 text-gold rounded focus:ring-gold focus:ring-2"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-primary">
                      Professional Installation
                    </div>
                    <div className="text-sm text-secondary">
                      ${INSTALLATION_PRICE} - Includes removal of old door and
                      on-site adjustments. Delivery included.
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gold">
                    ${INSTALLATION_PRICE}
                  </span>
                </label>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="rounded-2xl p-6 shadow-sm bg-white">
              <h3 className="font-semibold text-primary mb-4">
                Price Breakdown
              </h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-secondary">Door Price:</span>
                  <span className="text-primary font-medium">
                    ${priceBreakdown.doorPrice.toLocaleString()}
                  </span>
                </div>
                {priceBreakdown.handlePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Handle:</span>
                    <span className="text-primary font-medium">
                      ${priceBreakdown.handlePrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {priceBreakdown.installationPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Installation:</span>
                    <span className="text-primary font-medium">
                      ${priceBreakdown.installationPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {priceBreakdown.deliveryPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Delivery:</span>
                    <span className="text-primary font-medium">
                      ${priceBreakdown.deliveryPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                {priceBreakdown.deliveryPrice === 0 &&
                  zipCode &&
                  zipCode.length === 5 && (
                    <div className="flex justify-between text-green">
                      <span>Delivery:</span>
                      <span className="font-medium">FREE</span>
                    </div>
                  )}
                <div className="flex justify-between pt-2 border-t border-divider">
                  <span className="text-secondary">Subtotal:</span>
                  <span className="text-primary font-medium">
                    ${priceBreakdown.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Tax (estimated):</span>
                  <span className="text-primary font-medium">
                    ${priceBreakdown.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-gold font-bold text-lg">
                  <span className="text-primary">Total:</span>
                  <span className="text-gold">
                    ${priceBreakdown.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart || addedToCart}
              className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                canAddToCart && !addedToCart
                  ? "bg-gold text-white hover:bg-green hover:shadow-xl transform hover:-translate-y-1"
                  : addedToCart
                  ? "bg-green text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {addedToCart
                ? "Added! Redirecting to cart..."
                : !canAddToCart
                ? "Please complete required selections"
                : "Add to Cart"}
            </button>

            {/* Measurement Guidance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-primary mb-3">
                Need Help Measuring?
              </h3>
              <p className="text-sm text-secondary mb-4">
                Ensure you get the perfect fit. Follow our measurement guide to
                get accurate dimensions.
              </p>
              <button
                onClick={() => setShowMeasurementGuide(true)}
                className="text-gold hover:text-green font-medium text-sm flex items-center gap-2 transition-colors"
              >
                View Measurement Guide
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Guide Modal */}
      {showMeasurementGuide && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowMeasurementGuide(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-divider px-6 py-4 flex items-center justify-between">
              <h2
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Measurement Guide
              </h2>
              <button
                onClick={() => setShowMeasurementGuide(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  How to Measure Your Door Opening
                </h3>
                <div className="space-y-4 text-secondary">
                  <p>
                    Accurate measurements are crucial for a perfect fit. Follow
                    these steps to measure your door opening:
                  </p>
                  <ol className="list-decimal list-inside space-y-3 ml-4">
                    <li>
                      <strong>Measure Width:</strong> Measure the width of the
                      door opening at three points: top, middle, and bottom.
                      Record the smallest measurement.
                    </li>
                    <li>
                      <strong>Measure Height:</strong> Measure the height from
                      the threshold to the top of the opening at three points:
                      left, center, and right. Record the smallest measurement.
                    </li>
                    <li>
                      <strong>Check Square:</strong> Measure diagonally from
                      corner to corner. Both diagonals should be equal. If they
                      differ significantly, note the difference.
                    </li>
                    <li>
                      <strong>Measure Depth:</strong> Measure the depth of your
                      door frame to ensure compatibility with the storm door
                      thickness.
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-gold-light/10 rounded-2xl p-6">
                <h4 className="font-semibold text-primary mb-3">Pro Tips</h4>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>Always use a metal tape measure for accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>
                      Measure in inches and record to the nearest 1/8 inch
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>
                      Measure with the existing door removed if possible
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>Double-check all measurements before ordering</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-3">
                  Swing Direction Guide
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-divider rounded-xl p-4">
                    <div className="text-2xl mb-2 text-center">←</div>
                    <div className="font-semibold text-primary text-center mb-2">
                      Left-Hand Outswing
                    </div>
                    <p className="text-sm text-secondary text-center">
                      Hinges on the left when viewed from outside, door opens
                      outward
                    </p>
                  </div>
                  <div className="border border-divider rounded-xl p-4">
                    <div className="text-2xl mb-2 text-center">→</div>
                    <div className="font-semibold text-primary text-center mb-2">
                      Right-Hand Outswing
                    </div>
                    <p className="text-sm text-secondary text-center">
                      Hinges on the right when viewed from outside, door opens
                      outward
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowMeasurementGuide(false)}
                  className="px-8 py-3 bg-gold text-white rounded-full font-semibold hover:bg-green transition-colors"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
