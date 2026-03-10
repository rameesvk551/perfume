"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
    product: {
        _id: string;
        name: string;
        price: number;
        image: string;
        brand: string;
    };
    quantity: number;
    _id: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (productId: string, quantity: number) => Promise<void>;
    updateQuantity: (id: string, qty: number) => Promise<void>;
    removeFromCart: (id: string) => Promise<void>;
    cartCount: number;
    cartTotal: number;
    loading: boolean;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType>({
    items: [],
    addToCart: async () => { },
    updateQuantity: async () => { },
    removeFromCart: async () => { },
    cartCount: 0,
    cartTotal: 0,
    loading: true,
    isCartOpen: false,
    setIsCartOpen: () => { },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { token, user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        if (token) {
            fetchCart();
        } else {
            setItems([]);
            setLoading(false);
        }
    }, [token]);

    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setItems(data.items || []);
            }
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: string, quantity: number) => {
        if (!token) {
            alert("Please login to add items to your cart.");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity }),
            });
            if (res.ok) {
                const data = await res.json();
                setItems(data.items);
                setIsCartOpen(true);
            }
        } catch (error) {
            console.error("Failed to add to cart", error);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        if (!token) return;
        try {
            const res = await fetch("http://localhost:5000/api/cart/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity }),
            });
            if (res.ok) {
                const data = await res.json();
                setItems(data.items);
            }
        } catch (error) {
            console.error("Failed to update cart", error);
        }
    };

    const removeFromCart = async (productId: string) => {
        if (!token) return;
        try {
            const res = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setItems(data.items);
            }
        } catch (error) {
            console.error("Failed to remove from cart", error);
        }
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                updateQuantity,
                removeFromCart,
                cartCount,
                cartTotal,
                loading,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
