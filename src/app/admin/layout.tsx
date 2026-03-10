"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#f8f7f5]">
            <AdminSidebar />
            <main className="ml-64 transition-all duration-500">
                <div className="p-8 md:p-10 max-w-[1400px]">
                    {children}
                </div>
            </main>
        </div>
    );
}
