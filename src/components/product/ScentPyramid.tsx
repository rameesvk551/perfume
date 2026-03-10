"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import type { ScentPyramid as ScentPyramidType } from "@/data/perfumes";

interface ScentPyramidProps {
    pyramid: ScentPyramidType;
}

export function ScentPyramid({ pyramid }: ScentPyramidProps) {
    const layers = [
        {
            key: "top",
            label: "Top Notes",
            subtitle: "The first impression — bright and ephemeral",
            notes: pyramid.top,
            delay: 0,
        },
        {
            key: "heart",
            label: "Heart Notes",
            subtitle: "The soul of the fragrance — rich and defining",
            notes: pyramid.heart,
            delay: 0.2,
        },
        {
            key: "base",
            label: "Base Notes",
            subtitle: "The lasting memory — deep and enduring",
            notes: pyramid.base,
            delay: 0.4,
        },
    ];

    return (
        <div className="space-y-16">
            {layers.map((layer, layerIndex) => (
                <ScrollReveal key={layer.key} delay={layer.delay}>
                    <div className="relative">
                        {/* Layer header */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                {/* Pyramid triangle indicator */}
                                <div
                                    className="relative flex items-center justify-center"
                                    style={{
                                        width: `${32 + layerIndex * 16}px`,
                                        height: `${32 + layerIndex * 16}px`,
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 border border-gold/30"
                                        style={{
                                            clipPath:
                                                layerIndex === 0
                                                    ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                                                    : layerIndex === 1
                                                        ? "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
                                                        : "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                        }}
                                    />
                                    <div
                                        className="absolute inset-1 bg-gold/10"
                                        style={{
                                            clipPath:
                                                layerIndex === 0
                                                    ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                                                    : layerIndex === 1
                                                        ? "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
                                                        : "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                        }}
                                    />
                                </div>

                                <div>
                                    <h3 className="font-serif text-2xl text-charcoal">
                                        {layer.label}
                                    </h3>
                                    <p className="text-xs text-warm-gray tracking-wider mt-1">
                                        {layer.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pl-4 md:pl-0">
                            {layer.notes.map((note, noteIndex) => (
                                <motion.div
                                    key={note.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: layer.delay + noteIndex * 0.1,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    className="group relative bg-offwhite p-6 border border-border hover:border-gold/30 transition-all duration-500"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-serif text-lg text-charcoal">
                                            {note.name}
                                        </h4>
                                        <span className="text-xs text-gold">
                                            {note.intensity}/10
                                        </span>
                                    </div>

                                    {/* Intensity bar */}
                                    <div className="w-full h-[2px] bg-border">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${note.intensity * 10}%` }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 1,
                                                delay: layer.delay + noteIndex * 0.15 + 0.3,
                                                ease: [0.25, 0.46, 0.45, 0.94],
                                            }}
                                            className="h-full bg-gold/60"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Connector line between layers */}
                        {layerIndex < layers.length - 1 && (
                            <div className="flex justify-center mt-8">
                                <div className="w-[1px] h-8 bg-gold/20" />
                            </div>
                        )}
                    </div>
                </ScrollReveal>
            ))}
        </div>
    );
}
