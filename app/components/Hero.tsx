"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
    product?: any;
}

export default function Hero({ product }: Props) {
    return (
        <div className="relative bg-white min-h-[600px] flex items-center overflow-hidden">
            {/* Background Bubbles (Behind Glass) */}
            <motion.div
                className="absolute top-10 left-[10%] w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[80px]"
                animate={{
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-10 right-[20%] w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px]"
                animate={{
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-100/10 rounded-full blur-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Frosted Glass Layer */}
            <div className="absolute inset-0 backdrop-blur-[20px] bg-white/40 z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE: Content */}
                    <div className="z-10 relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                Science-Aligned Formulations
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-[1.1] mb-6 font-serif">
                            Transforming <br />
                            <span className="font-normal">Science</span> <br />
                            into <span className="text-yellow-600 font-medium">Natural Health</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                            Clean, honest, effective formulations. No outdated formulas, no cutting corners. Quality is non-negotiable.
                        </p>

                        {/* Button */}
                        <Link
                            href="/collections/all-products"
                            className="group inline-flex items-center gap-2 bg-[#2D3A31] text-white px-8 py-4 rounded-full font-medium transition hover:bg-black overflow-hidden relative"
                        >
                            <span className="relative z-10">View Formulas</span>

                            {/* Arrow Icon with Jerk Animation */}
                            <motion.span
                                className="relative z-10"
                                animate={{ x: [0, 4, 0, 0, 0, 0] }} // Jerk motion
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    times: [0, 0.2, 0.4, 0.6, 1] // Quick movement then pause
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </motion.span>
                        </Link>
                    </div>

                    {/* RIGHT SIDE: Image & Background */}
                    <div className="relative flex justify-center lg:justify-end">

                        {/* The Organic Circle Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 flex items-center justify-center">

                            {/* Inner Background Circle */}
                            <div className="absolute inset-2 bg-[#F2F2EF] rounded-full z-0"></div>

                            {/* Golden Spinner Ring - Faster */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-transparent border-t-[#D4AF37]/60 border-r-[#D4AF37]/60 z-10"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, black, transparent)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Second Offset Ring for depth */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-transparent border-b-[#D4AF37]/40 border-l-[#D4AF37]/40 z-10"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Use transparent logo inside circle */}
                            <img
                                src="/nutrir_trans.png"
                                alt="Nutrir Wellness Logo"
                                className="w-5/6 h-auto object-contain opacity-90 relative z-20"
                            />
                        </div>

                        {/* Product Image - REMOVED or Hidden as user requested logo IN the circle */}
                        {/* If user wanted BOTH, they would say "add logo". "Logo in that circle" usually implies replacing the main visual focus or adding it as the primary element. 
                            Given the context of "Hero section", usuall one main image. 
                            The previous image was "nutrir_white.jpg" which looked like a product or a placeholder. 
                            I will comment out the old image container to be safe, or just utilize the circle as the container. */}

                        <div className="relative z-10 w-full max-w-sm transform translate-x-6 hidden">
                            {/* Placeholder to keep layout if needed, but we are moving focus to circle content */}
                        </div>

                        {/* Floating "Quality" Card */}
                        <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-[200px] animate-in slide-in-from-bottom duration-1000">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6 20.25a.75.75 0 01.75.75v.75c0 .414-.336.75-.75.75H5.25a.75.75 0 01-.75-.75v-.75a.75.75 0 01.75-.75h.75z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-gray-500 font-bold">Evidence-Based</p>
                                <p className="text-sm font-semibold text-gray-900">Premium Quality</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
