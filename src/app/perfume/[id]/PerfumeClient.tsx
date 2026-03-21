"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScentPyramid } from "@/components/product/ScentPyramid";
import { AddToCart } from "@/components/product/AddToCart";
import { RelatedPerfumes } from "@/components/product/RelatedPerfumes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { StorefrontShell } from "@/components/StoreLayout";
import { useCart } from "@/context/CartContext";

import { perfumes as localPerfumes } from "@/data/perfumes";

interface Perfume {
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    collection: string;
    mood: string[];
    image: string;
    scentPyramid: { top: { name: string }[], heart: { name: string }[], base: { name: string }[] };
    rating: number;
    year: number;
    longevity: string;
}

export default function PerfumeClient({ id }: { id: string }) {
    const [perfume, setPerfume] = useState<Perfume | null>(null);
    const [relatedPerfumes, setRelatedPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [descExpanded, setDescExpanded] = useState(false);
    const [stickyAdded, setStickyAdded] = useState(false);
    const addToCartRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                const currentPerfume = localPerfumes.find((p: Perfume) => p.id === id);
                if (!currentPerfume) {
                    setLoading(false);
                    return;
                }
                setPerfume(currentPerfume);
                const related = localPerfumes
                    .filter((p: Perfume) => p.id !== currentPerfume.id)
                    .filter(
                        (p: Perfume) =>
                            p.collection === currentPerfume.collection ||
                            p.mood.some((m: string) => currentPerfume.mood.includes(m))
                    )
                    .slice(0, 4);
                setRelatedPerfumes(related);
            } catch (error) {
                console.error("Error loading product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Show sticky bar when Add to Cart is scrolled past
    useEffect(() => {
        if (!addToCartRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyBar(!entry.isIntersecting);
            },
            { threshold: 0 }
        );
        observer.observe(addToCartRef.current);
        return () => observer.disconnect();
    }, [loading, perfume]);

    const handleStickyAdd = async () => {
        if (!perfume) return;
        await addToCart(perfume.id, 1);
        setStickyAdded(true);
        setTimeout(() => setStickyAdded(false), 2500);
    };

    if (loading) {
        return (
            <StorefrontShell>
                <div className="pt-28 md:pt-32 pb-20 bg-offwhite">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                            <div className="aspect-[3/4] skeleton" />
                            <div className="space-y-6 pt-8">
                                <div className="h-3 w-24 skeleton" />
                                <div className="h-12 w-64 skeleton" />
                                <div className="h-6 w-20 skeleton" />
                                <div className="h-px w-16 skeleton" />
                                <div className="h-20 w-full skeleton" />
                                <div className="flex gap-3">
                                    <div className="h-8 w-20 skeleton" />
                                    <div className="h-8 w-20 skeleton" />
                                    <div className="h-8 w-20 skeleton" />
                                </div>
                                <div className="h-14 w-full skeleton mt-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </StorefrontShell>
        );
    }

    if (!perfume) {
        return (
            <StorefrontShell>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <h1 className="text-2xl font-serif text-charcoal mb-4">Product Not Found</h1>
                    <p className="text-charcoal/60">The fragrance you are looking for does not exist.</p>
                </div>
            </StorefrontShell>
        );
    }

    return (
        <StorefrontShell>
            {/* Product Hero */}
            <section className="pt-24 md:pt-32 pb-16 md:pb-28 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
                        {/* Left: Image Gallery */}
                        <ScrollReveal direction="left">
                            <div className="sticky top-28">
                                <div className="relative aspect-[3/4] bg-cream overflow-hidden group">
                                    <Image
                                        src={perfume.image}
                                        alt={perfume.name}
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />

                                    {/* Year badge */}
                                    <div className="absolute bottom-5 right-5 z-10">
                                        <span className="text-[10px] tracking-[0.2em] text-white/80 bg-charcoal/40 px-3 py-1.5 backdrop-blur-sm uppercase">
                                            Est. {perfume.year}
                                        </span>
                                    </div>

                                    {/* Best Seller badge */}
                                    {perfume.rating >= 4.8 && (
                                        <div className="absolute top-5 left-5 z-10">
                                            <span className="badge badge-bestseller bg-white/80">
                                                ★ Best Seller
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Details */}
                        <div className="lg:pt-6">
                            <ScrollReveal>
                                {/* Brand */}
                                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-sans font-medium">
                                    {perfume.brand}
                                </p>

                                {/* Name */}
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-[0.95] mb-5">
                                    {perfume.name}
                                </h1>

                                {/* Price + Rating */}
                                <div className="flex items-center gap-4 mb-8">
                                    <p className="text-2xl text-charcoal font-light">
                                        ${perfume.price}
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm text-gold">
                                            {"★".repeat(Math.floor(perfume.rating))}
                                        </span>
                                        <span className="text-xs text-warm-gray">
                                            {perfume.rating}
                                        </span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="editorial-divider mb-8" />

                                {/* Description - Expandable */}
                                <div className="mb-8">
                                    <p className={`text-charcoal/70 text-base leading-relaxed max-w-lg ${!descExpanded ? "line-clamp-3" : ""}`}>
                                        {perfume.description}
                                    </p>
                                    {perfume.description.length > 150 && (
                                        <button
                                            onClick={() => setDescExpanded(!descExpanded)}
                                            className="text-[10px] tracking-[0.2em] uppercase text-gold mt-3 hover:text-gold-dark transition-colors"
                                        >
                                            {descExpanded ? "Read Less" : "Read More"}
                                        </button>
                                    )}
                                </div>

                                {/* Mood Tags */}
                                <div className="flex flex-wrap gap-2.5 mb-8">
                                    {perfume.mood.map((m: string) => (
                                        <span
                                            key={m}
                                            className="text-[10px] tracking-[0.15em] uppercase text-charcoal/50 border border-border px-4 py-2.5"
                                        >
                                            {m}
                                        </span>
                                    ))}
                                </div>

                                {/* Occasion Tags */}
                                <div className="mb-8">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-3 font-sans">
                                        Perfect for
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {perfume.occasion.map((o: string) => (
                                            <span
                                                key={o}
                                                className="text-[10px] tracking-wider text-gold bg-gold/10 px-3.5 py-2"
                                            >
                                                {o}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Details */}
                                <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10 py-8 border-t border-b border-border">
                                    <div>
                                        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-2 font-sans">
                                            Longevity
                                        </p>
                                        <p className="font-serif text-lg text-charcoal">
                                            {perfume.longevity}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-2 font-sans">
                                            Gender
                                        </p>
                                        <p className="font-serif text-lg text-charcoal">
                                            {perfume.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray mb-2 font-sans">
                                            Rating
                                        </p>
                                        <p className="font-serif text-lg text-charcoal">
                                            {perfume.rating} / 5
                                        </p>
                                    </div>
                                </div>

                                {/* Add to Cart */}
                                <div ref={addToCartRef}>
                                    <AddToCart productId={perfume.id} price={perfume.price} />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why You'll Love It */}
            <section className="py-20 md:py-28 bg-cream">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <ScrollReveal>
                        <div className="text-center mb-14">
                            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-sans font-medium">
                                Why You&apos;ll Love It
                            </p>
                            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
                                Made for Moments
                            </h2>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                title: perfume.longevity,
                                desc: "Long-lasting performance that carries you from morning to night",
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                ),
                                title: perfume.mood[0],
                                desc: `${perfume.mood.join(", ")} — designed to match your inner world`,
                            },
                            {
                                icon: (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                ),
                                title: "Gift Ready",
                                desc: "Complimentary luxury wrapping & free worldwide shipping",
                            },
                        ].map((item, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="text-center p-8 bg-offwhite/80 border border-border/50 hover:border-gold/20 transition-colors duration-500">
                                    <div className="text-gold mb-5 flex justify-center">
                                        {item.icon}
                                    </div>
                                    <p className="font-serif text-lg text-charcoal mb-3">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-warm-gray leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scent Pyramid */}
            <section className="py-24 md:py-36 bg-offwhite">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6 font-sans font-medium">
                                Olfactory Composition
                            </p>
                            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                                The Scent Pyramid
                            </h2>
                        </div>
                    </ScrollReveal>

                    <ScentPyramid pyramid={perfume.scentPyramid} />
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 md:py-36 bg-charcoal">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <ScrollReveal>
                        <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-8 font-sans font-medium">
                            The Story
                        </p>
                        <div className="editorial-divider mx-auto mb-12" />
                        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed italic">
                            &ldquo;{perfume.story}&rdquo;
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Related Perfumes */}
            {relatedPerfumes.length > 0 && (
                <section className="py-24 md:py-36 bg-offwhite">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <ScrollReveal>
                            <div className="text-center mb-14">
                                <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-6 font-sans font-medium">
                                    You May Also Love
                                </p>
                                <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                                    Related Fragrances
                                </h2>
                            </div>
                        </ScrollReveal>
                        <RelatedPerfumes perfumes={relatedPerfumes} />
                    </div>
                </section>
            )}

            {/* Sticky Mobile Bottom Bar */}
            <AnimatePresence>
                {showStickyBar && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="sticky-bottom-bar lg:hidden"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-shrink-0">
                                <p className="font-serif text-base text-charcoal leading-tight">
                                    {perfume.name}
                                </p>
                                <p className="text-sm text-charcoal/70 font-light">
                                    ${perfume.price}
                                </p>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={handleStickyAdd}
                                className="flex-shrink-0 px-8 py-3.5 bg-charcoal text-white text-[10px] tracking-[0.2em] uppercase font-sans hover:bg-charcoal-light transition-colors duration-300"
                            >
                                {stickyAdded ? "✓ Added" : "Add to Bag"}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </StorefrontShell>
    );
}
