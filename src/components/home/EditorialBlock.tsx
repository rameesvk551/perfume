"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";

export function EditorialBlock() {
    return (
        <section className="py-28 md:py-40 bg-charcoal overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: Text */}
                    <ScrollReveal direction="left">
                        <div className="space-y-8">
                            <p className="text-gold text-xs tracking-[0.4em] uppercase font-sans">
                                The Craft
                            </p>

                            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1]">
                                Three hundred roses
                                <br />
                                for a single{" "}
                                <em className="text-gold/80 not-italic">drop</em>
                            </h2>

                            <div className="editorial-divider" />

                            <p className="text-white/50 text-base leading-relaxed max-w-lg">
                                Our master perfumers work in the tradition of haute couture —
                                where excess is distilled into essence. Each ingredient is
                                sourced at the peak of its expression, from the jasmine fields
                                of Grasse to the sandalwood forests of Mysore. The result is
                                not merely a fragrance, but a revelation.
                            </p>

                            <div className="flex items-center gap-8 pt-4">
                                <div className="text-center">
                                    <p className="font-serif text-3xl text-gold">137</p>
                                    <p className="text-xs text-white/40 tracking-wider uppercase mt-1">
                                        Years
                                    </p>
                                </div>
                                <div className="w-[1px] h-12 bg-white/10" />
                                <div className="text-center">
                                    <p className="font-serif text-3xl text-gold">48</p>
                                    <p className="text-xs text-white/40 tracking-wider uppercase mt-1">
                                        Creations
                                    </p>
                                </div>
                                <div className="w-[1px] h-12 bg-white/10" />
                                <div className="text-center">
                                    <p className="font-serif text-3xl text-gold">6</p>
                                    <p className="text-xs text-white/40 tracking-wider uppercase mt-1">
                                        Continents
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Visual */}
                    <ScrollReveal direction="right" delay={0.2}>
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="relative aspect-[4/5] bg-charcoal-light overflow-hidden"
                            >
                                {/* Abstract art representing perfume craftsmanship */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Concentric circles */}
                                    <div className="relative">
                                        {[120, 90, 60, 30].map((size, i) => (
                                            <motion.div
                                                key={size}
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 1,
                                                    delay: 0.5 + i * 0.2,
                                                    ease: [0.25, 0.46, 0.45, 0.94],
                                                }}
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
                                                style={{
                                                    width: `${size * 2}px`,
                                                    height: `${size * 2}px`,
                                                }}
                                            />
                                        ))}
                                        {/* Center dot */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 1.3 }}
                                            className="w-3 h-3 rounded-full bg-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                    </div>
                                </div>

                                {/* Bottom quote */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="font-serif text-lg text-white/30 italic">
                                        &ldquo;Perfume is the art that makes memory speak.&rdquo;
                                    </p>
                                </div>
                            </motion.div>

                            {/* Accent border */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/10 -z-10" />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
