'use client';

import { motion } from 'framer-motion';

export default function TrustBanner() {
    return (
        <section className="relative py-16 bg-white border-y border-stone-100 overflow-hidden">
            {/* Sliding background line */}
            <motion.div
                className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-[#c9a227] to-transparent"
                animate={{ x: ['0vw', '100vw'] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                {/* Mobile: 4 Cols (Forced Fit) | Desktop: 4 Cols (Comfortable) */}
                <div className="grid grid-cols-4 gap-2 md:gap-8 items-start justify-center">
                    {[
                        { value: '100%', label: 'Natural Ingredients', icon: '🌿' },
                        { value: '11+', label: 'Therapeutic Formulas', icon: '⚗️' },
                        { value: '24-48h', label: 'Fast Shipping', icon: '🚀' },
                        { value: '14 Day', label: 'Return Policy', icon: '✓' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-default flex flex-col items-center justify-start"
                        >
                            <motion.div
                                className="inline-block mb-1 md:mb-3 text-base md:text-2xl"
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                {stat.icon}
                            </motion.div>
                            <motion.p
                                className="text-xs sm:text-lg md:text-4xl font-light text-[#1a3a2f] whitespace-nowrap mb-0.5"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {stat.value}
                            </motion.p>
                            <p className="text-[9px] sm:text-xs md:text-sm text-stone-500 leading-tight group-hover:text-[#c9a227] transition-colors break-words max-w-full">
                                {stat.label.split(' ').map((word, i) => (
                                    <span key={i} className="block md:inline md:mr-1">
                                        {word}
                                    </span>
                                ))}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
