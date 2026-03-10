export interface Order {
    id: string;
    customer: string;
    email: string;
    perfume: string;
    quantity: number;
    total: number;
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
    date: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    avatar: string;
    purchases: number;
    totalSpent: number;
    lastOrder: string;
    joinedDate: string;
    status: "Active" | "Inactive";
}

export interface AnalyticsStat {
    label: string;
    value: string;
    change: number; // percentage
    trend: "up" | "down";
}

export interface MonthlySales {
    month: string;
    revenue: number;
    orders: number;
}

export const analyticsStats: AnalyticsStat[] = [
    { label: "Total Revenue", value: "$284,520", change: 12.5, trend: "up" },
    { label: "Orders", value: "1,248", change: 8.2, trend: "up" },
    { label: "Average Order", value: "$385", change: 3.1, trend: "up" },
    { label: "Customers", value: "892", change: -2.4, trend: "down" },
];

export const monthlySales: MonthlySales[] = [
    { month: "Jan", revenue: 18200, orders: 48 },
    { month: "Feb", revenue: 21400, orders: 56 },
    { month: "Mar", revenue: 19800, orders: 52 },
    { month: "Apr", revenue: 24600, orders: 64 },
    { month: "May", revenue: 22100, orders: 58 },
    { month: "Jun", revenue: 28900, orders: 75 },
    { month: "Jul", revenue: 26300, orders: 68 },
    { month: "Aug", revenue: 31200, orders: 81 },
    { month: "Sep", revenue: 29400, orders: 76 },
    { month: "Oct", revenue: 33800, orders: 88 },
    { month: "Nov", revenue: 38500, orders: 100 },
    { month: "Dec", revenue: 42200, orders: 110 },
];

export const orders: Order[] = [
    { id: "ORD-001", customer: "Isabelle Laurent", email: "isabelle@mail.com", perfume: "Noir Absolu", quantity: 1, total: 385, status: "Delivered", date: "2024-12-28" },
    { id: "ORD-002", customer: "Alexander Chen", email: "alex.chen@mail.com", perfume: "Oud Royal", quantity: 1, total: 680, status: "Shipped", date: "2024-12-27" },
    { id: "ORD-003", customer: "Sofia Rosetti", email: "sofia.r@mail.com", perfume: "Rose Impériale", quantity: 2, total: 1020, status: "Processing", date: "2024-12-27" },
    { id: "ORD-004", customer: "James Whitfield", email: "j.whitfield@mail.com", perfume: "Cuir Sauvage", quantity: 1, total: 445, status: "Pending", date: "2024-12-26" },
    { id: "ORD-005", customer: "Amara Okafor", email: "amara.o@mail.com", perfume: "Santal Sacré", quantity: 1, total: 425, status: "Delivered", date: "2024-12-25" },
    { id: "ORD-006", customer: "Lucas Moreau", email: "lucas.m@mail.com", perfume: "Ambre Éternel", quantity: 1, total: 360, status: "Shipped", date: "2024-12-25" },
    { id: "ORD-007", customer: "Elena Petrova", email: "elena.p@mail.com", perfume: "Velvet Dusk", quantity: 1, total: 320, status: "Delivered", date: "2024-12-24" },
    { id: "ORD-008", customer: "Oliver Blackwood", email: "oliver.b@mail.com", perfume: "Bois Précieux", quantity: 1, total: 475, status: "Cancelled", date: "2024-12-24" },
    { id: "ORD-009", customer: "Yuki Tanaka", email: "yuki.t@mail.com", perfume: "Fleur d'Orient", quantity: 2, total: 790, status: "Delivered", date: "2024-12-23" },
    { id: "ORD-010", customer: "Charlotte Dufour", email: "charlotte.d@mail.com", perfume: "Ciel Nude", quantity: 1, total: 280, status: "Processing", date: "2024-12-23" },
    { id: "ORD-011", customer: "Marco Bellini", email: "marco.b@mail.com", perfume: "Océan Mémoire", quantity: 1, total: 295, status: "Shipped", date: "2024-12-22" },
    { id: "ORD-012", customer: "Priya Sharma", email: "priya.s@mail.com", perfume: "Jasmin de Nuit", quantity: 1, total: 340, status: "Pending", date: "2024-12-22" },
];

export const customers: Customer[] = [
    { id: "CUS-001", name: "Isabelle Laurent", email: "isabelle@mail.com", avatar: "IL", purchases: 8, totalSpent: 3240, lastOrder: "2024-12-28", joinedDate: "2023-03-15", status: "Active" },
    { id: "CUS-002", name: "Alexander Chen", email: "alex.chen@mail.com", avatar: "AC", purchases: 12, totalSpent: 5680, lastOrder: "2024-12-27", joinedDate: "2022-11-08", status: "Active" },
    { id: "CUS-003", name: "Sofia Rosetti", email: "sofia.r@mail.com", avatar: "SR", purchases: 5, totalSpent: 2150, lastOrder: "2024-12-27", joinedDate: "2024-01-22", status: "Active" },
    { id: "CUS-004", name: "James Whitfield", email: "j.whitfield@mail.com", avatar: "JW", purchases: 3, totalSpent: 1290, lastOrder: "2024-12-26", joinedDate: "2024-06-10", status: "Active" },
    { id: "CUS-005", name: "Amara Okafor", email: "amara.o@mail.com", avatar: "AO", purchases: 6, totalSpent: 2870, lastOrder: "2024-12-25", joinedDate: "2023-08-05", status: "Active" },
    { id: "CUS-006", name: "Lucas Moreau", email: "lucas.m@mail.com", avatar: "LM", purchases: 4, totalSpent: 1560, lastOrder: "2024-12-25", joinedDate: "2024-02-18", status: "Active" },
    { id: "CUS-007", name: "Elena Petrova", email: "elena.p@mail.com", avatar: "EP", purchases: 9, totalSpent: 4120, lastOrder: "2024-12-24", joinedDate: "2023-01-12", status: "Active" },
    { id: "CUS-008", name: "Oliver Blackwood", email: "oliver.b@mail.com", avatar: "OB", purchases: 2, totalSpent: 860, lastOrder: "2024-12-24", joinedDate: "2024-09-01", status: "Inactive" },
    { id: "CUS-009", name: "Yuki Tanaka", email: "yuki.t@mail.com", avatar: "YT", purchases: 7, totalSpent: 3450, lastOrder: "2024-12-23", joinedDate: "2023-05-20", status: "Active" },
    { id: "CUS-010", name: "Charlotte Dufour", email: "charlotte.d@mail.com", avatar: "CD", purchases: 11, totalSpent: 4890, lastOrder: "2024-12-23", joinedDate: "2022-07-30", status: "Active" },
];

export const popularPerfumes = [
    { name: "Oud Royal", sales: 142, revenue: 96560 },
    { name: "Noir Absolu", sales: 128, revenue: 49280 },
    { name: "Rose Impériale", sales: 95, revenue: 48450 },
    { name: "Bois Précieux", sales: 87, revenue: 41325 },
    { name: "Santal Sacré", sales: 76, revenue: 32300 },
];
