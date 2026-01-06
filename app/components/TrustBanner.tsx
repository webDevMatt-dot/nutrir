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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className="group cursor-default"
                        >
                            <motion.div
                                className="inline-block mb-3 text-2xl"
                                whileHover={{
                                    scale: 1.2,
                                    rotate: [0, -10, 10, -10, 0]
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {stat.icon}
                            </motion.div>
                            <motion.p
                                className="text-3xl md:text-4xl font-light text-[#1a3a2f]"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {stat.value}
                            </motion.p>
                            <p className="text-sm text-stone-500 mt-1 group-hover:text-[#c9a227] transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
