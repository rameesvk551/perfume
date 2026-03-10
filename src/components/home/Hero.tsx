"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative w-full h-[80vh] min-h-[600px] max-h-[800px] flex items-center bg-[#e4c9c1] overflow-hidden pt-20">
            {/* Background Image / Composition */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none bg-[#e8cfc6]">
                <Image
                    src="https://images.unsplash.com/photo-1615397323136-239d5628549e?q=80&w=2000&auto=format&fit=crop"
                    alt="Luxury Perfume Base"
                    fill
                    priority
                    className="object-cover object-[70%_center] md:object-right mix-blend-multiply opacity-50"
                    sizes="100vw"
                />
                {/* Soft gradient to ensure text readability on the left while keeping the image visible */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#e8cfc6] via-[#e8cfc6]/80 to-transparent md:w-2/3" />
            </div>

            <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-start justify-center">
                <div className="max-w-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="!font-sans !font-bold text-[2.5rem] md:text-5xl lg:text-[4rem] !text-white leading-[1.1] tracking-tight mb-4 drop-shadow-sm"
                    >
                        Exclusive Top Quality
                        <br />
                        Unisex Perfume
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="!text-white/95 text-sm md:text-base !font-medium drop-shadow-sm mb-10 tracking-wide"
                    >
                        Unisex Perfume Starting from $9.99
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Link
                            href="/collections?gender=Women"
                            className="bg-transparent border border-black/20 text-charcoal hover:bg-white hover:border-white transition-all duration-300 px-8 py-3.5 text-xs font-bold tracking-[0.1em] uppercase shadow-sm"
                        >
                            Shop Women
                        </Link>
                        <Link
                            href="/collections?gender=Men"
                            className="bg-black border border-black text-white hover:bg-charcoal hover:border-charcoal transition-all duration-300 px-8 py-3.5 text-xs font-bold tracking-[0.1em] uppercase shadow-sm"
                        >
                            Shop Men
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
