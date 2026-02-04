"use client";

import { use } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);

  // Mock order data - in real app, fetch from API
  const order = {
    id: id,
    orderNumber: "ORD-1001",
    date: "2024-01-15",
    status: "pending" as const,
    customer: {
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
    },
    shipping: {
      address: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    items: [
      {
        id: "1",
        name: "Larson Platinum Split Fullview",
        brand: "Larson",
        quantity: 1,
        price: 671,
        color: "White Linen",
        swingType: "Left",
        installation: true,
      },
      {
        id: "2",
        name: "Andersen 2000 Series Full-View",
        brand: "Andersen",
        quantity: 1,
        price: 545,
        color: "Grey",
        swingType: "Right",
        installation: false,
      },
    ],
    subtotal: 1216,
    installation: 199,
    delivery: 0,
    tax: 113.20,
    total: 1528.20,
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || colors.pending;
  };

  return (
    <DashboardLayout
      title={`Order ${order.orderNumber}`}
      subtitle={`Placed on ${order.date}`}
    >
      <div className="space-y-6">
        {/* Order Header */}
        <div className="card-premium p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h2
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {order.orderNumber}
                </h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <p className="text-secondary">Order placed on {order.date}</p>
            </div>
            <Link
              href="/dashboard/orders"
              className="text-gold hover:text-green font-medium transition-colors"
            >
              ← Back to Orders
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="card-premium p-6">
              <h3
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Customer Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-secondary mb-1">Name</p>
                  <p className="font-medium text-primary">{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Email</p>
                  <p className="font-medium text-primary">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary mb-1">Phone</p>
                  <p className="font-medium text-primary">{order.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card-premium p-6">
              <h3
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Shipping Address
              </h3>
              <div className="space-y-1">
                <p className="text-primary">{order.shipping.address}</p>
                {order.shipping.address2 && (
                  <p className="text-primary">{order.shipping.address2}</p>
                )}
                <p className="text-primary">
                  {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="card-premium p-6">
              <h3
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-surface rounded-lg border border-divider"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-primary">{item.name}</p>
                        <p className="text-sm text-secondary">{item.brand}</p>
                      </div>
                      <p className="text-gold font-semibold">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-divider space-y-1 text-sm text-secondary">
                      <p>Quantity: {item.quantity}</p>
                      {item.color && <p>Color: {item.color}</p>}
                      {item.swingType && <p>Swing: {item.swingType}</p>}
                      {item.installation && (
                        <p className="text-gold">Installation: Included</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-premium p-6 sticky top-24">
              <h3
                className="text-xl font-bold text-primary mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-secondary">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toLocaleString()}</span>
                </div>
                {order.installation > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Installation</span>
                    <span>${order.installation.toLocaleString()}</span>
                  </div>
                )}
                {order.delivery > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Delivery</span>
                    <span>${order.delivery.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-secondary">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-divider pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
