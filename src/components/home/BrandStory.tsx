"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

export function BrandStory() {
    return (
        <section id="story" className="py-28 md:py-40 bg-offwhite">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <ScrollReveal>
                    <div className="text-center">
                        {/* Overline */}
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-8 font-sans">
                            Our Philosophy
                        </p>

                        {/* Divider */}
                        <div className="editorial-divider mx-auto mb-12" />

                        {/* Main Quote */}
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-[1.15] mb-10 max-w-4xl mx-auto">
                            A fragrance should be an{" "}
                            <em className="text-gold not-italic">intimate experience</em>,
                            not a loud announcement
                        </h2>

                        {/* Body Text */}
                        <p className="text-warm-gray text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                            For over a century, Maison Lumière has pursued a singular vision:
                            to create fragrances of such beauty and complexity that they become
                            inseparable from the wearer&apos;s identity. We source only the
                            rarest ingredients — aged ouds, hand-picked roses, ethically
                            harvested musks — and transform them through time-honored artistry
                            into liquid poetry.
                        </p>

                        <p className="text-warm-gray/70 text-sm leading-relaxed max-w-2xl mx-auto">
                            Each bottle contains not merely a scent, but a story. A journey.
                            A commitment to excellence that accepts no compromise.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
