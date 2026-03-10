"use client";

import { useRef, useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { collections } from "@/data/perfumes";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export function FeaturedCollections() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            // Scroll by roughly one item width or half container
            const scrollAmount = direction === 'left' ? -clientWidth / 1.5 : clientWidth / 1.5;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // Re-check after animation
            setTimeout(checkScroll, 350);
        }
    };

    return (
        <section className="py-28 md:py-40 bg-cream overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                        <div>
                            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-sans font-medium">
                                The Collections
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
                                Four Worlds of Scent
                            </h2>
                        </div>

                        {/* Carousel Controls */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                aria-label="Scroll left"
                                className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 ${canScrollLeft
                                    ? 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal'
                                    : 'border-charcoal/10 text-charcoal/20 cursor-not-allowed'
                                    }`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                aria-label="Scroll right"
                                className={`w-12 h-12 flex items-center justify-center border rounded-full transition-all duration-300 ${canScrollRight
                                    ? 'border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white hover:border-charcoal'
                                    : 'border-charcoal/10 text-charcoal/20 cursor-not-allowed'
                                    }`}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Carousel Container */}
                <div className="relative -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 pt-4">
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory pb-12 [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {collections.map((collection, index) => (
                            <div
                                key={collection.id}
                                className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[35vw] flex-shrink-0 snap-start"
                            >
                                <Link href="/collections" className="group block">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="relative aspect-[16/9] overflow-hidden bg-charcoal"
                                    >
                                        {/* Collection image */}
                                        <Image
                                            src={collection.image}
                                            alt={collection.name}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />

                                        {/* Luxury Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent z-10" />

                                        {/* Collection number */}
                                        <div className="absolute top-8 left-8 z-20">
                                            <span className="text-white/30 font-serif text-4xl md:text-5xl font-light tracking-widest mix-blend-overlay">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-10 flex flex-col justify-end h-1/2">
                                            <p className="text-gold/90 text-[10px] tracking-[0.3em] uppercase mb-4 font-sans font-medium">
                                                {collection.tagline}
                                            </p>
                                            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 group-hover:text-gold transition-colors duration-500">
                                                {collection.name}
                                            </h3>
                                            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8 font-light hidden sm:block">
                                                {collection.description}
                                            </p>

                                            {/* Hover underline CTA */}
                                            <div className="flex items-center gap-4 mt-auto">
                                                <span className="text-[10px] tracking-[0.25em] uppercase text-white group-hover:text-gold transition-colors duration-500">
                                                    Explore
                                                </span>
                                                <div className="group-hover:w-12 w-6 h-[1px] bg-gold transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
