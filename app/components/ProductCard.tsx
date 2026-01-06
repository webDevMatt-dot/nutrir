// app/components/ProductCard.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface Props {
    product: any;
    index: number;
}

export default function ProductCard({ product, index }: Props) {
    const { addToCart } = useCart();
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleImageScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const index = Math.round(scrollLeft / clientWidth);
            setActiveImageIndex(index);
        }
    };

    const scrollToImage = (index: number) => {
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
        }
    };

    // Close selector on scroll
    useEffect(() => {
        if (!isSelectorOpen) return;

        const handleScroll = () => {
            setIsSelectorOpen(false);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSelectorOpen]);

    // --- BRANDED COLOR MAP (User's Final Design) ---
    const colorMap: { [key: string]: string } = {
        // 1. pink / purple
        "female wellness": "bg-[#F2EFF9]",
        // 2. BLUE (New, distinct color for Male Wellness)
        "male wellness": "bg-[#DDEBFF]", // Light Pastel Blue
        // 3. purple
        "specific conditions": "bg-[#F2EFF9]",
        // 4. brown/peach
        "gut health": "bg-[#FEF2EA]",
        // 5. joint & bone (Retains original light green)
        "joint & bone": "bg-[#E8F4F1]",
        // 6. skin & beauty
        "skin & beauty": "bg-[#F9F9F7]",
        "default": "bg-gray-100",
    };

    const priorityTags = [
        "Gut Health",
        "Joint & Bone",
        "Male Wellness",
        "Female Wellness",
        "Skin & Beauty",
        "Specific Conditions"
    ];

    // Helper to normalize tags for strict lookup - NOW MORE PERMISSIVE
    const normalizeTag = (tag: string) => tag.toLowerCase().replace(/ and /g, ' & ').replace(/ wellness/g, '').trim();

    // Find the highest priority tag that matches a color
    const primaryTag = product.tags?.find((t: any) => {
        const tagString = typeof t === 'string' ? t : t?.value;
        if (!tagString) return false;

        const normalizedProductTag = normalizeTag(tagString);
        return priorityTags.some(pTag => normalizeTag(pTag) === normalizedProductTag);
    });

    // Determine the final background color class
    // Determine the final background color class
    // IMPROVED LOGIC: partial matches allowed
    const bgColorKey = primaryTag ? normalizeTag(primaryTag) : "default";
    // Try exact match, then partial match (e.g. "gut" matches "gut health")
    const resolvedColorKey = Object.keys(colorMap).find(k => bgColorKey.includes(k) || k.includes(bgColorKey)) || "default";
    const bgColor = colorMap[resolvedColorKey] || colorMap["default"];

    // DEBUGGING LOG
    console.log(`[DEBUG ProductCard] ${product.title} | Tags:`, product.tags, `| Primary: ${primaryTag} | Key: ${bgColorKey} | Class: ${bgColor}`);

    // Determine the badge label
    const finalBadgeLabel = primaryTag
        ? primaryTag.replace(/ and /g, ' & ')
        : "Wellness";

    // --- Dynamic Price Formatting ---
    const priceData = product.variants[0]?.price;
    const amount = parseFloat(priceData?.amount || "0");
    const currency = priceData?.currencyCode || "ZAR";

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(amount);

    const variantId = product.variants[0]?.id;

    return (
        <Link
            href={`/product/${product.handle}`}
            className="group block relative transition-all duration-500 hover:scale-[1.02]"
        >
            {/* CARD CONTAINER - No Overflow Hidden so bleed shows */}
            <div className="relative aspect-square mb-6 transition-transform duration-500">

                {/* 1. THE BLEED (Colored Blob behind) - STARTS INSIDE, BLEEDS OUT ON HOVER */}
                <div className={`absolute inset-0 ${bgColor} rounded-[2.5rem] blur-xl opacity-50 group-hover:-inset-8 group-hover:blur-3xl group-hover:opacity-100 transition-all duration-500 ease-out`}></div>

                {/* 2. THE GLASS CARD (Content holder) - Ultra clear for max color visibility */}
                <div className="relative z-10 w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] overflow-hidden shadow-sm">

                    <span className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#1A2621] shadow-sm z-20">
                        {finalBadgeLabel}
                    </span>

                    <div
                        ref={scrollContainerRef}
                        onScroll={handleImageScroll}
                        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                    >
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image: any, i: number) => (
                                <div key={i} className="w-full h-full flex-shrink-0 flex items-center justify-center p-8 snap-center">
                                    <img
                                        src={image.src}
                                        alt={`${product.title} - Image ${i + 1}`}
                                        className="w-full h-full object-contain drop-shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-8 snap-center">
                                <div className="w-full h-full bg-[#2D3A31]/5 rounded flex items-center justify-center">
                                    <span className="text-[#2D3A31] font-serif text-6xl opacity-20">{product.title?.charAt(0) || "N"}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION DOTS (Moved inside glass) */}
                    {product.images && product.images.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 pointer-events-none">
                            {product.images.map((_: any, i: number) => (
                                <button
                                    key={i}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        scrollToImage(i);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${i === activeImageIndex
                                        ? "bg-[#1A2621] w-4"
                                        : "bg-[#1A2621]/20 hover:bg-[#1A2621]/40"
                                        }`}
                                    aria-label={`View image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ACTION BUTTONS (Outside Glass or floating above) */}
                <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-2">
                    {/* VARIANT SELECTOR MENU */}
                    {isSelectorOpen && product.variants.length > 1 && (
                        <div
                            className="bg-white rounded-xl shadow-xl p-2 mb-2 flex flex-col gap-2 min-w-[200px] max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            {product.variants.map((v: any) => (
                                <button
                                    key={v.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (v.availableForSale) {
                                            addToCart(v.id);
                                            setIsSelectorOpen(false);
                                        }
                                    }}
                                    disabled={!v.availableForSale}
                                    className={`text-left text-xs font-bold px-3 py-2 rounded-lg transition-colors flex justify-between items-start gap-3 w-full ${v.availableForSale
                                        ? "text-[#1A2621] hover:bg-gray-50"
                                        : "text-gray-400 bg-gray-50 cursor-not-allowed"
                                        }`}
                                >
                                    <span className="break-words flex-1 leading-tight">{v.title}</span>
                                    {v.availableForSale ? (
                                        <span className="text-gray-400 font-normal whitespace-nowrap">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: v.price?.currencyCode || 'USD',
                                                minimumFractionDigits: 0
                                            }).format(parseFloat(v.price?.amount || "0"))}
                                        </span>
                                    ) : (
                                        <span className="text-red-400 font-normal text-[10px] uppercase whitespace-nowrap">
                                            Sold Out
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* MAIN ADD BUTTON */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            // If sold out (and only 1 variant), do nothing or generic check
                            const defaultVariant = product.variants[0];
                            if (!defaultVariant?.availableForSale && product.variants.length === 1) {
                                return;
                            }

                            if (product.variants.length > 1) {
                                setIsSelectorOpen(!isSelectorOpen);
                            } else {
                                addToCart(variantId);
                            }
                        }}
                        disabled={!product.variants[0]?.availableForSale && product.variants.length === 1}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-30 ${(!product.variants[0]?.availableForSale && product.variants.length === 1)
                            ? "bg-gray-300 cursor-not-allowed opacity-100 translate-y-0"
                            : isSelectorOpen
                                ? "bg-[#D4AF37] text-black opacity-100 translate-y-0"
                                : "bg-[#1A2621] text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-[#D4AF37] hover:text-black"
                            }`}
                    >
                        {isSelectorOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (!product.variants[0]?.availableForSale && product.variants.length === 1) ? (
                            // X icon for sold out
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        ) : (
                            // Standard Cart Icon
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* TEXT DETAILS */}
            <div>
                <h3 className="text-lg font-bold text-[#1A2621] uppercase mb-1 leading-snug tracking-wide transition-colors duration-300 group-hover:text-[#D4AF37]">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10 leading-relaxed">
                    {(() => {
                        // PREVIEW GENERATION:
                        // 1. Prefer descriptionHtml so we can selectively strip headers ("What It Does")
                        // 2. Fallback to plain description
                        // 3. Last fallback to hardcoded string
                        let text = product.descriptionHtml || product.description || "";

                        if (product.descriptionHtml) {
                            // 0. UNESCAPE HEADERS (Fix for literal <h3> tags showing up)
                            // User might have typed <h3> in visual editor, or API returns escaped HTML
                            text = text.replace(/&lt;(h[1-6])&gt;/gi, '<$1>').replace(/&lt;\/(h[1-6])&gt;/gi, '</$1>');

                            // Remove headers AND their content (e.g. <h3>What It Does</h3> -> "")
                            // This ensures we jump straight to the body text
                            text = text.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, " ");
                            // Strip remaining HTML tags (p, div, b, etc) but keep their content
                            text = text.replace(/<[^>]+>/g, "");
                        }

                        return text.trim() || "Premium formula for daily wellness support.";
                    })()}
                </p>
                <div className="text-lg font-medium text-[#1A2621]">
                    {product.variants.length > 1 && <span className="text-sm font-normal text-gray-500 mr-1">Starting at</span>}
                    {formattedPrice}
                </div>
                {/* DISCOUNT INFO */}
                <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wide mt-1">
                    5% OFF | Code: NEW100
                </div>
            </div>
        </Link>
    );
}
