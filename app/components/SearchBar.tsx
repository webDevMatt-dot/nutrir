"use client";

import { useState, useEffect, useRef } from "react";
import { searchProducts } from "../lib/shopify";
import Link from "next/link";

export default function SearchBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus when opening
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
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

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // If clicking strictly outside the navbar area, close it
            if (isOpen && !(e.target as HTMLElement).closest('nav')) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="static">
            {/* 1. TRIGGER ICON (Only visible when CLOSED) */}
            {!isOpen && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent immediate closing
                        setIsOpen(true);
                    }}
                    className="text-[#1A2621] hover:text-[#D4AF37] transition p-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            )}

            {/* 2. EXPANDED SEARCH BAR (Takes over the Navbar) */}
            <div
                className={`absolute inset-0 bg-white z-50 flex flex-col justify-start px-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                <div className="h-20 max-w-7xl mx-auto w-full flex items-center gap-4">

                    {/* Search Icon (Static) */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D4AF37" className="w-6 h-6 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                    {/* The Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 h-full bg-transparent text-xl font-medium text-[#1A2621] placeholder:text-gray-300 focus:outline-none font-serif"
                    />

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-black uppercase text-xs font-bold tracking-widest px-2"
                    >
                        Close
                    </button>
                </div>

                {/* 3. DROPDOWN RESULTS (Only appears if there is a query) */}
                {query && (
                    <div className="absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl max-h-[60vh] overflow-y-auto">
                        <div className="max-w-7xl mx-auto px-8 py-8">
                            {loading && <p className="text-gray-400 text-sm">Searching...</p>}

                            {!loading && results.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    {results.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${encodeURIComponent(product.id)}`}
                                            onClick={() => setIsOpen(false)}
                                            className="group block"
                                        >
                                            <div className="bg-gray-50 rounded-xl p-4 mb-3 group-hover:bg-[#F9F9F7] transition">
                                                {product.images[0] && (
                                                    <img src={product.images[0].src} className="w-full h-32 object-contain mix-blend-multiply" />
                                                )}
                                            </div>
                                            <h4 className="font-bold text-[#1A2621] text-sm group-hover:text-[#D4AF37] transition">{product.title}</h4>
                                            <p className="text-xs text-gray-500">${product.variants[0].price.amount}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {!loading && results.length === 0 && (
                                <p className="text-gray-400">No results found for "{query}"</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
