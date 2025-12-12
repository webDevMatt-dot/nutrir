"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

interface Props {
    variantId: string;
}

export default function ProductActions({ variantId }: Props) {
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
        setIsAdding(true);
        await addToCart(variantId, quantity);
        setIsAdding(false);
    };

    return (
        <div className="flex items-center gap-4 mb-12">

            {/* QUANTITY SELECTOR */}
            {/* Added border-gray-400 (darker) and text-black */}
            <div className="flex items-center border border-gray-400 rounded-full px-5 py-3 bg-white">
                <button
                    onClick={handleDecrement}
                    className="text-black hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg transition"
                >
                    −
                </button>

                {/* Number is now black and bolder */}
                <span className="w-10 text-center font-bold text-black text-lg">{quantity}</span>

                <button
                    onClick={handleIncrement}
                    className="text-black hover:bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center font-bold text-lg transition"
                >
                    +
                </button>
            </div>

            {/* ADD TO CART BUTTON */}
            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-70 shadow-xl"
            >
                {isAdding ? "Adding..." : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Add to Cart
                    </>
                )}
            </button>
        </div>
    );
}
