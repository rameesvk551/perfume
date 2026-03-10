import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-charcoal text-white/70">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="font-serif text-2xl tracking-[0.15em] text-white uppercase mb-6">
                            Maison
                            <span className="text-gold ml-1">Lumière</span>
                        </h3>
                        <p className="text-sm leading-relaxed text-white/50 max-w-xs">
                            The art of fine perfumery since 1887. Each fragrance is a chapter
                            in an ongoing story of beauty, craftsmanship, and obsession.
                        </p>
                    </div>

                    {/* Collections */}
                    <div>
                        <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-8 font-sans">
                            Collections
                        </h4>
                        <ul className="space-y-4">
                            {["Midnight", "Garden of Eden", "The Voyager", "Timeless"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="/collections"
                                            className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Maison */}
                    <div>
                        <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-8 font-sans">
                            Maison
                        </h4>
                        <ul className="space-y-4">
                            {["Our Heritage", "Craftsmanship", "Ingredients", "Sustainability"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xs tracking-[0.25em] uppercase text-white/40 mb-8 font-sans">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li>12 Rue du Faubourg Saint-Honoré</li>
                            <li>75008 Paris, France</li>
                            <li className="pt-2">
                                <a
                                    href="mailto:contact@maisonlumiere.com"
                                    className="hover:text-gold transition-colors duration-300"
                                >
                                    contact@maisonlumiere.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/30 tracking-wider">
                        © 2024 Maison Lumière. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        {["Privacy", "Terms", "Cookies"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-xs text-white/30 hover:text-white/60 tracking-wider transition-colors duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
