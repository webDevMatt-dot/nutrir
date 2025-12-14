import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white pt-20">

            {/* 1. TRUST STATS SECTION (The white area with numbers) */}
            <div className="max-w-6xl mx-auto px-4 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    <div>
                        <h3 className="text-3xl font-light text-gray-900 mb-2">100%</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Natural Ingredients</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-light text-gray-900 mb-2">11+</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Therapeutic Formulas</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-light text-gray-900 mb-2">24-48h</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Fast Shipping</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-light text-gray-900 mb-2">14 Day</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Return Policy</p>
                    </div>

                </div>
            </div>

            {/* 2. MAIN DARK FOOTER */}
            <div className="bg-[#1A2621] text-white py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Left Column: Brand & Socials */}
                    <div className="md:col-span-6 space-y-6">
                        <h2 className="text-2xl font-serif tracking-widest text-[#D4AF37]">N U T R I R</h2>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Science-aligned supplements designed to bridge the gap between effective clinical research and natural wellness.
                        </p>

                        {/* Social Icons (Circles) */}
                        <div className="flex gap-4 pt-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-[#2A3831] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Column: Quick Links */}
                    <div className="md:col-span-3">
                        <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/collections/all-products" className="hover:text-white transition">Shop All</Link></li>
                            <li><Link href="/our-story" className="hover:text-white transition">Our Story</Link></li>
                            <li><Link href="/policies" className="hover:text-white transition">Policies</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Right Column: Legal */}
                    <div className="md:col-span-3">
                        <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">Legal</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/policies?tab=shipping" className="hover:text-white transition">Shipping Policy</Link></li>
                            <li><Link href="/policies?tab=refund" className="hover:text-white transition">Refund Policy</Link></li>
                            <li><Link href="/policies?tab=privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/policies?tab=terms" className="hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Disclaimer */}
                <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#2A3831] text-center">
                    <p className="text-xs text-gray-500 mb-4 max-w-2xl mx-auto leading-relaxed">
                        This product supports general wellness. It is not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before starting any supplement regimen.
                    </p>
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} Nutrir Foods. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
