"use client";

import { Navbar } from "@/components/Navbar";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
}
