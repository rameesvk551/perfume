"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
    {
        id: 1,
        title: "HIGH STANDARDS &\nNON-TOXIC",
        subtitle: "THAT'S THE ASSENCE PROMISE.",
        description: (
            <>
                Crafted in Spain with the <span className="font-semibold text-[#8a7a6b]">best ingredients</span>, our fragrances are <span className="font-semibold text-[#8a7a6b]">cruelty-free</span> and <span className="font-semibold text-[#8a7a6b]">safe for your skin.</span>
            </>
        ),
        footer: "Indulge in luxury, guilt-free.",
        image: "/perfume_moss_banner_1772587137204.png",
        bgColor: "#f5f3eb"
    },
    {
        id: 2,
        title: "PREMIUM LUXURY\nFRAGRANCES",
        subtitle: "EXPERIENCE ELEGANCE.",
        description: "Discover our collection of premium scents made with natural ingredients, designed for those who appreciate quality and sophistication.",
        footer: "Elevate your senses.",
        image: "/perfume_wood_banner_1772587151979.png",
        bgColor: "#f6f4ed"
    }
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[80vh] min-h-[600px] max-h-[800px] bg-[#f7f5ef] overflow-hidden flex items-center justify-center pt-16">

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full flex flex-col md:flex-row items-center max-w-[90rem] mx-auto"
                >
                    {/* Text Content - Left Side */}
                    <div className="w-full md:w-1/2 md:pl-20 px-8 flex flex-col justify-center h-full z-10 relative mt-10 md:mt-0">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-[#1a1a1a] font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6 whitespace-pre-line uppercase font-sans origin-left"
                        >
                            {slides[currentSlide].title}
                        </motion.h1>

                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-[#1a1a1a] font-bold text-sm tracking-widest mb-6 uppercase"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.h3>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-[#4a4a4a] text-sm md:text-base max-w-md leading-relaxed mb-6 font-medium"
                        >
                            {slides[currentSlide].description}
                        </motion.p>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-[#6a6a6a] text-xs max-w-md"
                        >
                            {slides[currentSlide].footer}
                        </motion.p>
                    </div>

                    {/* Image Content - Right Side */}
                    <div className="w-full md:w-1/2 h-[50%] md:h-full relative flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] flex justify-center items-center"
                        >
                            <Image
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                fill
                                priority
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slider Controls (Dots) */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-[#1a1a1a] scale-110" : "bg-[#1a1a1a]/30 hover:bg-[#1a1a1a]/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
