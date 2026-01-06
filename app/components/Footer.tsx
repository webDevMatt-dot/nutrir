import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white">


            {/* 2. MAIN DARK FOOTER */}
            <div className="bg-[#1A2621] text-white py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Left Column: Brand & Socials */}
                    <div className="md:col-span-6 space-y-6">
                        <Link href="/" className="inline-block">
                            <h2 className="text-2xl font-serif tracking-widest text-[#D4AF37] hover:opacity-80 transition">N U T R I R</h2>
                        </Link>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Science-aligned supplements designed to bridge the gap between effective clinical research and natural wellness.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            {/* Facebook */}
                            <a
                                href="https://web.facebook.com/nutrirfoods"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#2A3831] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition cursor-pointer text-white"
                                aria-label="Facebook"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/nutrir-foods-and-wellness"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#2A3831] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition cursor-pointer text-white"
                                aria-label="LinkedIn"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:admin@nutrirfoods.com"
                                className="w-10 h-10 rounded-full bg-[#2A3831] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition cursor-pointer text-white"
                                aria-label="Email"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                            </a>

                            {/* WhatsApp */}
                            {/* <a
                                href="https://wa.me/263785838876"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#2A3831] flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition cursor-pointer text-white"
                                aria-label="WhatsApp"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0012.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 004.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 00-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 01-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 01-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 015.275 2.188 7.42 7.42 0 012.183 5.279c-.002 4.114-3.349 7.462-7.463 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.224-.579.73-.71.88-.131.15-.262.169-.486.056-.224-.113-.953-.351-1.815-1.12-.673-.6-1.125-1.34-1.257-1.565-.132-.224-.014-.345.098-.458.101-.101.224-.263.336-.395.113-.131.15-.224.225-.374.075-.15.038-.281-.019-.393-.056-.113-.504-1.214-.69-1.663-.181-.435-.366-.376-.504-.383-.131-.007-.281-.007-.431-.007-.15 0-.394.056-.6.281-.206.225-.787.769-.787 1.876 0 1.107.805 2.176.917 2.326.112.15 1.586 2.421 3.842 3.395 1.62.698 1.953.56 2.668.524.715-.037 1.327-.543 1.514-1.067.187-.524.187-.973.131-1.067-.056-.094-.207-.169-.432-.281z" />
                                </svg>
                            </a> */}
                        </div>
                    </div>

                    {/* Middle Column: Quick Links */}
                    <div className="md:col-span-3">
                        <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link href="/collections/all-products" className="hover:text-white transition">Shop All</Link></li>
                            {/* <li><Link href="/our-story" className="hover:text-white transition">Our Story</Link></li> */}
                            <li><Link href="/policies" className="hover:text-white transition">Policies</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
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
