"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitted(true);
        setEmail("");
    };

    return (
        <section className="py-24 md:py-36 bg-charcoal relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-white/5" />
            </div>

            <div className="max-w-2xl mx-auto px-6 md:px-12 relative z-10">
                <ScrollReveal>
                    <div className="text-center">
                        <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6 font-sans font-medium">
                            Exclusive Access
                        </p>

                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                            Be the First{" "}
                            <em className="text-gold/80 not-italic">to Know</em>
                        </h2>

                        <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-md mx-auto mb-12">
                            Join the Maison Lumière circle for early access to new
                            releases, exclusive offers, and the art of fine perfumery.
                        </p>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="w-12 h-12 mx-auto rounded-full border border-gold/30 flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-gold"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-serif text-xl text-white">
                                        Welcome to the Maison
                                    </p>
                                    <p className="text-xs text-white/40 tracking-wider">
                                        You&apos;ll receive our next letter soon.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                                >
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="flex-1 bg-transparent border border-white/15 px-5 py-4 text-white text-sm tracking-wider placeholder:text-white/25 focus:outline-none focus:border-gold/50 transition-colors duration-500"
                                    />
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        type="submit"
                                        className="btn-luxury btn-luxury-gold shrink-0"
                                    >
                                        Subscribe
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <p className="text-[10px] text-white/20 tracking-wider mt-8">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
