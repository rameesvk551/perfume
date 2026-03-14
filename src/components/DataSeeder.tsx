"use client";

import { useEffect } from "react";
import { perfumes } from "@/data/perfumes";

export function DataSeeder() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const hasSeeded = localStorage.getItem("perfume_seeded");
        if (hasSeeded) return;

        // Seed Users
        const users = [
            {
                _id: "u_admin1",
                name: "Admin User",
                email: "admin@maisonlumiere.com",
                password: "password123",
                role: "admin",
                createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: "u_alice",
                name: "Alice Carter",
                email: "alice@example.com",
                password: "password123",
                role: "user",
                createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: "u_bob",
                name: "Bob Smith",
                email: "bob@example.com",
                password: "password123",
                role: "user",
                createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: "u_clara",
                name: "Clara Laurent",
                email: "clara@example.com",
                password: "password123",
                role: "user",
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: "u_david",
                name: "David Rossi",
                email: "david@example.com",
                password: "password123",
                role: "user",
                createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: "u_emma",
                name: "Emma Blanchet",
                email: "emma@example.com",
                password: "password123",
                role: "user",
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                _id: "u_lucas",
                name: "Lucas Dubois",
                email: "lucas@example.com",
                password: "password123",
                role: "user",
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            },
        ];
        localStorage.setItem("perfume_users", JSON.stringify(users));

        // Seed Orders
        const getRandomPerfume = () => perfumes[Math.floor(Math.random() * perfumes.length)];
        const statuses = ["Delivered", "Delivered", "Delivered", "Shipped", "Processing", "Pending"];

        const orders = [];
        for (let i = 0; i < 25; i++) {
            // Pick a non-admin user
            const user = users[Math.floor(Math.random() * (users.length - 1)) + 1];
            const numberOfItems = Math.floor(Math.random() * 3) + 1;
            const orderItems = [];
            let totalPrice = 0;

            for (let j = 0; j < numberOfItems; j++) {
                const item = getRandomPerfume();
                const qty = Math.floor(Math.random() * 2) + 1;
                orderItems.push({
                    _id: item.id,
                    name: item.name,
                    qty,
                    price: item.price,
                    image: item.image,
                });
                totalPrice += item.price * qty;
            }

            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const daysAgo = Math.floor(Math.random() * 60);
            const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

            orders.push({
                _id: Math.random().toString(36).substring(2, 10),
                createdAt,
                status,
                isDelivered: status === "Delivered",
                isPaid: true,
                totalPrice,
                userId: user._id,
                userEmail: user.email,
                orderItems,
                shippingAddress: {
                    address: "123 Fragrance Lane",
                    city: "Paris",
                    postalCode: "75001",
                    country: "France",
                },
            });
        }

        // Sort orders from newest to oldest
        orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        localStorage.setItem("perfume_orders", JSON.stringify(orders));

        // Seed Custom Products
        const customProducts = [
            {
                _id: "custom_1",
                id: "custom_1",
                name: "L'Édition Limitée",
                brand: "Maison Lumière",
                price: 850,
                collectionName: "Midnight Collection",
                longevity: "24+ hours",
                gender: "Unisex",
                description: "An incredibly rare composition featuring notes harvested only once every decade. A true collector's masterpiece.",
                scentPyramid: {
                    top: [{ name: "White Truffle", intensity: 8 }, { name: "Saffron", intensity: 9 }],
                    heart: [{ name: "Black Orchid", intensity: 10 }],
                    base: [{ name: "Aged Oud", intensity: 9 }]
                },
                year: 2024,
                story: "Crafted exclusively for our most distinguished clientele, this limited edition represents the pinnacle of olfactory artistry.",
                image: "https://images.unsplash.com/photo-1594913785160-2646c0d0fe23?w=600&q=80",
                rating: 5.0
            }
        ];
        localStorage.setItem("perfume_custom_products", JSON.stringify(customProducts));

        localStorage.setItem("perfume_seeded", "true");
    }, []);

    return null;
}
