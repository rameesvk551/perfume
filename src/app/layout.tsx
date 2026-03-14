import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { DataSeeder } from "@/components/DataSeeder";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Lumière — Luxury Perfumery",
  description:
    "Discover the art of fine perfumery. Maison Lumière creates exceptional fragrances from the world's rarest ingredients.",
  keywords: [
    "luxury perfume",
    "fine fragrance",
    "niche perfumery",
    "artisanal scents",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <DataSeeder />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
