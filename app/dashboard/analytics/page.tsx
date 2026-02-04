"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Revenue", value: "$124,580", change: "+12.5%", trend: "up" },
    { label: "Orders", value: "1,234", change: "+8.2%", trend: "up" },
    { label: "Average Order Value", value: "$101.12", change: "+5.3%", trend: "up" },
    { label: "Conversion Rate", value: "3.2%", change: "-0.5%", trend: "down" },
  ];

  const topProducts = [
    { name: "Larson Platinum Split", sales: 45, revenue: "$30,195" },
    { name: "Andersen 2000 Series", sales: 32, revenue: "$17,440" },
    { name: "Larson Mid-View", sales: 28, revenue: "$16,492" },
    { name: "Andersen 3/4 View", sales: 21, revenue: "$10,752" },
  ];

  const recentActivity = [
    { type: "New Order", description: "ORD-1001 - $1,245.99", time: "2 hours ago" },
    { type: "New Customer", description: "John Smith registered", time: "5 hours ago" },
    { type: "Order Shipped", description: "ORD-1003 - $1,899.50", time: "1 day ago" },
    { type: "New Order", description: "ORD-1004 - $545.00", time: "2 days ago" },
  ];

  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Track your business performance and insights"
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card-premium p-6 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="text-secondary text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
            <p
              className={`text-xs ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card-premium p-6">
          <h2
            className="text-xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Top Selling Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-surface rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-primary mb-1">{product.name}</p>
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <span>{product.sales} sold</span>
                    <span>{product.revenue} revenue</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-premium p-6">
          <h2
            className="text-xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-surface rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-gold mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-primary">{activity.type}</p>
                  <p className="text-sm text-secondary">{activity.description}</p>
                  <p className="text-xs text-secondary mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Overview */}
      <div className="card-premium p-6 mt-6">
        <h2
          className="text-xl font-bold text-primary mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          12-Month Sales Report
        </h2>
        <div className="h-80">
          <SalesChart />
        </div>
      </div>
    </DashboardLayout>
  );
}

// Sales Chart Component
function SalesChart() {
  // 12-month sales data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const salesData = [
    1200, 300, 1850, 2400, 3200, 2800, 3500, 4100, 3800, 2900, 2200, 4500,
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Sales ($)",
        data: salesData,
        borderColor: "#b8956c", // gold color
        backgroundColor: "rgba(184, 149, 108, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#b8956c",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#b8956c",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#2c2416",
          font: {
            family: "var(--font-sans)",
            size: 12,
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(26, 24, 20, 0.9)",
        titleColor: "#faf8f5",
        bodyColor: "#faf8f5",
        borderColor: "#b8956c",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `Sales: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#5c5347",
          font: {
            family: "var(--font-sans)",
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(184, 149, 108, 0.1)",
        },
        ticks: {
          color: "#5c5347",
          font: {
            family: "var(--font-sans)",
            size: 11,
          },
          callback: function (value: any) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
