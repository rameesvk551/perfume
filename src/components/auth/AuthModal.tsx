"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = isLogin ? "/api/users/login" : "/api/users/register";
        const body = isLogin ? { email, password } : { name, email, password };

        try {
            const res = await fetch(`http://localhost:5000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (res.ok) {
                login(data.token, {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                });
                onClose();
            } else {
                setError(data.message || "Authentication failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white p-8 shadow-2xl z-50"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-serif text-3xl text-charcoal">
                                {isLogin ? "Sign In" : "Register"}
                            </h2>
                            <button onClick={onClose} className="text-charcoal/50 hover:text-charcoal">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-500 text-sm p-3 mb-6 border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border border-border p-3 outline-none focus:border-charcoal transition-colors"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-border p-3 outline-none focus:border-charcoal transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-border p-3 outline-none focus:border-charcoal transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-luxury btn-luxury-dark mt-6"
                            >
                                {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-charcoal/60">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-charcoal underline underline-offset-4 hover:text-gold transition-colors"
                            >
                                {isLogin ? "Register" : "Sign In"}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
