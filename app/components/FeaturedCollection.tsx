"use client";

import Link from "next/link";
import ProductCard from "./ProductCard"; // <--- Importing the smart card

interface Props {
    products: any[];
}

export default function FeaturedCollection({ products }: Props) {
    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-3">
                            Our Collection
                        </h3>
                        <h2 className="text-4xl font-serif text-[#1A2621]">
                            Featured Formulas
                        </h2>
                    </div>
                    <Link
                        href="/collections/all-products"
                        className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
                    >
                        View All Products
                        <span>&rarr;</span>
                    </Link>
                </div>

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
