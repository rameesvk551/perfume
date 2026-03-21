"use client";

import { useRef, useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { perfumes } from "@/data/perfumes";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function BestSellers() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [addedId, setAddedId] = useState<string | null>(null);
    const { addToCart } = useCart();

    const bestSellers = perfumes
        .filter((p) => p.rating >= 4.8)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount =
                direction === "left"
                    ? -scrollRef.current.clientWidth / 1.8
                    : scrollRef.current.clientWidth / 1.8;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            setTimeout(checkScroll, 350);
        }
    };

    const handleQuickAdd = async (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        await addToCart(productId, 1);
        setAddedId(productId);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <section className="py-24 md:py-36 bg-offwhite">
            <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
                        <div>
                            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-sans font-medium">
                                Most Loved
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
                                Best Sellers
                            </h2>
                        </div>

                        {/* Desktop Controls */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                                aria-label="Scroll left"
                                className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 ${
                                    canScrollLeft
                                        ? "border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal"
                                        : "border-charcoal/10 text-charcoal/20 cursor-not-allowed"
                                }`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                                aria-label="Scroll right"
                                className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 ${
                                    canScrollRight
                                        ? "border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal"
                                        : "border-charcoal/10 text-charcoal/20 cursor-not-allowed"
                                }`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Carousel */}
                <div className="relative -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20">
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar"
                    >
                        {bestSellers.map((perfume, index) => (
                            <motion.div
                                key={perfume.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.08,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="min-w-[70vw] sm:min-w-[42vw] md:min-w-[32vw] lg:min-w-[24vw] xl:min-w-[20vw] flex-shrink-0 snap-start"
                            >
                                <Link href={`/perfume/${perfume.id}`} className="group block">
                                    {/* Image */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-5">
                                        <Image
                                            src={perfume.image}
                                            alt={perfume.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 24vw"
                                        />

                                        {/* Badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="badge badge-bestseller">
                                                ★ Best Seller
                                            </span>
                                        </div>

                                        {/* Quick Add */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10">
                                            <motion.button
                                                whileTap={{ scale: 0.96 }}
                                                onClick={(e) => handleQuickAdd(e, perfume.id)}
                                                className="w-full py-3.5 text-[10px] tracking-[0.2em] uppercase font-sans glass-dark text-white hover:bg-charcoal transition-colors duration-300"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {addedId === perfume.id ? (
                                                        <motion.span
                                                            key="added"
                                                            initial={{ opacity: 0, y: 6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -6 }}
                                                            className="flex items-center justify-center gap-2"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            Added
                                                        </motion.span>
                                                    ) : (
                                                        <motion.span
                                                            key="add"
                                                            initial={{ opacity: 0, y: 6 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -6 }}
                                                        >
                                                            Add to Bag — ${perfume.price}
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="space-y-1.5">
                                        <p className="text-[11px] tracking-[0.2em] uppercase text-warm-gray font-sans">
                                            {perfume.brand}
                                        </p>
                                        <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-500">
                                            {perfume.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <p className="text-sm text-charcoal">${perfume.price}</p>
                                            <span className="text-[10px] text-gold">
                                                {"★".repeat(Math.floor(perfume.rating))}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
