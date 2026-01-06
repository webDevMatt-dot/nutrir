"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard"; // <--- Importing the smart card

interface Props {
    products: any[];
}

export default function FeaturedCollection({ products }: Props) {
    return (
        <section className="relative bg-white py-20 px-4 overflow-hidden">

            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl opacity-50"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-96 h-96 bg-[#1a3a2f]/5 rounded-full blur-3xl opacity-50"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <motion.h3
                            className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            Our Collection
                        </motion.h3>
                        <motion.h2
                            className="text-4xl font-serif text-[#1A2621]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Featured Formulas
                        </motion.h2>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/collections/all-products"
                            className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition group"
                        >
                            <span className="relative">
                                View All Products
                                <motion.span
                                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#c9a227]"
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* GRID - Now using the Smart ProductCard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
                    {products.map((product: any, index: number) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>

                {/* Mobile Link */}
                <div className="mt-12 text-center md:hidden">
                    <Link href="/collections/all-products" className="text-sm font-medium text-gray-600 underline">
                        View All Products
                    </Link>
                </div>

            </div>
        </section>
    );
}
