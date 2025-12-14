"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { searchProducts } from "../lib/shopify";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchDrawer({ isOpen, onClose }: Props) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Focus input when drawer opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden"; // Lock scroll
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    // Search Logic
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }
        const timer = setTimeout(async () => {
            setLoading(true);
            const products = await searchProducts(query);
            setResults(products);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    // Close and Clear
    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setQuery("");
            setResults([]);
        }, 300);
    };

    const DrawerContent = (
        <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}>

            {/* 1. BACKDROP (Blurry) */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            ></div>

            {/* 2. THE DRAWER (Slides from Right) */}
            <div
                className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-serif text-[#1A2621]">Search</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-black transition rounded-full hover:bg-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Input Area */}
                <div className="p-6 pb-2">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="What are you looking for?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-[#F9F9F7] text-[#1A2621] placeholder:text-gray-400 px-4 py-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition text-lg"
                        />
                        {loading && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <div className="w-5 h-5 border-2 border-gray-300 border-t-[#D4AF37] rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Results Area */}
                <div className="flex-1 overflow-y-auto p-6 pt-2">

                    {/* A. RESULTS */}
                    {results.length > 0 && (
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-4 mb-2">Products</p>
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.handle}`}
                                    onClick={handleClose}
                                    className="flex gap-4 group"
                                >
                                    {/* Image */}
                                    <div className="w-20 h-20 bg-[#F9F9F7] rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                                        {product.images[0] && (
                                            <img src={product.images[0].src} className="w-full h-full object-contain mix-blend-multiply" />
                                        )}
                                    </div>
                                    {/* Info */}
                                    <div>
                                        <h4 className="font-medium text-[#1A2621] group-hover:text-[#D4AF37] transition">
                                            {product.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: product.variants[0].price.currencyCode || 'USD',
                                            }).format(parseFloat(product.variants[0].price.amount))}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* B. EMPTY / SUGGESTIONS */}
                    {!loading && results.length === 0 && (
                        <div className="mt-4">
                            {!query ? (
                                <>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Gut Health", "Sleep", "Skin", "Energy", "Protein"].map(term => (
                                            <button
                                                key={term}
                                                onClick={() => setQuery(term)}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500 text-center py-10">No results found.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-center">
                    <Link href="/collections/all-products" onClick={handleClose} className="text-sm font-medium text-[#D4AF37] hover:text-[#1A2621] transition">
                        View All Products &rarr;
                    </Link>
                </div>

            </div>
        </div>
    );

    if (!mounted) return null;
    return createPortal(DrawerContent, document.body);
}
