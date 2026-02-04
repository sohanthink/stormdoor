"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import door1 from "@/public/products/door1.png";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal } = useCart();

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Shipping Address
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    // Billing (same as shipping by default)
    sameAsShipping: true,
    billingAddress: "",
    billingAddress2: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    // Account Creation
    createAccount: false,
    password: "",
    confirmPassword: "",
    // Order Notes
    orderNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const installationPrice = 199;
  const deliveryPrice = 0;
  const taxRate = 0.08;

  const subtotal = getCartTotal();
  const installationTotal =
    cartItems.filter((item) => item.installation).length * installationPrice;
  const totalBeforeTax = subtotal + installationTotal + deliveryPrice;
  const tax = totalBeforeTax * taxRate;
  const total = totalBeforeTax + tax;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Personal Information
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    // Shipping Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code";
    }

    // Billing Address (if different)
    if (!formData.sameAsShipping) {
      if (!formData.billingAddress.trim()) {
        newErrors.billingAddress = "Billing address is required";
      }
      if (!formData.billingCity.trim()) {
        newErrors.billingCity = "Billing city is required";
      }
      if (!formData.billingState.trim()) {
        newErrors.billingState = "Billing state is required";
      }
      if (!formData.billingZipCode.trim()) {
        newErrors.billingZipCode = "Billing ZIP code is required";
      }
    }

    // Account Creation
    if (formData.createAccount) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Here you'll integrate with Stripe payment
    // For now, just simulate a delay
    setTimeout(() => {
      setIsSubmitting(false);
      // After payment, you'd redirect to success page
      // router.push("/checkout/success");
      alert("Checkout form is ready! Stripe integration will be added here.");
    }, 1000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary pt-24 pb-8 md:pt-28 md:pb-12 flex items-center justify-center">
        <div className="container-custom text-center">
          <h1
            className="text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your cart is empty
          </h1>
          <p className="text-secondary mb-6">
            Add items to your cart before checkout
          </p>
          <Link href="/shop" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary pt-24 pb-8 md:pt-28 md:pb-12">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="text-gold hover:text-green font-medium transition-colors inline-flex items-center gap-2 mb-4"
          >
            ← Back to Cart
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Checkout
          </h1>
          <p className="text-secondary">
            Complete your order by filling in the information below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="card-premium p-6">
              <h2
                className="text-2xl font-bold text-primary mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                      errors.firstName ? "border-red-500" : "border-divider"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                      errors.lastName ? "border-red-500" : "border-divider"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                      errors.email ? "border-red-500" : "border-divider"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                      errors.phone ? "border-red-500" : "border-divider"
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card-premium p-6">
              <h2
                className="text-2xl font-bold text-primary mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                      errors.address ? "border-red-500" : "border-divider"
                    }`}
                    placeholder="123 Main St"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="address2"
                    className="block text-sm font-medium text-primary mb-2"
                  >
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary"
                    placeholder="Apt 4B"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                        errors.city ? "border-red-500" : "border-divider"
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                        errors.state ? "border-red-500" : "border-divider"
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                        errors.zipCode ? "border-red-500" : "border-divider"
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  name="sameAsShipping"
                  checked={formData.sameAsShipping}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold border-divider rounded focus:ring-gold"
                />
                <label
                  htmlFor="sameAsShipping"
                  className="text-sm font-medium text-primary cursor-pointer"
                >
                  Billing address same as shipping address
                </label>
              </div>

              {!formData.sameAsShipping && (
                <div>
                  <h3
                    className="text-xl font-bold text-primary mb-4"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Billing Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="billingAddress"
                        className="block text-sm font-medium text-primary mb-2"
                      >
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                          errors.billingAddress ? "border-red-500" : "border-divider"
                        }`}
                      />
                      {errors.billingAddress && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.billingAddress}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="billingCity"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          City *
                        </label>
                        <input
                          type="text"
                          id="billingCity"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                            errors.billingCity ? "border-red-500" : "border-divider"
                          }`}
                        />
                        {errors.billingCity && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingCity}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="billingState"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          State *
                        </label>
                        <input
                          type="text"
                          id="billingState"
                          name="billingState"
                          value={formData.billingState}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                            errors.billingState ? "border-red-500" : "border-divider"
                          }`}
                        />
                        {errors.billingState && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingState}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="billingZipCode"
                          className="block text-sm font-medium text-primary mb-2"
                        >
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="billingZipCode"
                          name="billingZipCode"
                          value={formData.billingZipCode}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                            errors.billingZipCode ? "border-red-500" : "border-divider"
                          }`}
                        />
                        {errors.billingZipCode && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingZipCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Creation */}
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="createAccount"
                  name="createAccount"
                  checked={formData.createAccount}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold border-divider rounded focus:ring-gold"
                />
                <label
                  htmlFor="createAccount"
                  className="text-sm font-medium text-primary cursor-pointer"
                >
                  Create an account for faster checkout next time
                </label>
              </div>

              {formData.createAccount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                        errors.password ? "border-red-500" : "border-divider"
                      }`}
                      placeholder="At least 8 characters"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary ${
                        errors.confirmPassword ? "border-red-500" : "border-divider"
                      }`}
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="card-premium p-6">
              <label
                htmlFor="orderNotes"
                className="block text-sm font-medium text-primary mb-2"
              >
                Order Notes (optional)
              </label>
              <textarea
                id="orderNotes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary"
                placeholder="Special delivery instructions, notes about your order, etc."
              />
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sticky top-24">
              <h2
                className="text-2xl font-bold text-primary mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-divider">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-b from-[#e8e4dc] to-[#d4cfc5] flex-shrink-0">
                      <Image
                        src={item.image || door1}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-secondary">
                        {item.color && `${item.color} • `}
                        {item.quantity}x
                      </p>
                      <p className="text-sm text-gold font-semibold mt-1">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-4 border-t border-divider">
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
                <div className="border-t border-divider pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Placeholder */}
              <div className="mb-6 p-4 bg-surface rounded-lg border border-divider">
                <p className="text-sm text-secondary text-center">
                  💳 Payment will be processed securely with Stripe
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full text-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>

              {/* Security Badge */}
              <div className="text-center pt-4 border-t border-divider mt-4">
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
        </form>
      </div>
    </div>
  );
}
