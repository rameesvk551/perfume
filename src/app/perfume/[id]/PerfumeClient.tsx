"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScentPyramid } from "@/components/product/ScentPyramid";
import { AddToCart } from "@/components/product/AddToCart";
import { RelatedPerfumes } from "@/components/product/RelatedPerfumes";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Image from "next/image";
import { StorefrontShell } from "@/components/StoreLayout";

import { perfumes as localPerfumes } from "@/data/perfumes";

export default function PerfumeClient({ id }: { id: string }) {
    const [perfume, setPerfume] = useState<any>(null);
    const [relatedPerfumes, setRelatedPerfumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Simulate network request
                await new Promise(resolve => setTimeout(resolve, 300));

                const currentPerfume = localPerfumes.find((p: any) => p.id === id);
                if (!currentPerfume) {
                    setLoading(false);
                    return;
                }
                setPerfume(currentPerfume);

                const related = localPerfumes
                    .filter((p: any) => p.id !== currentPerfume.id)
                    .filter(
                        (p: any) =>
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

    if (loading) {
        return (
            <StorefrontShell>
                <div className="flex items-center justify-center min-h-screen">
                    <span className="text-charcoal/50 text-xs tracking-widest uppercase animate-pulse">Loading creation...</span>
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
            <section className="pt-28 md:pt-32 pb-20 md:pb-28 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Left: Image */}
                        <ScrollReveal direction="left">
                            <div className="sticky top-28">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    className="relative aspect-[3/4] bg-cream overflow-hidden"
                                >
                                    <Image
                                        src={perfume.image}
                                        alt={perfume.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />

                                    {/* Year badge */}
                                    <div className="absolute bottom-6 right-6 z-10">
                                        <span className="text-xs tracking-wider text-white/70 bg-charcoal/40 px-3 py-1 backdrop-blur-sm">
                                            Est. {perfume.year}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </ScrollReveal>

                        {/* Right: Details */}
                        <div className="lg:pt-8">
                            <ScrollReveal>
                                {/* Brand */}
                                <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-sans">
                                    {perfume.brand}
                                </p>

                                {/* Name */}
                                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal leading-[0.95] mb-6">
                                    {perfume.name}
                                </h1>

                                {/* Price */}
                                <p className="text-2xl text-charcoal font-light mb-8">
                                    ${perfume.price}
                                </p>

                                {/* Divider */}
                                <div className="editorial-divider mb-8" />

                                {/* Description */}
                                <p className="text-charcoal/70 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                                    {perfume.description}
                                </p>

                                {/* Mood Tags */}
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {perfume.mood.map((m: string) => (
                                        <span
                                            key={m}
                                            className="text-[11px] tracking-[0.15em] uppercase text-charcoal/50 border border-border px-4 py-2"
                                        >
                                            {m}
                                        </span>
                                    ))}
                                </div>

                                {/* Occasion Tags */}
                                <div className="mb-10">
                                    <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-3 font-sans">
                                        Perfect for
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {perfume.occasion.map((o: string) => (
                                            <span
                                                key={o}
                                                className="text-[11px] tracking-wider text-gold bg-gold/10 px-3 py-1.5"
                                            >
                                                {o}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Key Details */}
                                <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-t border-b border-border">
                                    <div>
                                        <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-2 font-sans">
                                            Longevity
                                        </p>
                                        <p className="font-serif text-lg text-charcoal">
                                            {perfume.longevity}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-2 font-sans">
                                            Gender
                                        </p>
                                        <p className="font-serif text-lg text-charcoal">
                                            {perfume.gender}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-[0.2em] uppercase text-warm-gray mb-2 font-sans">
                                            Rating
                                        </p>
                                        <p className="font-serif text-lg text-charcoal">
                                            {perfume.rating} / 5
                                        </p>
                                    </div>
                                </div>

                                {/* Add to Cart */}
                                <AddToCart productId={perfume.id} price={perfume.price} />
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scent Pyramid */}
            <section className="py-28 md:py-40 bg-cream">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-sans">
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
            <section className="py-28 md:py-40 bg-charcoal">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <ScrollReveal>
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-8 font-sans">
                            The Story
                        </p>
                        <div className="editorial-divider mx-auto mb-12" />
                        <p className="font-serif text-2xl md:text-3xl text-white/80 leading-relaxed italic">
                            &ldquo;{perfume.story}&rdquo;
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Related Perfumes */}
            {relatedPerfumes.length > 0 && (
                <section className="py-28 md:py-40 bg-offwhite">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <ScrollReveal>
                            <div className="text-center mb-16">
                                <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-sans">
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
        </StorefrontShell>
    );
}
