"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
