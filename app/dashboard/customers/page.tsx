"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
  status: "active" | "inactive";
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock customers data
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      orders: 5,
      totalSpent: 3245.99,
      joinDate: "2023-06-15",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 234-5678",
      orders: 3,
      totalSpent: 1899.50,
      joinDate: "2023-08-22",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      phone: "(555) 345-6789",
      orders: 8,
      totalSpent: 5421.75,
      joinDate: "2023-04-10",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "(555) 456-7890",
      orders: 2,
      totalSpent: 1123.00,
      joinDate: "2023-11-05",
      status: "active",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@example.com",
      phone: "(555) 567-8901",
      orders: 1,
      totalSpent: 671.00,
      joinDate: "2024-01-08",
      status: "active",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    );
  });

  return (
    <DashboardLayout
      title="Customers"
      subtitle={`${filteredCustomers.length} customers`}
    >
      {/* Search */}
      <div className="card-premium p-6 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all text-primary"
        />
      </div>

      {/* Customers Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-divider">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-primary">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-divider hover:bg-surface transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-primary">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-primary">{customer.email}</p>
                      <p className="text-sm text-secondary">{customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-secondary">{customer.orders}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary">
                      ${customer.totalSpent.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{customer.joinDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="card-premium p-12 text-center">
          <p className="text-secondary text-lg">No customers found</p>
          <p className="text-secondary text-sm mt-2">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}
