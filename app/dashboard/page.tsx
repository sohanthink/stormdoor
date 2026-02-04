"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back! Here's what's happening today."
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Sales", value: "$24,580", change: "+12.5%" },
          { label: "Orders", value: "1,234", change: "+8.2%" },
          { label: "Customers", value: "892", change: "+15.3%" },
          { label: "Products", value: "156", change: "+3.1%" },
        ].map((stat, index) => (
          <div
            key={index}
            className="card-premium p-6 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-secondary text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-primary mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-gold">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Recent Orders
            </h2>
            <Link
              href="/dashboard/orders"
              className="text-sm text-gold hover:text-green transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <Link
                key={item}
                href={`/dashboard/orders/${1000 + item}`}
                className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-gold-light/20 transition-all"
              >
                <div>
                  <p className="font-medium text-primary">Order #{1000 + item}</p>
                  <p className="text-sm text-secondary">2 items • $299.99</p>
                </div>
                <span className="px-3 py-1 bg-gold-light text-gold rounded-full text-xs font-medium">
                  Pending
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Top Products
            </h2>
            <Link
              href="/dashboard/products"
              className="text-sm text-gold hover:text-green transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { name: "Larson Platinum Split", sales: "45 sold", price: "$671" },
              { name: "Andersen 2000 Series", sales: "32 sold", price: "$545" },
              { name: "Larson Mid-View", sales: "28 sold", price: "$589" },
              { name: "Andersen 3/4 View", sales: "21 sold", price: "$512" },
            ].map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-surface rounded-lg"
              >
                <div>
                  <p className="font-medium text-primary">{product.name}</p>
                  <p className="text-sm text-secondary">{product.sales}</p>
                </div>
                <p className="text-gold font-semibold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
