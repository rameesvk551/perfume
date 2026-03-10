"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface AddToCartProps {
    productId: string;
    price: number;
}

export function AddToCart({ productId, price }: AddToCartProps) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAdd = async () => {
        await addToCart(productId, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    return (
        <div className="space-y-6">
            {/* Quantity */}
            <div className="flex items-center gap-6">
                <p className="text-xs tracking-[0.2em] uppercase text-warm-gray font-sans">
                    Quantity
                </p>
                <div className="flex items-center border border-border">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors"
                    >
                        −
                    </button>
                    <span className="w-12 h-12 flex items-center justify-center text-sm text-charcoal border-x border-border">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="w-full btn-luxury btn-luxury-dark relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {added ? (
                        <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Added to Bag
                        </motion.span>
                    ) : (
                        <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            Add to Bag — ${price * quantity}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Complimentary */}
            <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                    <span className="text-xs text-warm-gray">
                        Complimentary gift wrapping
                    </span>
                </div>
                <div className="w-[1px] h-3 bg-border" />
                <span className="text-xs text-warm-gray">Free shipping</span>
            </div>
        </div>
    );
}
