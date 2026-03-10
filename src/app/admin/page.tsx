"use client";

import { motion } from "framer-motion";
import {
    analyticsStats,
    monthlySales,
    orders,
    popularPerfumes,
} from "@/data/admin";

const statusColor: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700",
    Processing: "bg-blue-50 text-blue-700",
    Shipped: "bg-purple-50 text-purple-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
};

export default function AdminDashboard() {
    const maxRevenue = Math.max(...monthlySales.map((m) => m.revenue));

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <h1 className="font-serif text-3xl text-charcoal mb-1">Dashboard</h1>
                <p className="text-sm text-warm-gray">
                    Welcome back. Here&apos;s your business overview.
                </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {analyticsStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500"
                    >
                        <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-3">
                            {stat.label}
                        </p>
                        <p className="font-serif text-3xl text-charcoal mb-2">
                            {stat.value}
                        </p>
                        <div className="flex items-center gap-1.5">
                            <span
                                className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                                    }`}
                            >
                                {stat.trend === "up" ? "↑" : "↓"} {Math.abs(stat.change)}%
                            </span>
                            <span className="text-xs text-warm-gray/60">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-serif text-lg text-charcoal">Revenue</h3>
                            <p className="text-xs text-warm-gray mt-1">Monthly breakdown</p>
                        </div>
                        <span className="text-xs tracking-wider uppercase text-warm-gray/60 bg-cream px-3 py-1.5 rounded-full">
                            2024
                        </span>
                    </div>

                    {/* Simple bar chart */}
                    <div className="flex items-end gap-2 h-48">
                        {monthlySales.map((m, i) => (
                            <motion.div
                                key={m.month}
                                initial={{ height: 0 }}
                                animate={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                                transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="flex-1 bg-gradient-to-t from-gold/40 to-gold/80 rounded-t-md relative group cursor-pointer hover:from-gold/60 hover:to-gold transition-all duration-300"
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                                    ${(m.revenue / 1000).toFixed(1)}k
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-3">
                        {monthlySales.map((m) => (
                            <div key={m.month} className="flex-1 text-center">
                                <span className="text-[10px] text-warm-gray/60">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Popular Perfumes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                    <h3 className="font-serif text-lg text-charcoal mb-6">
                        Top Perfumes
                    </h3>
                    <div className="space-y-5">
                        {popularPerfumes.map((p, i) => (
                            <div key={p.name} className="flex items-center gap-4">
                                <span className="text-xs text-warm-gray/40 w-4">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-charcoal truncate">{p.name}</p>
                                    <p className="text-xs text-warm-gray">
                                        {p.sales} sold · ${(p.revenue / 1000).toFixed(1)}k
                                    </p>
                                </div>
                                <div className="w-20 h-1.5 bg-cream rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(p.sales / popularPerfumes[0].sales) * 100}%` }}
                                        transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                                        className="h-full bg-gold/70 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Orders */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
            >
                <div className="p-6 border-b border-border/50">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-serif text-lg text-charcoal">
                                Recent Orders
                            </h3>
                            <p className="text-xs text-warm-gray mt-1">
                                Last 12 orders placed
                            </p>
                        </div>
                        <a
                            href="/admin/orders"
                            className="text-xs tracking-wider uppercase text-gold hover:text-gold-dark transition-colors"
                        >
                            View All
                        </a>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/30">
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Order
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Customer
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Product
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Total
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Status
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 8).map((order, i) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                                    className="border-b border-border/20 hover:bg-cream/50 transition-colors duration-300"
                                >
                                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-charcoal">{order.customer}</p>
                                        <p className="text-xs text-warm-gray">{order.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal/70">
                                        {order.perfume}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal">
                                        ${order.total}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block text-[11px] tracking-wider px-3 py-1 rounded-full ${statusColor[order.status]
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-warm-gray">
                                        {order.date}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Inventory Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
                {[
                    { label: "In Stock", value: "12", sub: "Products available" },
                    { label: "Low Stock", value: "3", sub: "Reorder soon" },
                    { label: "Out of Stock", value: "0", sub: "All products available" },
                ].map((item, i) => (
                    <div
                        key={item.label}
                        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                        <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                            {item.label}
                        </p>
                        <p className="font-serif text-2xl text-charcoal">{item.value}</p>
                        <p className="text-xs text-warm-gray/60 mt-1">{item.sub}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
