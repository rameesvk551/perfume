"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled && !mobileOpen
                    ? "bg-offwhite/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.05)]"
                    : "bg-transparent"
                    }`}
            >
                <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-[72px] md:h-24">
                    {/* Logo */}
                    <Link href="/" className="relative z-50" onClick={() => setMobileOpen(false)}>
                        <h1 className={`font-serif text-xl md:text-2xl tracking-[0.15em] uppercase transition-colors duration-500 ${mobileOpen ? '!text-white' : 'text-charcoal'}`}>
                            Maison
                            <span className="text-gold ml-1">Lumière</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12 relative z-50">
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

                    <div className="flex items-center gap-6 relative z-50">
                        {/* Auth Toggle (Desktop) */}
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
                            onClick={() => { setIsCartOpen(true); setMobileOpen(false); }}
                            className={`relative transition-colors duration-500 ${mobileOpen ? '!text-white hover:!text-gold' : 'text-charcoal hover:text-gold'}`}
                            aria-label="Open Cart"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`absolute -top-1 -right-2 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-sans transition-colors duration-500 ${mobileOpen ? 'bg-white !text-charcoal' : 'bg-charcoal text-white'}`}
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 ml-1"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className={`block w-6 h-[1px] transition-colors duration-500 ${mobileOpen ? 'bg-white' : 'bg-charcoal'}`}
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                                className={`block w-6 h-[1px] transition-colors duration-500 ${mobileOpen ? 'bg-white' : 'bg-charcoal'}`}
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className={`block w-6 h-[1px] transition-colors duration-500 ${mobileOpen ? 'bg-white' : 'bg-charcoal'}`}
                            />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu - Ultra Premium Design */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                        exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        className="fixed inset-0 z-40 bg-charcoal flex flex-col pt-[110px] pb-10 px-6 overflow-hidden"
                    >
                        {/* Dramatic Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/perfume_moss_banner_1772587137204.png"
                                alt="Background"
                                fill
                                className="object-cover opacity-[0.15] scale-110 blur-[8px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/95 to-charcoal" />
                        </div>
                        
                        {/* Nav Links */}
                        <nav className="flex flex-col gap-0 flex-1 relative z-10 justify-center">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                                    className="border-b border-white/10 last:border-b-0"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="group block py-6 sm:py-8 w-full"
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className="font-serif text-[2.5rem] sm:text-6xl text-white/90 font-light group-hover:text-gold transition-colors duration-500 leading-none">
                                                {link.label}
                                            </span>
                                            <span className="text-gold/50 font-sans text-[10px] tracking-[0.2em] transform -translate-y-1">
                                                0{i + 1}
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Bottom Info Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="relative z-10 mt-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-6"
                        >
                            {/* Auth Button */}
                            <div className="w-full sm:w-auto">
                                {user ? (
                                    <div className="flex items-center justify-between gap-6 px-6 py-4 bg-white/5 border border-white/10">
                                        <Link href="/profile" onClick={() => setMobileOpen(false)} className="text-[10px] tracking-[0.2em] uppercase text-white hover:text-gold transition-colors">
                                            Profile
                                        </Link>
                                        <div className="w-px h-3 bg-white/20" />
                                        <button onClick={() => { logout(); setMobileOpen(false); }} className="text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                                        className="w-full px-12 py-4 border border-white/20 text-[10px] tracking-[0.2em] uppercase text-white hover:bg-white hover:text-charcoal transition-all duration-500 backdrop-blur-md"
                                    >
                                        Sign In
                                    </button>
                                )}
                            </div>

                            {/* Minimal Contact & Social */}
                            <div className="flex items-center gap-6">
                                <a href="mailto:contact@maisonlumiere.com" className="text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">Contact</a>
                                <div className="w-px h-3 bg-white/20" />
                                <div className="flex gap-4">
                                    <a href="#" className="text-white/50 hover:text-gold transition-colors text-[10px] tracking-wider uppercase">IG</a>
                                    <a href="#" className="text-white/50 hover:text-gold transition-colors text-[10px] tracking-wider uppercase">FB</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            <CartDrawer />
        </>
    );
}
