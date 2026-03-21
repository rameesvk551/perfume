"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        id: 1,
        headline: "Discover the Art of Scent",
        subline: "Luxury fragrances crafted from the world's rarest ingredients",
        image: "/perfume_moss_banner_1772587137204.png",
    },
    {
        id: 2,
        headline: "Elevate Your Presence",
        subline: "Premium perfumes designed for those who demand the extraordinary",
        image: "/perfume_wood_banner_1772587151979.png",
    },
];

export function HeroSlider() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="relative w-full min-h-[100dvh] bg-[#0f0f0f] overflow-hidden">
            {/* Background — dark with subtle gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] via-[#0f0f0f] to-[#0a0a08]" />
                {/* Gold accent glow */}
                <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] rounded-full bg-[#c9a96e]/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#c9a96e]/3 blur-[100px]" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-6"
                >
                    {/* Perfume Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] mb-8 md:mb-12"
                    >
                        <Image
                            src={slides[current].image}
                            alt={slides[current].headline}
                            fill
                            priority
                            className="object-contain drop-shadow-[0_20px_60px_rgba(201,169,110,0.15)]"
                            sizes="(max-width: 768px) 80vw, 460px"
                        />
                    </motion.div>

                    {/* Text Content — centered below image */}
                    <div className="text-center max-w-xl">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-[#c9a96e] text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 md:mb-5 font-sans"
                        >
                            Maison Lumière
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 md:mb-6"
                        >
                            {slides[current].headline}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-white/40 text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-md mx-auto"
                        >
                            {slides[current].subline}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                href="/collections"
                                className="inline-flex items-center justify-center px-10 py-4 bg-[#c9a96e] text-white text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-[#b8944f] transition-colors duration-500 min-w-[200px]"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="#story"
                                className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/70 text-[11px] tracking-[0.2em] uppercase font-sans hover:border-white/40 hover:text-white transition-all duration-500 min-w-[200px]"
                            >
                                Our Story
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slider Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-500 rounded-full ${
                            current === index
                                ? "w-8 h-1.5 bg-[#c9a96e]"
                                : "w-1.5 h-1.5 bg-white/25 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-10 bg-white/15"
                />
                <span className="text-[8px] tracking-[0.3em] uppercase text-white/25">
                    Scroll
                </span>
            </motion.div>
        </section>
    );
}
