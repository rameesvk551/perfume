"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { perfumes } from "@/data/perfumes";

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
    // const { token, user } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("perfume_cart");
            if (saved) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setItems(JSON.parse(saved));
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && typeof window !== "undefined") {
            localStorage.setItem("perfume_cart", JSON.stringify(items));
        }
    }, [items, loading]);

    const addToCart = async (productId: string, quantity: number) => {
        const product = perfumes.find((p) => p.id === productId);
        if (!product) return;

        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product._id === productId);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product._id === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [
                ...prevItems,
                {
                    _id: Math.random().toString(36).substr(2, 9),
                    product: {
                        _id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        brand: product.brand,
                    },
                    quantity,
                },
            ];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.product._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = async (productId: string) => {
        setItems((prevItems) =>
            prevItems.filter((item) => item.product._id !== productId)
        );
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
