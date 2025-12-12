// app/components/ProductCard.tsx
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

interface Props {
    product: any;
    index: number;
}

export default function ProductCard({ product, index }: Props) {
    const { addToCart } = useCart();

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
        "default": "bg-gray-50",
    };

    const priorityTags = [
        "Gut Health",
        "Joint & Bone",
        "Male Wellness",
        "Female Wellness",
        "Skin & Beauty",
        "Specific Conditions"
    ];

    // Helper to normalize tags for strict lookup
    const normalizeTag = (tag: string) => tag.toLowerCase().replace(/ and /g, ' & ').trim();

    // Find the highest priority tag that matches a color
    const primaryTag = product.tags?.find((t: any) => {
        const tagString = typeof t === 'string' ? t : t?.value;
        if (!tagString) return false;

        const normalizedProductTag = normalizeTag(tagString);
        return priorityTags.some(pTag => normalizeTag(pTag) === normalizedProductTag);
    });

    // Determine the final background color class
    const bgColorKey = primaryTag ? normalizeTag(primaryTag) : "default";
    const bgColor = colorMap[bgColorKey] || colorMap["default"];

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
            className="group block"
        >
            {/* CARD IMAGE & COLOR */}
            <div className={`${bgColor} rounded-[2rem] relative aspect-square mb-6 overflow-hidden transition-transform duration-500`}>
                <span className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#1A2621] shadow-sm z-20">
                    {finalBadgeLabel}
                </span>
                <div className="w-full h-full flex items-center justify-center p-8">
                    {product.images[0] ? (
                        <img
                            src={product.images[0].src}
                            alt={product.title}
                            className="w-full h-full object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-24 h-32 bg-[#2D3A31]/10 rounded flex items-center justify-center">
                            <span className="text-[#2D3A31] font-bold opacity-20">IMG</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation(); // FIX: Stop the click from registering on the parent Link
                        addToCart(variantId);
                    }}
                    className="absolute bottom-6 right-6 w-12 h-12 bg-[#1A2621] rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-[#D4AF37] hover:text-black z-30"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </button>
            </div>

            {/* TEXT DETAILS */}
            <div>
                <h3 className="text-lg font-bold text-[#1A2621] uppercase mb-1 leading-snug tracking-wide transition-colors duration-300 group-hover:text-[#D4AF37]">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3 h-10 leading-relaxed">
                    {product.description || "Premium formula for daily wellness support."}
                </p>
                <div className="text-lg font-medium text-[#1A2621]">
                    {formattedPrice}
                </div>
            </div>
        </Link>
    );
}
