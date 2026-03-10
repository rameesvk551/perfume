export interface FragranceNote {
    name: string;
    intensity: number; // 1-10
}

export interface ScentPyramid {
    top: FragranceNote[];
    heart: FragranceNote[];
    base: FragranceNote[];
}

export interface Perfume {
    id: string;
    name: string;
    brand: string;
    price: number;
    scentPyramid: ScentPyramid;
    longevity: string;
    mood: string[];
    occasion: string[];
    gender: "Masculine" | "Feminine" | "Unisex";
    description: string;
    story: string;
    rating: number;
    image: string;
    collection: string;
    year: number;
}

export interface Collection {
    id: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
}

export const collections: Collection[] = [
    {
        id: "midnight",
        name: "Midnight Collection",
        tagline: "When darkness becomes desire",
        description:
            "A curated selection of nocturnal fragrances that capture the intoxicating allure of the night. Each scent is a whispered secret, a velvet shadow.",
        image: "https://images.unsplash.com/photo-1557170334-a9632e77c572?w=800&q=80",
    },
    {
        id: "garden",
        name: "Garden of Eden",
        tagline: "Nature's most intimate whispers",
        description:
            "Inspired by the world's most exquisite gardens, these fragrances distill the essence of rare blooms and ancient woods into liquid poetry.",
        image: "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=800&q=80",
    },
    {
        id: "voyager",
        name: "The Voyager",
        tagline: "For souls who wander with purpose",
        description:
            "Fragrances born from distant shores and uncharted territories. Each bottle holds a journey — from Moroccan souks to Japanese temples.",
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&q=80",
    },
    {
        id: "timeless",
        name: "Timeless",
        tagline: "Elegance that transcends eras",
        description:
            "The definitive collection of classic compositions reimagined for the modern connoisseur. Scents that will never age.",
        image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=80",
    },
];

export const perfumes: Perfume[] = [
    {
        id: "noir-absolu",
        name: "Noir Absolu",
        brand: "Maison Lumière",
        price: 385,
        scentPyramid: {
            top: [
                { name: "Black Pepper", intensity: 8 },
                { name: "Cardamom", intensity: 6 },
                { name: "Bergamot", intensity: 7 },
            ],
            heart: [
                { name: "Oud", intensity: 9 },
                { name: "Rose Absolute", intensity: 7 },
                { name: "Saffron", intensity: 6 },
            ],
            base: [
                { name: "Amber", intensity: 9 },
                { name: "Musk", intensity: 8 },
                { name: "Sandalwood", intensity: 7 },
            ],
        },
        longevity: "12+ hours",
        mood: ["Mysterious", "Seductive", "Powerful"],
        occasion: ["Evening", "Special Occasion", "Date Night"],
        gender: "Unisex",
        description:
            "A masterpiece of shadow and light. Noir Absolu opens with an electrifying burst of black pepper before descending into a heart of precious oud and damascene rose.",
        story:
            "Born in the dimly lit ateliers of Paris, Noir Absolu was conceived during a single night of creative fervor. Master perfumer Étienne Beaumont spent three years refining the blend, travelling to the forests of Laos for the rarest oud and to the valleys of Bulgaria for the most exquisite rose absolute. The result is a fragrance that captures the very essence of midnight allure — sophisticated, unapologetic, and utterly unforgettable.",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
        collection: "midnight",
        year: 2024,
    },
    {
        id: "velvet-dusk",
        name: "Velvet Dusk",
        brand: "Maison Lumière",
        price: 320,
        scentPyramid: {
            top: [
                { name: "Pink Pepper", intensity: 6 },
                { name: "Pear", intensity: 7 },
                { name: "Mandarin", intensity: 5 },
            ],
            heart: [
                { name: "Iris", intensity: 9 },
                { name: "Violet", intensity: 7 },
                { name: "Orris Butter", intensity: 8 },
            ],
            base: [
                { name: "Cashmere Wood", intensity: 8 },
                { name: "Vanilla Absolute", intensity: 7 },
                { name: "White Musk", intensity: 6 },
            ],
        },
        longevity: "10+ hours",
        mood: ["Romantic", "Ethereal", "Sophisticated"],
        occasion: ["Evening", "Romantic", "Gallery Opening"],
        gender: "Feminine",
        description:
            "Like the last rays of golden light falling on silk, Velvet Dusk is the fragrance of quiet luxury. Iris and violet dance over a foundation of cashmere warmth.",
        story:
            "Inspired by twilight over the Tuscan hills, Velvet Dusk captures the fleeting beauty of day surrendering to night. The iris used is sourced exclusively from the fields of Grasse, harvested only during the narrow window when the flowers reach their peak potency.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
        collection: "midnight",
        year: 2023,
    },
    {
        id: "santal-sacred",
        name: "Santal Sacré",
        brand: "Atelier Nuit",
        price: 425,
        scentPyramid: {
            top: [
                { name: "Elemi", intensity: 5 },
                { name: "Carrot Seed", intensity: 4 },
                { name: "Nutmeg", intensity: 6 },
            ],
            heart: [
                { name: "Sandalwood", intensity: 10 },
                { name: "Papyrus", intensity: 6 },
                { name: "Cedar", intensity: 7 },
            ],
            base: [
                { name: "Leather", intensity: 8 },
                { name: "Tonka Bean", intensity: 7 },
                { name: "Vetiver", intensity: 6 },
            ],
        },
        longevity: "14+ hours",
        mood: ["Meditative", "Grounding", "Sacred"],
        occasion: ["Daily Luxury", "Meditation", "Travel"],
        gender: "Unisex",
        description:
            "A pilgrimage in a bottle. Santal Sacré channels the reverence of ancient temples through the world's finest Mysore sandalwood.",
        story:
            "Created after a year-long journey through India's sacred groves, Santal Sacré is an homage to the endangered Mysore sandalwood. Each bottle contains ethically sourced sandalwood oil aged for seven years, creating a depth and complexity that is simply unmatched.",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1557170334-a9632e77c572?w=600&q=80",
        collection: "voyager",
        year: 2024,
    },
    {
        id: "rose-imperiale",
        name: "Rose Impériale",
        brand: "Maison Lumière",
        price: 510,
        scentPyramid: {
            top: [
                { name: "Lychee", intensity: 6 },
                { name: "Raspberry", intensity: 5 },
                { name: "Bergamot", intensity: 7 },
            ],
            heart: [
                { name: "Damask Rose", intensity: 10 },
                { name: "Peony", intensity: 7 },
                { name: "Magnolia", intensity: 6 },
            ],
            base: [
                { name: "Patchouli", intensity: 8 },
                { name: "White Musk", intensity: 6 },
                { name: "Ambroxan", intensity: 7 },
            ],
        },
        longevity: "8+ hours",
        mood: ["Regal", "Feminine", "Confident"],
        occasion: ["Gala", "Wedding", "Special Occasion"],
        gender: "Feminine",
        description:
            "The queen of roses, reimagined. Rose Impériale is not merely a rose fragrance — it is the definitive statement of floral grandeur.",
        story:
            "Ten thousand hand-picked Damask roses from the May harvest distilled into a single ounce of absolute. Rose Impériale represents the pinnacle of perfumery — where nature's most revered flower meets uncompromising craftsmanship.",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
        collection: "garden",
        year: 2023,
    },
    {
        id: "ambre-eternel",
        name: "Ambre Éternel",
        brand: "Atelier Nuit",
        price: 360,
        scentPyramid: {
            top: [
                { name: "Cinnamon", intensity: 7 },
                { name: "Ginger", intensity: 5 },
                { name: "Saffron", intensity: 8 },
            ],
            heart: [
                { name: "Amber", intensity: 10 },
                { name: "Labdanum", intensity: 8 },
                { name: "Benzoin", intensity: 7 },
            ],
            base: [
                { name: "Vanilla", intensity: 9 },
                { name: "Oud", intensity: 7 },
                { name: "Musk", intensity: 6 },
            ],
        },
        longevity: "16+ hours",
        mood: ["Opulent", "Warm", "Timeless"],
        occasion: ["Winter", "Evening", "Theatre"],
        gender: "Unisex",
        description:
            "Liquid gold for the skin. Ambre Éternel wraps you in a cocoon of warmth that evolves throughout the day into something deeply personal.",
        story:
            "Inspired by the amber trade routes of antiquity, this fragrance blends precious resins collected from three continents. The amber accord at its core took eighteen months to perfect.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
        collection: "timeless",
        year: 2022,
    },
    {
        id: "ocean-memoir",
        name: "Océan Mémoire",
        brand: "Côte Sauvage",
        price: 295,
        scentPyramid: {
            top: [
                { name: "Sea Salt", intensity: 8 },
                { name: "Lemon Zest", intensity: 6 },
                { name: "Juniper", intensity: 5 },
            ],
            heart: [
                { name: "Driftwood", intensity: 7 },
                { name: "Sea Lavender", intensity: 8 },
                { name: "Geranium", intensity: 5 },
            ],
            base: [
                { name: "Ambergris", intensity: 9 },
                { name: "Cedar", intensity: 6 },
                { name: "Musk", intensity: 7 },
            ],
        },
        longevity: "8+ hours",
        mood: ["Fresh", "Contemplative", "Free"],
        occasion: ["Summer", "Daytime", "Beach"],
        gender: "Unisex",
        description:
            "The Atlantic captured in crystal. Océan Mémoire is the scent of salt-kissed skin and endless horizons.",
        story:
            "Born on the wild coast of Brittany, this fragrance captures the primal beauty of the ocean. The ambergris note was developed over two years to replicate the precise scent of morning waves.",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=600&q=80",
        collection: "voyager",
        year: 2024,
    },
    {
        id: "cuir-sauvage",
        name: "Cuir Sauvage",
        brand: "Atelier Nuit",
        price: 445,
        scentPyramid: {
            top: [
                { name: "Whiskey Accord", intensity: 7 },
                { name: "Black Pepper", intensity: 8 },
                { name: "Artemisia", intensity: 5 },
            ],
            heart: [
                { name: "Leather", intensity: 10 },
                { name: "Tobacco", intensity: 8 },
                { name: "Iris", intensity: 5 },
            ],
            base: [
                { name: "Birch Tar", intensity: 7 },
                { name: "Vetiver", intensity: 8 },
                { name: "Opoponax", intensity: 6 },
            ],
        },
        longevity: "14+ hours",
        mood: ["Raw", "Rebellious", "Magnetic"],
        occasion: ["Evening", "Nightlife", "Statement"],
        gender: "Masculine",
        description:
            "Untamed elegance. Cuir Sauvage is leather at its most primal — a fragrance that commands attention without raising its voice.",
        story:
            "Inspired by the leather workshops of Florence, where artisans have been crafting the finest hides for centuries. The whiskey accord was developed in collaboration with a Scottish distillery master.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
        collection: "midnight",
        year: 2023,
    },
    {
        id: "jasmin-nuit",
        name: "Jasmin de Nuit",
        brand: "Côte Sauvage",
        price: 340,
        scentPyramid: {
            top: [
                { name: "Green Leaves", intensity: 5 },
                { name: "Neroli", intensity: 7 },
                { name: "Aldehyde", intensity: 4 },
            ],
            heart: [
                { name: "Night Jasmine", intensity: 10 },
                { name: "Tuberose", intensity: 8 },
                { name: "Ylang-Ylang", intensity: 6 },
            ],
            base: [
                { name: "Benzoin", intensity: 7 },
                { name: "Cashmeran", intensity: 8 },
                { name: "Civet", intensity: 5 },
            ],
        },
        longevity: "10+ hours",
        mood: ["Intoxicating", "Lush", "Nocturnal"],
        occasion: ["Evening", "Date Night", "Summer Nights"],
        gender: "Feminine",
        description:
            "Night-blooming jasmine at the height of its intoxicating power. This is white florals pushed to their most carnal extreme.",
        story:
            "The jasmine absolute in this composition is harvested exclusively at midnight in the gardens of Grasse, when the flowers release their most potent and complex aroma.",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80",
        collection: "garden",
        year: 2024,
    },
    {
        id: "bois-precieux",
        name: "Bois Précieux",
        brand: "Maison Lumière",
        price: 475,
        scentPyramid: {
            top: [
                { name: "Pink Pepper", intensity: 6 },
                { name: "Davana", intensity: 5 },
                { name: "Bergamot", intensity: 7 },
            ],
            heart: [
                { name: "Atlas Cedar", intensity: 9 },
                { name: "Guaiac Wood", intensity: 8 },
                { name: "Cypress", intensity: 6 },
            ],
            base: [
                { name: "Amber", intensity: 8 },
                { name: "Musks", intensity: 7 },
                { name: "Moss", intensity: 6 },
            ],
        },
        longevity: "12+ hours",
        mood: ["Refined", "Architectural", "Serene"],
        occasion: ["Business", "Daily Luxury", "Art Gallery"],
        gender: "Unisex",
        description:
            "A cathedral of wood. Bois Précieux celebrates the noble beauty of rare woods in a composition of architectural precision.",
        story:
            "Each ingredient was selected during expeditions to ancient forests — Atlas cedars from Morocco, guaiac wood from Paraguay, and cypress from Provence. The result is a fragrance of cathedral-like grandeur.",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
        collection: "timeless",
        year: 2022,
    },
    {
        id: "fleur-orient",
        name: "Fleur d'Orient",
        brand: "Atelier Nuit",
        price: 395,
        scentPyramid: {
            top: [
                { name: "Turkish Rose", intensity: 8 },
                { name: "Cardamom", intensity: 6 },
                { name: "Saffron", intensity: 7 },
            ],
            heart: [
                { name: "Oud", intensity: 9 },
                { name: "Incense", intensity: 8 },
                { name: "Myrrh", intensity: 7 },
            ],
            base: [
                { name: "Amber", intensity: 9 },
                { name: "Musk", intensity: 7 },
                { name: "Sandalwood", intensity: 8 },
            ],
        },
        longevity: "14+ hours",
        mood: ["Exotic", "Mystical", "Opulent"],
        occasion: ["Evening", "Special Occasion", "Celebration"],
        gender: "Unisex",
        description:
            "Where East meets West in an embrace of smoke and flowers. Fleur d'Orient is the fragrance of ancient rituals and modern luxury.",
        story:
            "Conceived during travels through Istanbul's Grand Bazaar, this fragrance marries Ottoman rose traditions with Arabian oud. The incense note recreates the exact aroma of centuries-old mosques.",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
        collection: "voyager",
        year: 2023,
    },
    {
        id: "ciel-nude",
        name: "Ciel Nude",
        brand: "Côte Sauvage",
        price: 280,
        scentPyramid: {
            top: [
                { name: "Pear", intensity: 6 },
                { name: "Pink Pepper", intensity: 4 },
                { name: "Bergamot", intensity: 7 },
            ],
            heart: [
                { name: "Peony", intensity: 7 },
                { name: "Lily of the Valley", intensity: 8 },
                { name: "White Tea", intensity: 6 },
            ],
            base: [
                { name: "White Musks", intensity: 9 },
                { name: "Cedarwood", intensity: 5 },
                { name: "Ambrette", intensity: 6 },
            ],
        },
        longevity: "6+ hours",
        mood: ["Clean", "Luminous", "Intimate"],
        occasion: ["Daily", "Brunch", "Spring"],
        gender: "Feminine",
        description:
            "The scent of bare, sun-kissed skin elevated to art. Ciel Nude is the fragrance equivalent of a whisper.",
        story:
            "Created to replicate the most beautiful absence of scent — the clean warmth of skin itself. Took three years and 600 iterations to achieve this deceptive simplicity.",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
        collection: "garden",
        year: 2024,
    },
    {
        id: "oud-royal",
        name: "Oud Royal",
        brand: "Maison Lumière",
        price: 680,
        scentPyramid: {
            top: [
                { name: "Saffron", intensity: 8 },
                { name: "Elemi", intensity: 5 },
                { name: "Lemon", intensity: 4 },
            ],
            heart: [
                { name: "Aged Oud", intensity: 10 },
                { name: "Bulgarian Rose", intensity: 7 },
                { name: "Orris", intensity: 6 },
            ],
            base: [
                { name: "Royal Amber", intensity: 10 },
                { name: "Civet", intensity: 5 },
                { name: "Sandalwood", intensity: 8 },
            ],
        },
        longevity: "18+ hours",
        mood: ["Regal", "Commanding", "Luxurious"],
        occasion: ["Black Tie", "Gala", "Exclusive Event"],
        gender: "Unisex",
        description:
            "The crown jewel of our collection. Oud Royal is composed with the rarest oud on earth — aged for over fifteen years in the jungles of Assam.",
        story:
            "Only 25 bottles are produced each year, each numbered and signed by the master perfumer. The oud at the heart of this composition is valued at over $50,000 per kilogram, making Oud Royal one of the most exclusive fragrances ever created.",
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80",
        collection: "timeless",
        year: 2021,
    },
];

export const brands = [...new Set(perfumes.map((p) => p.brand))];
export const allMoods = [...new Set(perfumes.flatMap((p) => p.mood))];
export const allOccasions = [...new Set(perfumes.flatMap((p) => p.occasion))];
export const genders = ["Masculine", "Feminine", "Unisex"] as const;
