"use client";

import { useRef, useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Perfume } from "@/data/perfumes";

interface RelatedPerfumesProps {
    perfumes: Perfume[];
}

export function RelatedPerfumes({ perfumes }: RelatedPerfumesProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (isMobile) {
        // Horizontal scroll on mobile
        return (
            <div className="relative -mx-6 px-6">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
                >
                    {perfumes.map((perfume, index) => (
                        <motion.div
                            key={perfume.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="min-w-[65vw] flex-shrink-0 snap-start"
                        >
                            <Link href={`/perfume/${perfume.id}`} className="group block">
                                <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-4">
                                    <Image
                                        src={perfume.image}
                                        alt={perfume.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        sizes="65vw"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-warm-gray font-sans">
                                        {perfume.brand}
                                    </p>
                                    <h3 className="font-serif text-base text-charcoal group-hover:text-gold transition-colors duration-500">
                                        {perfume.name}
                                    </h3>
                                    <p className="text-sm text-warm-gray">${perfume.price}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    // Grid on desktop
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {perfumes.map((perfume, index) => (
                <ScrollReveal key={perfume.id} delay={index * 0.1}>
                    <Link href={`/perfume/${perfume.id}`} className="group block">
                        <div className="relative aspect-[3/4] overflow-hidden bg-cream mb-5">
                            <Image
                                src={perfume.image}
                                alt={perfume.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                sizes="(max-width: 1024px) 50vw, 25vw"
                            />
                        </div>
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
