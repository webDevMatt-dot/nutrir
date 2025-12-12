"use client";

import { useCart } from "../context/CartContext";

interface Props {
    variantId: string;
}

export default function BuyButton({ variantId }: Props) {
    const { addToCart } = useCart();

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Stop the Link from sending us to the product page
        e.stopPropagation(); // Stop the event bubbling
        addToCart(variantId);
    };

    return (
        <button
            onClick={handleAdd}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition w-full md:w-auto z-10 relative"
        >
            Add to Cart
        </button>
    );
}
