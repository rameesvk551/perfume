"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { StorefrontShell } from "@/components/StoreLayout";
import Image from "next/image";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, cartTotal, loading: cartLoading } = useCart();
    const { token, user, loading: authLoading } = useAuth();
    const router = useRouter();

    const [address, setAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [placingOrder, setPlacingOrder] = useState(false);

    useEffect(() => {
        // Mock Razorpay load removed
    }, []);

    if (authLoading || cartLoading) {
        return (
            <StorefrontShell>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <span className="text-charcoal/50 text-xs tracking-widest uppercase animate-pulse">Loading checkout...</span>
                </div>
            </StorefrontShell>
        );
    }

    if (!token) {
        return (
            <StorefrontShell>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <h2 className="font-serif text-3xl text-charcoal mb-4">Sign In Required</h2>
                    <p className="text-charcoal/60 mb-8 max-w-sm">Please sign in to your account to complete your purchase securely.</p>
                    <button onClick={() => router.push("/")} className="btn-luxury btn-luxury-dark w-48">Return Home</button>
                </div>
            </StorefrontShell>
        );
    }

    if (items.length === 0) {
        return (
            <StorefrontShell>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <h2 className="font-serif text-3xl text-charcoal mb-4">Your Bag is Empty</h2>
                    <p className="text-charcoal/60 mb-8 max-w-sm">Add some exquisite creations to your bag before proceeding to checkout.</p>
                    <button onClick={() => router.push("/collections")} className="btn-luxury btn-luxury-dark w-48">Discover</button>
                </div>
            </StorefrontShell>
        );
    }

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setPlacingOrder(true);

        try {
            // Simulate processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newOrder = {
                _id: Math.random().toString(36).substring(2, 10),
                createdAt: new Date().toISOString(),
                status: "Processing",
                isDelivered: false,
                isPaid: true,
                totalPrice: cartTotal,
                userId: user?._id || "",
                userEmail: user?.email || "",
                orderItems: items.map(i => ({
                    _id: i.product._id,
                    name: i.product.name,
                    qty: i.quantity,
                    price: i.product.price,
                    image: i.product.image
                })),
                shippingAddress: address
            };

            const existingOrders = JSON.parse(localStorage.getItem("perfume_orders") || "[]");
            existingOrders.push(newOrder);
            localStorage.setItem("perfume_orders", JSON.stringify(existingOrders));

            alert("Payment Successful! Your order has been placed.");
            localStorage.removeItem("perfume_cart");
            router.push("/");
            setTimeout(() => { window.location.reload() }, 500);

        } catch (error: any) {
            console.error(error);
            alert("Failed to place order.");
        } finally {
            setPlacingOrder(false);
        }
    };

    return (
        <StorefrontShell>
            <section className="pt-28 md:pt-40 pb-20 md:pb-32 bg-offwhite min-h-[80vh]">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-sans">Secure Checkout</p>
                        <h1 className="font-serif text-4xl md:text-5xl text-charcoal">Complete Your Order</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                        {/* Left: Shipping Form */}
                        <div className="flex-1">
                            <h2 className="text-lg font-serif text-charcoal mb-8 border-b border-border pb-4">Shipping Details</h2>
                            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        required
                                        value={address.address}
                                        onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                        className="w-full border border-border p-3 outline-none focus:border-charcoal bg-transparent"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">City</label>
                                        <input
                                            type="text"
                                            required
                                            value={address.city}
                                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                            className="w-full border border-border p-3 outline-none focus:border-charcoal bg-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            required
                                            value={address.postalCode}
                                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                                            className="w-full border border-border p-3 outline-none focus:border-charcoal bg-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs tracking-wider uppercase text-charcoal/70 mb-2">Country</label>
                                    <input
                                        type="text"
                                        required
                                        value={address.country}
                                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                        className="w-full border border-border p-3 outline-none focus:border-charcoal bg-transparent"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="w-full lg:w-[400px]">
                            <div className="bg-white p-8 border border-border">
                                <h2 className="text-lg font-serif text-charcoal mb-8 border-b border-border pb-4">Order Summary</h2>

                                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div key={item._id} className="flex gap-4">
                                            <div className="relative w-16 aspect-[3/4] bg-cream">
                                                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-serif text-charcoal text-sm">{item.product.name}</p>
                                                <p className="text-[10px] tracking-wider uppercase text-charcoal/50 mt-1">Qty: {item.quantity}</p>
                                                <p className="text-xs text-charcoal mt-1">${item.product.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 border-t border-border pt-6 mb-8 text-sm">
                                    <div className="flex justify-between text-charcoal/70">
                                        <span>Subtotal</span>
                                        <span>${cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-charcoal/70">
                                        <span>Shipping</span>
                                        <span>Complimentary</span>
                                    </div>
                                    <div className="flex justify-between font-serif text-xl text-charcoal pt-4 border-t border-border">
                                        <span>Total</span>
                                        <span>${cartTotal}</span>
                                    </div>
                                </div>

                                <button
                                    form="checkout-form"
                                    type="submit"
                                    disabled={placingOrder}
                                    className="w-full btn-luxury btn-luxury-dark"
                                >
                                    {placingOrder ? "Processing..." : "Place Order & Pay"}
                                </button>

                                <p className="text-[10px] text-charcoal/40 text-center mt-6">
                                    By placing this order, you agree to our Terms of Use and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </StorefrontShell>
    );
}
