"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Perfume } from "@/data/perfumes";

interface RelatedPerfumesProps {
    perfumes: Perfume[];
}

export function RelatedPerfumes({ perfumes }: RelatedPerfumesProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {perfumes.map((perfume, index) => (
                <ScrollReveal key={perfume.id} delay={index * 0.1}>
                    <Link href={`/perfume/${perfume.id}`} className="group block">
                        {/* Image */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-cream mb-5">
                            <Image
                                src={perfume.image}
                                alt={perfume.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                        </div>

                        {/* Info */}
                        <div className="space-y-1.5">
                            <p className="text-[11px] tracking-[0.2em] uppercase text-warm-gray font-sans">
                                {perfume.brand}
                            </p>
                            <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors duration-500">
                                {perfume.name}
                            </h3>
                            <p className="text-sm text-warm-gray">${perfume.price}</p>
                        </div>
                    </Link>
                </ScrollReveal>
            ))}
        </div>
    );
}
