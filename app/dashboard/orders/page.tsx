"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  items: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
}

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-1001",
      customerName: "John Smith",
      email: "john@example.com",
      items: 2,
      total: 1245.99,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "2",
      orderNumber: "ORD-1002",
      customerName: "Sarah Johnson",
      email: "sarah@example.com",
      items: 1,
      total: 671.00,
      status: "processing",
      date: "2024-01-14",
    },
    {
      id: "3",
      orderNumber: "ORD-1003",
      customerName: "Mike Davis",
      email: "mike@example.com",
      items: 3,
      total: 1899.50,
      status: "shipped",
      date: "2024-01-13",
    },
    {
      id: "4",
      orderNumber: "ORD-1004",
      customerName: "Emily Brown",
      email: "emily@example.com",
      items: 1,
      total: 545.00,
      status: "delivered",
      date: "2024-01-12",
    },
    {
      id: "5",
      orderNumber: "ORD-1005",
      customerName: "David Wilson",
      email: "david@example.com",
      items: 2,
      total: 1234.99,
      status: "pending",
      date: "2024-01-11",
    },
  ];

  const statusOptions = [
    { id: "all", label: "All Orders" },
    { id: "pending", label: "Pending" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardLayout
      title="Orders"
      subtitle={`${filteredOrders.length} orders found`}
    >
      {/* Filters */}
      <div className="card-premium p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by order number, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary"
            />
          </div>
          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                  selectedStatus === status.id
                    ? "bg-gold text-white"
                    : "bg-surface text-secondary hover:bg-gold-light/20"
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-divider">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Order Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-divider hover:bg-surface transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="text-gold hover:text-green font-medium transition-colors"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-primary">{order.customerName}</p>
                      <p className="text-sm text-secondary">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary">{order.items}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary">
                      ${order.total.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{order.date}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="text-gold hover:text-green text-sm font-medium transition-colors"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="card-premium p-12 text-center">
          <p className="text-secondary text-lg">No orders found</p>
          <p className="text-secondary text-sm mt-2">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
