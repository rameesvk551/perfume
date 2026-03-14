import { perfumes as localPerfumes } from "@/data/perfumes";
import PerfumeClient from "./PerfumeClient";

export async function generateStaticParams() {
    return localPerfumes.map((perfume: any) => ({
        id: perfume.id.toString(),
    }));
}

export default async function PerfumePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <PerfumeClient id={id} />;
}
