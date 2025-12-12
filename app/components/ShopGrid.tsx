"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface Props {
    products: any[];
}

export default function ShopGrid({ products }: Props) {
    const [activeCategory, setActiveCategory] = useState("All Products");

    const categories = [
        "All Products",
        "Gut Health",
        "Joint & Bone",
        "Male Wellness",
        "Female Wellness",
        "Skin & Beauty",
        "Specific Conditions"
    ];

    // --- HELPER: NORMALIZE STRINGS ---
    const normalize = (str: string) => str.toLowerCase().replace(/ and /g, ' & ').trim();

    // --- FILTERING & SORTING LOGIC ---
    const filteredProducts = (activeCategory === "All Products"
        ? products
        : products.filter((product) => {
            const target = normalize(activeCategory);

            const hasMatch = product.tags?.some((t: any) => {
                const tagString = typeof t === 'string' ? t : t?.value;
                if (!tagString) return false;
                // Strict match
                return normalize(tagString) === target;
            });

            return hasMatch;
        })
    )
        // --- SORTING: A-Z ---
        .sort((a, b) => a.title.localeCompare(b.title));

    return (
        <div>
            {/* 1. CATEGORY BUTTONS */}
            <div className="max-w-7xl mx-auto px-4 mb-12 overflow-x-auto no-scrollbar">
                <div className="flex justify-center items-center gap-3 min-w-max pb-4">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-sm font-bold transition-all duration-200 px-6 py-2.5 rounded-full border ${activeCategory === cat
                                ? "bg-[#1A2621] text-white border-[#1A2621] shadow-md transform scale-105" // Active
                                : "bg-white text-gray-500 border-gray-100 hover:border-[#1A2621] hover:text-[#1A2621]" // Inactive
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. PRODUCT GRID */}
            <div className="max-w-7xl mx-auto px-4 min-h-[400px]">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-lg text-gray-500 mb-2">No products found for <span className="font-bold text-[#1A2621]">"{activeCategory}"</span></p>
                        <p className="text-sm text-gray-400">
                            Double check that your Shopify tags match exactly: <span className="font-mono bg-gray-100 px-1 rounded">{activeCategory}</span>
                        </p>
                        <button
                            onClick={() => setActiveCategory("All Products")}
                            className="mt-6 px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#1A2621] hover:bg-[#1A2621] hover:text-white transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 animate-in fade-in zoom-in duration-500 fill-mode-both">
                        {filteredProducts.map((product: any, index: number) => (
                            <div key={product.id} className="animate-in fade-in zoom-in duration-500 fill-mode-both" style={{ animationDelay: `${index * 50}ms` }}>
                                <ProductCard
                                    product={product}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
