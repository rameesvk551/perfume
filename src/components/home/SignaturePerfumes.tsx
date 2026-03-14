"use client";

import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";
import Image from "next/image";

import { perfumes } from "@/data/perfumes";

export function SignaturePerfumes() {
    const [featured, setFeatured] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                // Simulate network request
                await new Promise(resolve => setTimeout(resolve, 500));
                setFeatured(perfumes.filter((p: any) => p.rating >= 4.8).slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch featured", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPerfumes();
    }, []);

    if (loading) return null;

    return (
        <section className="py-28 md:py-40 bg-offwhite">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-sans">
                            Signature Scents
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">
                            Icons of the House
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                    {featured.map((perfume, index) => (
                        <ScrollReveal key={perfume.id} delay={index * 0.12}>
                            <Link href={`/perfume/${perfume.id}`} className="group block">
                                <div className="relative">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-cream mb-5">
                                        <Image
                                            src={perfume.image}
                                            alt={perfume.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <p className="text-[11px] tracking-[0.2em] uppercase text-warm-gray font-sans">
                                            {perfume.brand}
                                        </p>
                                        <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-500">
                                            {perfume.name}
                                        </h3>
                                        <p className="text-sm text-warm-gray">
                                            ${perfume.price}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal delay={0.4}>
                    <div className="text-center mt-20">
                        <Link href="/collections" className="btn-luxury btn-luxury-outline">
                            View All Fragrances
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
