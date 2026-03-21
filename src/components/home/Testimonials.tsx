"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const reviews = [
    {
        id: 1,
        name: "Isabelle M.",
        location: "Paris, France",
        rating: 5,
        text: "Noir Absolu is unlike anything I've ever worn. It's mysterious, deeply personal, and the longevity is extraordinary. People stop me constantly to ask what I'm wearing.",
        perfume: "Noir Absolu",
    },
    {
        id: 2,
        name: "Alexander K.",
        location: "London, UK",
        rating: 5,
        text: "Santal Sacré has become my signature scent. The depth of the sandalwood is unmatched — it evolves beautifully over hours, revealing new facets each time.",
        perfume: "Santal Sacré",
    },
    {
        id: 3,
        name: "Sofia R.",
        location: "Milan, Italy",
        rating: 5,
        text: "I've collected niche perfumes for years, and Bois Précieux is a masterpiece. The cedar and guaiac wood combination is architectural — like wearing a work of art.",
        perfume: "Bois Précieux",
    },
    {
        id: 4,
        name: "James W.",
        location: "New York, USA",
        rating: 5,
        text: "The craftsmanship behind Oud Royal is evident from the first spray. This is what true luxury smells like — rare, refined, and utterly captivating.",
        perfume: "Oud Royal",
    },
];

export function Testimonials() {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % reviews.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="py-24 md:py-36 bg-cream">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="text-center mb-16 md:mb-20">
                        <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-sans font-medium">
                            Voices
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                            What They Say
                        </h2>
                    </div>
                </ScrollReveal>

                {/* Review Card */}
                <div className="relative min-h-[280px] md:min-h-[240px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center"
                        >
                            {/* Quote mark */}
                            <div className="text-gold/30 font-serif text-7xl md:text-8xl leading-none mb-6 select-none">
                                &ldquo;
                            </div>

                            {/* Review text */}
                            <p className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal leading-relaxed max-w-3xl mx-auto mb-10">
                                {reviews[current].text}
                            </p>

                            {/* Divider */}
                            <div className="editorial-divider mx-auto mb-8" />

                            {/* Reviewer */}
                            <div className="space-y-2">
                                <p className="text-sm tracking-[0.1em] text-charcoal font-medium">
                                    {reviews[current].name}
                                </p>
                                <p className="text-xs tracking-wider text-warm-gray">
                                    {reviews[current].location}
                                </p>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-gold mt-2">
                                    on {reviews[current].perfume}
                                </p>
                            </div>

                            {/* Stars */}
                            <div className="flex items-center justify-center gap-1 mt-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                            i < reviews[current].rating
                                                ? "text-gold"
                                                : "text-border"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-3 mt-12">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`transition-all duration-500 rounded-full ${
                                current === index
                                    ? "w-8 h-1.5 bg-gold"
                                    : "w-1.5 h-1.5 bg-charcoal/20 hover:bg-charcoal/40"
                            }`}
                            aria-label={`Go to review ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
