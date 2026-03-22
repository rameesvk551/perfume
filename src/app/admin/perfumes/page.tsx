"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { perfumes as staticPerfumes } from "@/data/perfumes";

interface Perfume {
    _id?: string;
    id?: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    collectionName?: string;
    collection?: string;
    longevity?: string;
    gender: string;
    image: string;
    scentPyramid?: { top?: { name: string }[]; heart?: { name: string }[]; base?: { name: string }[] };
    rating?: number;
    year?: number;
    story?: string;
    occasion?: string[];
    mood?: string[];
}

export default function AdminPerfumesPage() {
    const [perfumes, setPerfumes] = useState<Perfume[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        collectionName: "",
        longevity: "",
        gender: "Unisex",
        description: "",
        notes: "",
        image: ""
    });

    const fetchPerfumes = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const custom = JSON.parse(localStorage.getItem("perfume_custom_products") || "[]");
            setPerfumes([...custom, ...staticPerfumes]);
        } catch (error) {
            console.error("Failed to load perfumes", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerfumes();
    }, []);

    const handleEdit = (perfume: Perfume) => {
        setEditingId(perfume._id || perfume.id || null);
        const topNotes = perfume.scentPyramid?.top?.map((n: {name: string}) => n.name).join(", ") || "";
        setFormData({
            name: perfume.name,
            brand: perfume.brand,
            price: perfume.price.toString(),
            collectionName: perfume.collectionName || perfume.collection || "",
            longevity: perfume.longevity || "",
            gender: perfume.gender || "Unisex",
            description: perfume.description,
            notes: topNotes,
            image: perfume.image
        });
        setShowForm(true);
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Are you sure you want to delete this perfume?")) return;
        if (staticPerfumes.find((p: Perfume) => p.id === id || p._id === id)) {
            alert("Cannot delete static preset perfumes.");
            return;
        }
        try {
            const custom = JSON.parse(localStorage.getItem("perfume_custom_products") || "[]");
            const updated = custom.filter((p: Perfume) => p._id !== id && p.id !== id);
            localStorage.setItem("perfume_custom_products", JSON.stringify(updated));
            fetchPerfumes();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        const topNotes = formData.notes.split(",").filter(n => n.trim() !== "").map(n => ({
            name: n.trim(),
            intensity: 7
        }));

        const payload = {
            ...formData,
            _id: editingId || Math.random().toString(36).substring(2, 10),
            id: editingId || Math.random().toString(36).substring(2, 10),
            price: Number(formData.price),
            year: new Date().getFullYear(),
            story: formData.description,
            scentPyramid: { top: topNotes, heart: [], base: [] },
            image: formData.image || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"
        };

        try {
            const custom = JSON.parse(localStorage.getItem("perfume_custom_products") || "[]");
            if (editingId) {
                if (staticPerfumes.find((p: Perfume) => p.id === editingId || p._id === editingId)) {
                    alert("Cannot edit static preset perfumes.");
                    return;
                }
                const index = custom.findIndex((p: Perfume) => p._id === editingId || p.id === editingId);
                if (index > -1) {
                    custom[index] = payload;
                }
            } else {
                custom.push(payload);
            }
            localStorage.setItem("perfume_custom_products", JSON.stringify(custom));

            setShowForm(false);
            setEditingId(null);
            setFormData({ name: "", brand: "", price: "", collectionName: "", longevity: "", gender: "Unisex", description: "", notes: "", image: "" });
            fetchPerfumes();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="p-8 text-warm-gray text-xs tracking-widest uppercase animate-pulse">Loading Perfumes...</div>;

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-10"
            >
                <div>
                    <h1 className="font-serif text-3xl text-charcoal mb-1">Perfumes</h1>
                    <p className="text-sm text-warm-gray">
                        Manage your fragrance collection
                    </p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (!showForm) {
                            setEditingId(null);
                            setFormData({ name: "", brand: "", price: "", collectionName: "", longevity: "", gender: "Unisex", description: "", notes: "", image: "" });
                        }
                    }}
                    className="btn-luxury btn-luxury-dark text-xs"
                >
                    {showForm ? "Cancel" : "Add Perfume"}
                </button>
            </motion.div>

            {/* Add/Edit Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden mb-10"
                    >
                        <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                            <h3 className="font-serif text-xl text-charcoal mb-6">
                                {editingId ? "Edit Perfume" : "New Perfume"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">Name</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Noir Absolu" className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">Brand</label>
                                    <input type="text" value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} placeholder="e.g. Maison Lumière" className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">Price ($)</label>
                                    <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="e.g. 385" className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">Category (Collection)</label>
                                    <input type="text" value={formData.collectionName} onChange={e => setFormData({ ...formData, collectionName: e.target.value })} placeholder="e.g. Midnight Collection" className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">Longevity</label>
                                    <input type="text" value={formData.longevity} onChange={e => setFormData({ ...formData, longevity: e.target.value })} placeholder="e.g. 12+ hours" className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">Gender</label>
                                    <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal focus:outline-none focus:border-gold/50 transition-colors duration-300">
                                        <option value="Unisex">Unisex</option>
                                        <option value="Masculine">Masculine</option>
                                        <option value="Feminine">Feminine</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="A masterpiece of shadow and light..."
                                        className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                                        Fragrance Notes (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.notes}
                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="e.g. Oud, Rose Absolute, Amber, Musk"
                                        className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs tracking-[0.15em] uppercase text-warm-gray mb-2">
                                        Image URL
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-4 py-3 bg-[#f8f7f5] border border-border/50 rounded-lg text-sm text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/50 transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button onClick={handleSubmit} className="btn-luxury btn-luxury-gold text-xs">
                                    {editingId ? "Update Perfume" : "Create Perfume"}
                                </button>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="btn-luxury btn-luxury-outline text-xs"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Perfume List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border/30">
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Product
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Brand
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Price
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Gender
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Rating
                                </th>
                                <th className="text-left px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-warm-gray font-normal">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {perfumes.map((perfume, i) => (
                                <motion.tr
                                    key={perfume._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                                    className="border-b border-border/20 hover:bg-cream/30 transition-colors duration-300"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-14 relative rounded-md overflow-hidden bg-cream flex-shrink-0">
                                                <Image
                                                    src={perfume.image || "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80"}
                                                    alt={perfume.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="48px"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm text-charcoal font-medium">
                                                    {perfume.name}
                                                </p>
                                                <p className="text-xs text-warm-gray line-clamp-1 max-w-xs">
                                                    {perfume.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal/70">
                                        {perfume.brand}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-charcoal">
                                        ${perfume.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-charcoal/60 bg-cream px-2.5 py-1 rounded-full">
                                            {perfume.gender}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-gold text-sm">★</span>
                                            <span className="text-sm text-charcoal">
                                                {perfume.rating || 0}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleEdit(perfume)}
                                                className="text-xs text-charcoal/40 hover:text-gold transition-colors duration-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(perfume._id)}
                                                className="text-xs text-charcoal/40 hover:text-red-500 transition-colors duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
