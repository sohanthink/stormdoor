"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { icon: "📊", label: "Dashboard", href: "/dashboard" },
    { icon: "📦", label: "Products", href: "/dashboard/products" },
    { icon: "🛒", label: "Orders", href: "/dashboard/orders" },
    { icon: "👥", label: "Customers", href: "/dashboard/customers" },
    { icon: "📈", label: "Analytics", href: "/dashboard/analytics" },
  ];

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-divider transition-all duration-300 flex-shrink-0 fixed h-full`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-divider">
          <Link
            href="/"
            className={`flex items-center gap-2 ${
              sidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <span
              className={`font-bold tracking-tight text-primary ${
                sidebarOpen ? "text-2xl" : "text-xl"
              }`}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {sidebarOpen ? "Pora" : "P"}
            </span>
            {sidebarOpen && (
              <span className="text-gold font-medium tracking-widest text-xs uppercase">
                Door
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gold text-white"
                    : "text-secondary hover:bg-surface hover:text-primary"
                } ${sidebarOpen ? "justify-start" : "justify-center"}`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Toggle */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-secondary hover:bg-surface hover:text-primary transition-all"
          >
            <span className="text-xl">{sidebarOpen ? "◀" : "▶"}</span>
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-divider sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="text-secondary text-sm mt-1">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="p-2 text-secondary hover:text-primary hover:bg-surface rounded-lg transition-all">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-primary">John Doe</p>
                  <p className="text-xs text-secondary">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
