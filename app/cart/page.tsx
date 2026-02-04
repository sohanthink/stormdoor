"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import door1 from "@/public/products/door1.png";

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  const installationPrice = 199;
  const deliveryPrice = 0; // Free delivery with installation
  const taxRate = 0.08;

  const subtotal = getCartTotal();
  const installationTotal =
    cartItems.filter((item) => item.installation).length * installationPrice;
  const totalBeforeTax = subtotal + installationTotal + deliveryPrice;
  const tax = totalBeforeTax * taxRate;
  const total = totalBeforeTax + tax;

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-8 md:pt-28 md:pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Shopping Cart
          </h1>
          <p className="text-secondary">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="card-premium p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2
              className="text-2xl font-bold text-primary mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Your cart is empty
            </h2>
            <p className="text-secondary mb-6">
              Start adding doors to your cart to get started
            </p>
            <Link href="/shop" className="btn-primary inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card-premium p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-b from-[#e8e4dc] to-[#d4cfc5] shrink-0">
                      <Image
                        src={item.image || door1}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className="text-xl font-semibold text-primary mb-1"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm text-secondary mb-2">
                            {item.brand}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-secondary hover:text-primary transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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

                      {/* Product Options */}
                      <div className="space-y-1 mb-4 text-sm text-secondary">
                        {item.color && (
                          <p>
                            <span className="font-medium">Color:</span> {item.color}
                          </p>
                        )}
                        {item.swingType && (
                          <p>
                            <span className="font-medium">Swing:</span> {item.swingType}
                          </p>
                        )}
                        {item.handleName && (
                          <p>
                            <span className="font-medium">Handle:</span> {item.handleName}
                            {item.handlePrice && ` ($${item.handlePrice})`}
                          </p>
                        )}
                        {item.handleIncluded !== undefined && !item.handleName && (
                          <p>
                            <span className="font-medium">Handle:</span>{" "}
                            {item.handleIncluded ? "Included" : "Not included"}
                          </p>
                        )}
                        {item.installation && (
                          <p className="text-gold">
                            <span className="font-medium">Installation:</span> Included
                          </p>
                        )}
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between pt-4 border-t border-divider">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-primary">
                            Quantity:
                          </label>
                          <div className="flex items-center gap-2 border border-divider rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-secondary hover:text-primary hover:bg-surface transition-all"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 text-primary font-medium min-w-12 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-secondary hover:text-primary hover:bg-surface transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gold font-semibold text-xl">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-secondary">
                              ${item.price.toLocaleString()} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <Link
                  href="/shop"
                  className="text-gold hover:text-green font-medium transition-colors inline-flex items-center gap-2"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-premium p-6 sticky top-24">
                <h2
                  className="text-2xl font-bold text-primary mb-6"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>

                  {installationTotal > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Installation</span>
                      <span>${installationTotal.toLocaleString()}</span>
                    </div>
                  )}

                  {deliveryPrice > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Delivery</span>
                      <span>${deliveryPrice.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-secondary">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-divider pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-primary">Total</span>
                      <span className="text-2xl font-bold text-gold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="btn-primary w-full text-center mb-4"
                >
                  Proceed to Checkout
                </button>

                {/* Security Badge */}
                <div className="text-center pt-4 border-t border-divider">
                  <p className="text-xs text-secondary flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
