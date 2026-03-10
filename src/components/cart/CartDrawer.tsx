"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
    const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-offwhite shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="font-serif text-2xl text-charcoal">Your Bag</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-charcoal/50 hover:text-charcoal transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <p className="font-serif text-2xl text-charcoal/40 mb-4">Your bag is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-xs tracking-[0.2em] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item._id} className="flex gap-6">
                                        {/* Image */}
                                        <div className="relative w-24 aspect-[3/4] bg-cream flex-shrink-0">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-[10px] tracking-[0.2em] uppercase text-charcoal/50 mb-1">
                                                        {item.product.brand}
                                                    </p>
                                                    <h3 className="font-serif text-lg text-charcoal">{item.product.name}</h3>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product._id)}
                                                    className="text-charcoal/40 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <p className="text-sm text-charcoal font-light mb-4">${item.product.price}</p>

                                            <div className="mt-auto flex items-center border border-border w-max">
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                                                    className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 h-8 flex items-center justify-center text-xs text-charcoal border-x border-border">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-charcoal/50 hover:text-charcoal"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-border bg-white">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-sm tracking-wider uppercase text-charcoal/70">Subtotal</span>
                                    <span className="font-serif text-2xl text-charcoal">${cartTotal}</span>
                                </div>
                                <p className="text-xs text-charcoal/50 mb-6 text-center">
                                    Complimentary shipping and gift wrapping included.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="btn-luxury btn-luxury-dark w-full text-center block"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
