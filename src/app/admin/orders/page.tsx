"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface OrderItem {
    _id: string;
    name: string;
    qty: number;
    price: number;
    image: string;
}

interface Order {
    _id: string;
    user?: { name: string; email: string };
    orderItems: OrderItem[];
    totalPrice: number;
    isPaid: boolean;
    status: string;
    isDelivered?: boolean;
    createdAt: string;
}

const statusColor: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Processing: "bg-blue-50 text-blue-700 border-blue-100",
    Shipped: "bg-purple-50 text-purple-700 border-purple-100",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Cancelled: "bg-red-50 text-red-700 border-red-100",
};

const statusDot: Record<string, string> = {
    Pending: "bg-amber-400",
    Processing: "bg-blue-400",
    Shipped: "bg-purple-400",
    Delivered: "bg-emerald-400",
    Cancelled: "bg-red-400",
};

export default function AdminOrdersPage() {
    const { token } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = React.useCallback(async () => {
        if (!token) return;
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const data = JSON.parse(localStorage.getItem("perfume_orders") || "[]");
            // Sort by descending createdAt
            data.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setOrders(data);
        } catch (error) {
            console.error("Failed to load orders", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        if (!token) return;
        try {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const allOrders = JSON.parse(localStorage.getItem("perfume_orders") || "[]");
            const orderIndex = allOrders.findIndex((o: Order) => o._id === id);
            if (orderIndex > -1) {
                allOrders[orderIndex].status = newStatus;
                if (newStatus === "Delivered") allOrders[orderIndex].isDelivered = true;
                localStorage.setItem("perfume_orders", JSON.stringify(allOrders));
                fetchOrders(); // Refresh orders
            } else {
                alert("Order not found");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        }
    };

    if (loading) return <div className="p-8 text-warm-gray text-xs tracking-widest uppercase animate-pulse">Loading Orders...</div>;

    const totalRevenue = orders.filter(o => o.isPaid).reduce((sum, o) => sum + o.totalPrice, 0);
    const pending = orders.filter((o) => o.status === "Pending").length;
    const processing = orders.filter((o) => o.status === "Processing").length;

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <h1 className="font-serif text-3xl text-charcoal mb-1">Orders</h1>
                <p className="text-sm text-warm-gray">
                    Track and manage all customer orders
                </p>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-10">
                {[
                    { label: "Total Orders", value: orders.length.toString(), accent: false },
                    { label: "Pending", value: pending.toString(), accent: false },
                    { label: "Processing", value: processing.toString(), accent: false },
                    { label: "Paid Revenue", value: `$${totalRevenue.toLocaleString()}`, accent: true },
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${item.accent ? "bg-charcoal text-white" : "bg-white"
                            }`}
                    >
                        <p
                            className={`text-xs tracking-[0.15em] uppercase mb-2 ${item.accent ? "text-white/40" : "text-warm-gray"
                                }`}
                        >
                            {item.label}
                        </p>
                        <p
                            className={`font-serif text-2xl ${item.accent ? "text-gold" : "text-charcoal"
                                }`}
                        >
                            {item.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Orders Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
            >
                <div className="p-6 border-b border-border/50">
                    <h3 className="font-serif text-lg text-charcoal">All Orders</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/30">
                                {["Order ID", "Customer", "Items", "Total", "Status", "Date", "Action"].map(
                                    (header) => (
                                        <th
                                            key={header}
                                            className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal"
                                        >
                                            {header}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, i) => (
                                <motion.tr
                                    key={order._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
                                    className="border-b border-border/20 hover:bg-cream/30 transition-colors duration-300"
                                >
                                    <td className="px-6 py-4 text-sm text-charcoal font-medium">
                                        {order._id.substring(0, 8)}...
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-charcoal">{order.user?.name || "Guest"}</p>
                                        <p className="text-xs text-warm-gray">{order.user?.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal/70">
                                        {order.orderItems.length} items
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal">
                                        ${order.totalPrice} ({order.isPaid ? 'Paid' : 'Unpaid'})
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-[11px] tracking-wider px-3 py-1.5 rounded-full border ${statusColor[order.status] || statusColor["Pending"]}`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${statusDot[order.status] || statusDot["Pending"]}`}
                                            />
                                            {order.status || "Pending"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-warm-gray">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            className="text-xs border p-1 rounded bg-cream outline-none"
                                            value={order.status || "Pending"}
                                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
