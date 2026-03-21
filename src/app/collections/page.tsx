"use client";

import { useState, useMemo, useEffect } from "react";
import { StorefrontShell } from "@/components/StoreLayout";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const priceRanges = [
    { label: "Under $300", min: 0, max: 299 },
    { label: "$300 - $400", min: 300, max: 400 },
    { label: "$400 - $500", min: 400, max: 500 },
    { label: "Above $500", min: 500, max: 9999 },
];

const fragranceCategories = [
    "Oud", "Rose", "Sandalwood", "Amber", "Leather", "Iris", "Jasmine", "Musk", "Vanilla",
];

const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
    { label: "Highest Rated", value: "rating" },
];

import { perfumes as localPerfumes } from "@/data/perfumes";

export default function CollectionsPage() {
    const [perfumes, setPerfumes] = useState<(typeof localPerfumes[0] & { _id?: string, price: number, rating: number, year: number, image: string, brand: string })[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<(typeof priceRanges)[0] | null>(null);
    const [sortBy, setSortBy] = useState("featured");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [addedId, setAddedId] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                setPerfumes(localPerfumes);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Disable body scroll when mobile filter or sort is open
    useEffect(() => {
        if (mobileFilterOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileFilterOpen]);

    const brands = useMemo(() => Array.from(new Set(perfumes.map((p) => p.brand))), [perfumes]);
    const allOccasions = useMemo(() => Array.from(new Set(perfumes.flatMap((p) => p.occasion))), [perfumes]);
    const genders = ["Masculine", "Feminine", "Unisex"] as const;

    const filtered = useMemo(() => {
        let result = perfumes.filter((p) => {
            if (selectedGender && p.gender !== selectedGender) return false;
            if (selectedBrand && p.brand !== selectedBrand) return false;
            if (selectedOccasion && !p.occasion.includes(selectedOccasion)) return false;
            if (selectedPrice && (p.price < selectedPrice.min || p.price > selectedPrice.max)) return false;
            if (selectedNote) {
                const allNotes = [
                    ...p.scentPyramid.top,
                    ...p.scentPyramid.heart,
                    ...p.scentPyramid.base,
                ].map((n) => n.name.toLowerCase());
                if (!allNotes.some((n) => n.includes(selectedNote.toLowerCase()))) return false;
            }
            return true;
        });

        // Sort
        switch (sortBy) {
            case "price-asc":
                result = [...result].sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result = [...result].sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result = [...result].sort((a, b) => b.rating - a.rating);
                break;
        }

        return result;
    }, [perfumes, selectedGender, selectedBrand, selectedNote, selectedOccasion, selectedPrice, sortBy]);

    const clearFilters = () => {
        setSelectedGender(null);
        setSelectedBrand(null);
        setSelectedNote(null);
        setSelectedOccasion(null);
        setSelectedPrice(null);
    };

    const hasFilters = selectedGender || selectedBrand || selectedNote || selectedOccasion || selectedPrice;

    const handleQuickAdd = async (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        await addToCart(productId, 1);
        setAddedId(productId);
        setTimeout(() => setAddedId(null), 2000);
    };

    const getBadge = (perfume: typeof localPerfumes[0] & { rating?: number; year?: number }) => {
        if (perfume.rating >= 4.8) return { label: "★ Best Seller", className: "badge-bestseller" };
        if (perfume.year >= 2024) return { label: "New", className: "badge-new" };
        return null;
    };

    const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-10">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-warm-gray mb-5 font-sans border-b border-warm-gray/20 pb-2">
                {title}
            </h4>
            <div className="space-y-1">{children}</div>
        </div>
    );

    const FilterButton = ({
        label,
        active,
        onClick,
    }: {
        label: string;
        active: boolean;
        onClick: () => void;
    }) => (
        <button
            onClick={onClick}
            className="group relative flex items-center w-full text-left py-2 transition-all duration-500"
        >
            <span
                className={`text-[13px] tracking-wide transition-colors duration-500 ${active ? "text-charcoal font-medium" : "text-charcoal/50 group-hover:text-charcoal"
                    }`}
            >
                {label}
            </span>
            <span
                className={`absolute left-[-12px] h-[1px] bg-charcoal transition-all duration-500 ease-out ${active ? "w-2 opacity-100" : "w-0 opacity-0 group-hover:w-1 group-hover:opacity-50"
                    }`}
            />
        </button>
    );

    const filtersContent = (
        <div className="pr-6">
            <AnimatePresence>
                {hasFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="overflow-hidden"
                    >
                        <button
                            onClick={clearFilters}
                            className="text-[10px] tracking-[0.2em] uppercase text-charcoal/50 hover:text-charcoal transition-colors duration-300 flex items-center gap-2"
                        >
                            <span className="w-4 h-[1px] bg-charcoal/50" />
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <FilterSection title="Gender">
                {genders.map((g) => (
                    <FilterButton
                        key={g}
                        label={g}
                        active={selectedGender === g}
                        onClick={() => setSelectedGender(selectedGender === g ? null : g)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Fragrance Notes">
                {fragranceCategories.map((note) => (
                    <FilterButton
                        key={note}
                        label={note}
                        active={selectedNote === note}
                        onClick={() => setSelectedNote(selectedNote === note ? null : note)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Occasion">
                {allOccasions.slice(0, 8).map((occ) => (
                    <FilterButton
                        key={occ}
                        label={occ}
                        active={selectedOccasion === occ}
                        onClick={() => setSelectedOccasion(selectedOccasion === occ ? null : occ)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Brand">
                {brands.map((brand) => (
                    <FilterButton
                        key={brand}
                        label={brand}
                        active={selectedBrand === brand}
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    />
                ))}
            </FilterSection>

            <FilterSection title="Price Range">
                {priceRanges.map((range) => (
                    <FilterButton
                        key={range.label}
                        label={range.label}
                        active={selectedPrice?.label === range.label}
                        onClick={() =>
                            setSelectedPrice(selectedPrice?.label === range.label ? null : range)
                        }
                    />
                ))}
            </FilterSection>
        </div>
    );

    // Skeleton loader
    const SkeletonCard = () => (
        <div className="animate-pulse">
            <div className="aspect-[3/4] skeleton mb-5" />
            <div className="flex flex-col items-center gap-2 px-4">
                <div className="h-2.5 w-20 skeleton" />
                <div className="h-4 w-32 skeleton" />
                <div className="h-3 w-16 skeleton mt-1" />
            </div>
        </div>
    );

    return (
        <StorefrontShell>
            {/* Compact Page Title */}
            <section className="pt-24 md:pt-28 pb-4 md:pb-6 bg-offwhite">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                    <div className="flex items-end justify-between">
                        <h1 className="font-serif text-2xl md:text-3xl text-charcoal">
                            Collection
                        </h1>
                        <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal/40 font-sans hidden lg:block">
                            {filtered.length} {filtered.length === 1 ? "Creation" : "Creations"}
                        </p>
                    </div>
                    <div className="w-full h-px bg-border mt-4" />
                </div>
            </section>

            {/* Mobile Controls: Filter + Sort */}
            <div className="lg:hidden px-6 pb-6 bg-offwhite sticky top-[72px] z-30">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileFilterOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 border border-charcoal/20 py-3.5 text-xs tracking-[0.15em] uppercase text-charcoal hover:border-charcoal transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                        Filter {hasFilters ? "•" : ""}
                    </button>
                    <div className="relative flex-1">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="w-full flex items-center justify-center gap-2 border border-charcoal/20 py-3.5 text-xs tracking-[0.15em] uppercase text-charcoal hover:border-charcoal transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-3L16.5 18m0 0L12 13.5m4.5 4.5V4.5" />
                            </svg>
                            Sort
                        </button>
                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className="absolute top-full left-0 right-0 mt-1 bg-offwhite border border-charcoal/10 shadow-lg z-40"
                                >
                                    {sortOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                                            className={`w-full text-left px-4 py-3 text-xs tracking-wider transition-colors ${sortBy === opt.value ? "text-charcoal font-medium bg-cream" : "text-charcoal/60 hover:bg-cream/50"}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <p className="text-[10px] tracking-wider text-charcoal/40 uppercase text-center mt-3">
                    {filtered.length} {filtered.length === 1 ? "Creation" : "Creations"}
                </p>
            </div>

            {/* Mobile Filter Bottom Sheet */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bottom-sheet-overlay lg:hidden"
                            onClick={() => setMobileFilterOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="bottom-sheet lg:hidden"
                        >
                            <div className="bottom-sheet-handle" />
                            <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-border">
                                <h3 className="text-sm tracking-[0.15em] uppercase text-charcoal">Refine</h3>
                                <button
                                    onClick={() => setMobileFilterOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
                                {filtersContent}
                            </div>
                            <div className="px-6 pb-6 pt-2 border-t border-border">
                                <button
                                    onClick={() => setMobileFilterOpen(false)}
                                    className="w-full btn-luxury btn-luxury-dark"
                                >
                                    Show {filtered.length} Results
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <section className="pb-28 md:pb-44 bg-offwhite">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block w-56 flex-shrink-0 pt-2">
                            <div className="sticky top-32">
                                <div className="mb-10 pb-6 border-b border-charcoal/10">
                                    <h2 className="text-xs tracking-[0.3em] uppercase text-charcoal mb-2">Refine</h2>
                                    <p className="text-[10px] tracking-wider text-charcoal/40 uppercase">
                                        {filtered.length} {filtered.length === 1 ? "Creation" : "Creations"}
                                    </p>
                                </div>

                                {/* Desktop Sort */}
                                <div className="mb-10">
                                    <h4 className="text-[10px] tracking-[0.3em] uppercase text-warm-gray mb-5 font-sans border-b border-warm-gray/20 pb-2">
                                        Sort By
                                    </h4>
                                    <div className="space-y-1">
                                        {sortOptions.map((opt) => (
                                            <FilterButton
                                                key={opt.value}
                                                label={opt.label}
                                                active={sortBy === opt.value}
                                                onClick={() => setSortBy(opt.value)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {filtersContent}
                            </div>
                        </aside>

                        {/* Grid */}
                        <div className="flex-1 min-h-[500px]">
                            {loading ? (
                                <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-5 md:gap-y-20 md:gap-x-10">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <SkeletonCard key={i} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-5 md:gap-y-20 md:gap-x-10"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filtered.map((perfume, index) => {
                                            const badge = getBadge(perfume);
                                            return (
                                                <motion.div
                                                    key={perfume.id}
                                                    layout
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{
                                                        duration: 0.7,
                                                        delay: index * 0.06,
                                                        ease: [0.25, 0.46, 0.45, 0.94],
                                                    }}
                                                    className="group"
                                                >
                                                    <Link
                                                        href={`/perfume/${perfume.id}`}
                                                        className="block"
                                                    >
                                                        {/* Image Container */}
                                                        <div className="relative aspect-[3/4] overflow-hidden bg-[#e6e2db] mb-4 md:mb-6">
                                                            <Image
                                                                src={perfume.image}
                                                                alt={perfume.name}
                                                                fill
                                                                className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 33vw"
                                                            />

                                                            {/* Hover Overlay */}
                                                            <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex items-center justify-center">
                                                                <div className="overflow-hidden">
                                                                    <span className="block text-white text-[10px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                                                        View Creation
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Badges */}
                                                            <div className="absolute top-3 left-3 right-3 flex justify-between z-10 pointer-events-none">
                                                                {badge && (
                                                                    <span className={`badge ${badge.className}`}>
                                                                        {badge.label}
                                                                    </span>
                                                                )}
                                                                <span className="badge badge-bestseller ml-auto">
                                                                    {perfume.gender}
                                                                </span>
                                                            </div>

                                                            {/* Quick Add - appears on hover (desktop) */}
                                                            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-10 hidden md:block">
                                                                <motion.button
                                                                    whileTap={{ scale: 0.96 }}
                                                                    onClick={(e) => handleQuickAdd(e, perfume.id!)}
                                                                    className="w-full py-3 text-[10px] tracking-[0.2em] uppercase font-sans glass-dark text-white hover:bg-charcoal transition-colors"
                                                                >
                                                                    {addedId === perfume.id ? "✓ Added" : `Add to Bag — $${perfume.price}`}
                                                                </motion.button>
                                                            </div>
                                                        </div>

                                                        {/* Info */}
                                                        <div className="flex flex-col items-center text-center px-1 md:px-4">
                                                            <p className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-charcoal/50 font-sans mb-2">
                                                                {perfume.brand}
                                                            </p>
                                                            <h3 className="font-serif text-base md:text-xl text-charcoal mb-2 group-hover:text-gold transition-colors duration-500 leading-tight">
                                                                {perfume.name}
                                                            </h3>
                                                            <p className="hidden md:block text-[12px] text-charcoal/50 line-clamp-2 leading-relaxed font-light px-2 mb-3">
                                                                {perfume.description}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-xs tracking-[0.1em] text-charcoal font-medium">
                                                                    ${perfume.price}
                                                                </p>
                                                                <span className="text-[10px] text-gold">
                                                                    {"★".repeat(Math.floor(perfume.rating))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                    {/* Mobile Quick Add */}
                                                    <div className="md:hidden mt-3 px-1">
                                                        <motion.button
                                                            whileTap={{ scale: 0.96 }}
                                                            onClick={(e) => handleQuickAdd(e, perfume.id!)}
                                                            className="w-full py-3 text-[10px] tracking-[0.15em] uppercase font-sans border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-white transition-all duration-300"
                                                        >
                                                            {addedId === perfume.id ? "✓ Added" : "Add to Bag"}
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            )}

                            {!loading && filtered.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center pt-32 pb-48 text-center"
                                >
                                    <div className="w-[1px] h-16 bg-charcoal/20 mb-8" />
                                    <p className="font-serif text-3xl text-charcoal/40 mb-6">
                                        No creations found
                                    </p>
                                    <p className="text-sm text-charcoal/50 max-w-sm mb-8 font-light leading-relaxed">
                                        We couldn&apos;t find any fragrances matching your refined selection.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="text-[10px] tracking-[0.2em] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-all duration-500"
                                    >
                                        Clear all filters
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </StorefrontShell>
    );
}
