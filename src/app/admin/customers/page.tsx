"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface User {
    _id: string;
    name: string;
    email: string;
    role?: string;
    createdAt: string;
}

export default function AdminCustomersPage() {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;
            try {
                await new Promise((resolve) => setTimeout(resolve, 300));
                const data = JSON.parse(localStorage.getItem("perfume_users") || "[]");
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [token]);

    const totalCustomers = users.length;
    // We don't have "active/spent" tracked in User model, so mock it for UI
    const activeCustomers = totalCustomers;
    const totalRevenue = 0;
    const avgSpend = 0;

    if (loading) return <div className="p-8 text-warm-gray text-xs tracking-widest uppercase animate-pulse">Loading Customers...</div>;

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <h1 className="font-serif text-3xl text-charcoal mb-1">Customers</h1>
                <p className="text-sm text-warm-gray">
                    Your valued clientele and their activities
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-10">
                {[
                    { label: "Total Clients", value: totalCustomers.toString() },
                    { label: "Active", value: activeCustomers.toString() },
                    { label: "Avg. Spend", value: `$${avgSpend.toLocaleString()}` },
                    { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}` },
                ].map((item, i) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                        <p className="text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                            {item.label}
                        </p>
                        <p className="font-serif text-2xl text-charcoal">{item.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Customer Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
                {users.map((customer, i) => (
                    <motion.div
                        key={customer._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                        className="bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500"
                    >
                        <div className="flex items-start gap-4 mb-5">
                            {/* Avatar */}
                            <div className="w-11 h-11 rounded-full bg-charcoal flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-gold font-medium tracking-wider uppercase">
                                    {customer.name.substring(0, 2)}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm text-charcoal font-medium truncate">
                                        {customer.name}
                                    </h3>
                                    <span
                                        className={`text-[10px] tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600`}
                                    >
                                        Active
                                    </span>
                                </div>
                                <p className="text-xs text-warm-gray truncate">
                                    {customer.email}
                                </p>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                            <div>
                                <p className="text-[10px] tracking-wider uppercase text-warm-gray/60 mb-1">
                                    Role
                                </p>
                                <p className="text-sm text-charcoal font-medium capitalize">
                                    {customer.role || 'user'}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[10px] tracking-wider uppercase text-warm-gray/60 mb-1">
                                    Joined Date
                                </p>
                                <p className="text-sm text-charcoal/60">
                                    {new Date(customer.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
