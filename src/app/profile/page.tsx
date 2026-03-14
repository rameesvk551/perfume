"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { StorefrontShell } from "@/components/StoreLayout";

export default function ProfilePage() {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyOrders = async () => {
            if (!token) return;
            try {
                await new Promise((resolve) => setTimeout(resolve, 300));
                const allOrders = JSON.parse(
                    localStorage.getItem("perfume_orders") || "[]"
                );
                const userId = token.replace("mock_token_", "");
                const myOrders = allOrders.filter(
                    (o: any) => o.userId === userId || o.userEmail === user?.email
                );
                // Sort by descending createdAt
                myOrders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setOrders(myOrders);
            } catch (error) {
                console.error("Failed to fetch user orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [token, user]);

    if (!user) {
        return (
            <StorefrontShell>
                <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
                    <p className="text-charcoal/60">Please sign in to view your profile.</p>
                </div>
            </StorefrontShell>
        );
    }

    return (
        <StorefrontShell>
            <section className="pt-32 pb-20 md:pt-48 md:pb-32 bg-offwhite min-h-[80vh]">
                <div className="max-w-5xl mx-auto px-6 md:px-12">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h1 className="font-serif text-4xl text-charcoal mb-2">My Profile</h1>
                        <p className="text-sm text-warm-gray">
                            Welcome back, {user.name}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Profile Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-1"
                        >
                            <div className="bg-white p-8 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <h2 className="font-serif text-2xl text-charcoal mb-6">Account Details</h2>

                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs tracking-widest uppercase text-warm-gray mb-1">Name</p>
                                        <p className="text-charcoal">{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-widest uppercase text-warm-gray mb-1">Email</p>
                                        <p className="text-charcoal">{user.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-widest uppercase text-warm-gray mb-1">Member Since</p>
                                        <p className="text-charcoal">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order History */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="md:col-span-2"
                        >
                            <div className="bg-white p-8 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <h2 className="font-serif text-2xl text-charcoal mb-6">Order History</h2>

                                {loading ? (
                                    <p className="text-xs tracking-widest uppercase text-warm-gray animate-pulse py-8 text-center">Loading Orders...</p>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-12 border border-dashed border-border rounded-lg">
                                        <p className="text-charcoal/50 mb-4">You haven't placed any orders yet.</p>
                                        <a href="/collections" className="text-xs tracking-widest uppercase text-gold hover:text-charcoal transition-colors">
                                            Start Shopping
                                        </a>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {orders.map((order) => (
                                            <div key={order._id} className="border border-border/50 rounded-lg p-6">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-border/50 gap-4">
                                                    <div>
                                                        <p className="text-xs text-warm-gray uppercase tracking-wider mb-1">Order #{order._id.substring(0, 8)}</p>
                                                        <p className="text-charcoal/70 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="text-left md:text-right">
                                                        <span className="inline-block bg-cream px-3 py-1 rounded-full text-xs text-charcoal/70 tracking-wider">
                                                            {order.status || (order.isDelivered ? 'Delivered' : order.isPaid ? 'Processing' : 'Pending')}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {order.orderItems.map((item: any) => (
                                                        <div key={item._id} className="flex justify-between items-center">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-16 bg-cream relative rounded overflow-hidden">
                                                                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm text-charcoal font-medium">{item.name}</p>
                                                                    <p className="text-xs text-warm-gray">Qty: {item.qty}</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-charcoal">${item.price}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                                                    <p className="text-xs tracking-widest uppercase text-warm-gray">Total</p>
                                                    <p className="text-lg font-serif text-charcoal">${order.totalPrice.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>
        </StorefrontShell>
    );
}
