"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

interface Variant {
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
        amount: string;
        currencyCode: string;
    };
}

interface Props {
    variants: Variant[];
}

export default function ProductActions({ variants }: Props) {
    // Default to the first variant
    const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = async () => {
        if (!selectedVariant || !selectedVariant.availableForSale) return;
        setIsAdding(true);
        await addToCart(selectedVariant.id, quantity);
        setIsAdding(false);
    };

    const isAvailable = selectedVariant?.availableForSale;

    return (
        <div className="mb-12">

            {/* DYNAMIC PRICE DISPLAY */}
            <div className="text-3xl font-bold text-[#1A2621] mb-8">
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: selectedVariant?.price?.currencyCode || 'USD',
                    minimumFractionDigits: 2
                }).format(parseFloat(selectedVariant?.price?.amount || "0"))}
            </div>

            {/* VARIANT SELECTOR */}
            {variants.length > 1 && (
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
                        Choose Quantity
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedVariant.id === variant.id
                                    ? "border-[#D4AF37] bg-yellow-50 text-[#1A2621] ring-1 ring-[#D4AF37]"
                                    : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {variant.title} {!variant.availableForSale && "(Sold Out)"}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4">
                {/* QUANTITY SELECTOR */}
                <div className={`flex items-center border border-gray-400 rounded-full px-5 py-3 bg-white ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <button
                        onClick={handleDecrement}
                        disabled={!isAvailable}
                        className="text-black hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg transition disabled:cursor-not-allowed"
                    >
                        −
                    </button>

                    <span className="w-10 text-center font-bold text-black text-lg">{quantity}</span>

                    <button
                        onClick={handleIncrement}
                        disabled={!isAvailable}
                        className="text-black hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg transition disabled:cursor-not-allowed"
                    >
                        +
                    </button>
                </div>

                {/* ADD TO CART BUTTON */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding || !isAvailable}
                    className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:bg-gray-400 shadow-xl"
                >
                    {isAdding ? "Adding..." : !isAvailable ? "Sold Out" : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Add to Cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
