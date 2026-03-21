"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import Image from "next/image";

export function BrandStory() {
    return (
        <section id="story" className="py-24 md:py-36 bg-offwhite overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: Visual */}
                    <ScrollReveal direction="left">
                        <div className="relative">
                            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                                <Image
                                    src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80"
                                    alt="The art of perfumery"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
                            </div>
                            {/* Accent border */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/15 -z-10 hidden md:block" />
                        </div>
                    </ScrollReveal>

                    {/* Right: Text */}
                    <ScrollReveal direction="right" delay={0.15}>
                        <div className="space-y-8 lg:pl-4">
                            {/* Overline */}
                            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-sans font-medium">
                                Our Philosophy
                            </p>

                            {/* Divider */}
                            <div className="editorial-divider" />

                            {/* Main Quote */}
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-[1.15]">
                                A fragrance should be an{" "}
                                <em className="text-gold not-italic">intimate experience</em>,
                                not a loud announcement
                            </h2>

                            {/* Body Text */}
                            <p className="text-warm-gray text-base leading-relaxed max-w-lg">
                                For over a century, Maison Lumière has pursued a singular vision:
                                to create fragrances of such beauty and complexity that they become
                                inseparable from the wearer&apos;s identity. We source only the
                                rarest ingredients — aged ouds, hand-picked roses, ethically
                                harvested musks — and transform them through time-honored artistry
                                into liquid poetry.
                            </p>

                            <p className="text-warm-gray/70 text-sm leading-relaxed max-w-lg">
                                Each bottle contains not merely a scent, but a story. A journey.
                                A commitment to excellence that accepts no compromise.
                            </p>

                            {/* Stats */}
                            <div className="flex items-center gap-8 pt-4">
                                <div className="text-center">
                                    <p className="font-serif text-3xl text-gold">137</p>
                                    <p className="text-[10px] text-warm-gray tracking-[0.15em] uppercase mt-1">
                                        Years
                                    </p>
                                </div>
                                <div className="w-[1px] h-12 bg-border" />
                                <div className="text-center">
                                    <p className="font-serif text-3xl text-gold">48</p>
                                    <p className="text-[10px] text-warm-gray tracking-[0.15em] uppercase mt-1">
                                        Creations
                                    </p>
                                </div>
                                <div className="w-[1px] h-12 bg-border" />
                                <div className="text-center">
                                    <p className="font-serif text-3xl text-gold">6</p>
                                    <p className="text-[10px] text-warm-gray tracking-[0.15em] uppercase mt-1">
                                        Continents
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
