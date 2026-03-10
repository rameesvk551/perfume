"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/collections", label: "Collections" },
        { href: "#story", label: "Our Story" },
        { href: "#contact", label: "Contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                    ? "bg-offwhite/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
                    : "bg-transparent"
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link href="/" className="relative z-10">
                        <h1 className="font-serif text-xl md:text-2xl tracking-[0.15em] text-charcoal uppercase">
                            Maison
                            <span className="text-gold ml-1">Lumière</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="luxury-link text-xs tracking-[0.2em] uppercase text-charcoal-light hover:text-charcoal transition-colors duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Auth Toggle */}
                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <Link href="/profile" className="text-xs tracking-wider uppercase text-charcoal/70 hover:text-gold transition-colors">
                                    Hello, {user.name.split(" ")[0]}
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-xs tracking-wider uppercase text-charcoal/40 hover:text-charcoal transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setAuthOpen(true)}
                                className="hidden md:block text-xs tracking-wider uppercase text-charcoal hover:text-gold transition-colors"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Cart Toggle */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-charcoal hover:text-gold transition-colors"
                            aria-label="Open Cart"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-charcoal text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-serif">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="relative z-10 md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 ml-2"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-[1px] bg-charcoal"
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block w-6 h-[1px] bg-charcoal"
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-[1px] bg-charcoal"
                            />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 bg-offwhite flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="font-serif text-3xl tracking-[0.1em] text-charcoal hover:text-gold transition-colors duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            <CartDrawer />
        </>
    );
}
