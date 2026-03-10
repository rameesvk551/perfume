"use client";

import { useState, useMemo, useEffect } from "react";
import { StorefrontShell } from "@/components/StoreLayout";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const priceRanges = [
    { label: "Under $300", min: 0, max: 299 },
    { label: "$300 - $400", min: 300, max: 400 },
    { label: "$400 - $500", min: 400, max: 500 },
    { label: "Above $500", min: 500, max: 9999 },
];

const fragranceCategories = [
    "Oud",
    "Rose",
    "Sandalwood",
    "Amber",
    "Leather",
    "Iris",
    "Jasmine",
    "Musk",
    "Vanilla",
];

export default function CollectionsPage() {
    const [perfumes, setPerfumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedNote, setSelectedNote] = useState<string | null>(null);
    const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<(typeof priceRanges)[0] | null>(null);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                // Next.js uses 'id' but Mongo provides '_id', let's map it
                const formattedData = data.map((p: any) => ({ ...p, id: p._id }));
                setPerfumes(formattedData);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const brands = useMemo(() => Array.from(new Set(perfumes.map((p) => p.brand))), [perfumes]);
    const allOccasions = useMemo(() => Array.from(new Set(perfumes.flatMap((p) => p.occasion))), [perfumes]);
    const genders = ["Masculine", "Feminine", "Unisex"] as const;

    const filtered = useMemo(() => {
        return perfumes.filter((p) => {
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
    }, [selectedGender, selectedBrand, selectedNote, selectedOccasion, selectedPrice]);

    const clearFilters = () => {
        setSelectedGender(null);
        setSelectedBrand(null);
        setSelectedNote(null);
        setSelectedOccasion(null);
        setSelectedPrice(null);
    };

    const hasFilters = selectedGender || selectedBrand || selectedNote || selectedOccasion || selectedPrice;

    const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="mb-12">
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-warm-gray mb-6 font-sans border-b border-warm-gray/20 pb-2">
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
            className={`group relative flex items-center w-full text-left py-2 transition-all duration-500`}
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

    return (
        <StorefrontShell>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-offwhite overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cream blur-[120px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cream blur-[100px]" />
                </div>

                <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-charcoal/60 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-8 font-sans"
                    >
                        L'Art de Vivre
                    </motion.p>

                    <div className="overflow-hidden pb-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="font-serif text-5xl sm:text-7xl md:text-[6rem] lg:text-[7.5rem] leading-[0.9] text-charcoal mb-8"
                        >
                            <span className="block italic font-light pr-4 md:pr-12 md:-ml-12 text-warm-gray/80">The</span>
                            Collection
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="text-charcoal/70 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed tracking-wide"
                    >
                        A curated archive of the world's most exceptional olfactory creations.
                        Discover masterpieces crafted from the rarest ingredients.
                    </motion.p>
                </div>
            </section>

            {/* Mobile filter toggle */}
            <div className="lg:hidden px-6 pb-8 bg-offwhite sticky top-[72px] z-30">
                <button
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="w-full flex items-center justify-between border-b border-charcoal/20 py-4 text-xs tracking-[0.2em] uppercase text-charcoal hover:border-charcoal transition-colors"
                >
                    <span>{mobileFilterOpen ? "Hide Filters" : "Filter Collection"}</span>
                    <span className="text-charcoal/50 text-[10px]">
                        {filtered.length} Results
                    </span>
                </button>
            </div>

            {/* Main Content */}
            <section className="pb-32 md:pb-48 bg-offwhite">
                <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block w-56 flex-shrink-0 pt-2">
                            <div className="sticky top-32">
                                <div className="mb-12 pb-6 border-b border-charcoal/10">
                                    <h2 className="text-xs tracking-[0.3em] uppercase text-charcoal mb-2">Refine</h2>
                                    <p className="text-[10px] tracking-wider text-charcoal/40 uppercase">
                                        {filtered.length} {filtered.length === 1 ? 'Creation' : 'Creations'}
                                    </p>
                                </div>
                                {filtersContent}
                            </div>
                        </aside>

                        {/* Sidebar - Mobile */}
                        <AnimatePresence>
                            {mobileFilterOpen && (
                                <motion.aside
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="lg:hidden overflow-hidden bg-offwhite"
                                >
                                    <div className="pt-4 pb-12">
                                        {filtersContent}
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>

                        {/* Grid */}
                        <div className="flex-1 min-h-[500px]">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-charcoal/50 text-xs tracking-widest uppercase animate-pulse">Loading collection...</span>
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8 md:gap-y-24 md:gap-x-12"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filtered.map((perfume, index) => (
                                            <motion.div
                                                key={perfume.id}
                                                layout
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: index * 0.08,
                                                    ease: [0.25, 0.46, 0.45, 0.94],
                                                }}
                                                className="group"
                                            >
                                                <Link
                                                    href={`/perfume/${perfume.id}`}
                                                    className="block"
                                                >
                                                    {/* Image Container */}
                                                    <div className="relative aspect-[3/4] overflow-hidden bg-[#e6e2db] mb-6">
                                                        <Image
                                                            src={perfume.image}
                                                            alt={perfume.name}
                                                            fill
                                                            className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 33vw"
                                                        />

                                                        {/* Luxury Hover Overlay */}
                                                        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex items-center justify-center">
                                                            <div className="overflow-hidden">
                                                                <span className="block text-white text-[10px] tracking-[0.4em] uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                                                    View Creation
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Top Tags */}
                                                        <div className="absolute top-4 left-4 right-4 flex justify-between z-10 pointer-events-none">
                                                            <span className="text-[9px] tracking-[0.25em] uppercase text-charcoal/70 bg-white/80 px-3 py-1.5 backdrop-blur-md">
                                                                {perfume.gender}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex flex-col items-center text-center px-4">
                                                        <p className="text-[10px] tracking-[0.25em] uppercase text-charcoal/50 font-sans mb-3">
                                                            {perfume.brand}
                                                        </p>
                                                        <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors duration-500">
                                                            {perfume.name}
                                                        </h3>
                                                        <p className="text-[13px] text-charcoal/60 line-clamp-2 leading-relaxed font-light px-2 mb-4">
                                                            {perfume.description}
                                                        </p>
                                                        <p className="text-xs tracking-[0.1em] text-charcoal">
                                                            ${perfume.price}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
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
                                        We couldn't find any fragrances matching your refined selection.
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
