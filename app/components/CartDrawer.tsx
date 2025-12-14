// app/components/CartDrawer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useCart } from "../context/CartContext";
import { beginCheckoutEvent } from "../lib/analytics";

export default function CartDrawer() {
    // --- UPDATED: Destructuring updateLineItemQuantity and clearCart ---
    const { cart, isCartOpen, toggleCart, removeLineItem, updateLineItemQuantity, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.body.style.overflow = isCartOpen ? "hidden" : "unset";
        }
    }, [isCartOpen, mounted]);

    // Helper to format currency
    const formatCurrency = (amount: string, code: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: code || 'ZAR',
            minimumFractionDigits: 2
        }).format(parseFloat(amount));
    };

    if (!mounted || !isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Black backdrop (click to close) */}
            <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={toggleCart}
            ></div>

            {/* The Drawer Panel */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col transform transition-transform animate-in slide-in-from-right">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                    <button onClick={toggleCart} className="text-gray-500 hover:text-black text-3xl">
                        &times;
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto space-y-6">
                    {!cart?.lineItems || cart.lineItems.length === 0 ? (
                        <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
                    ) : (
                        cart.lineItems.map((item: any) => (
                            <div key={item.id} className="flex gap-4">
                                {/* Image */}
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden border flex-shrink-0">
                                    {item.variant.image && (
                                        <img
                                            src={item.variant.image.src}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{item.title}</h3>
                                    <p className="text-sm font-medium text-[#1A2621] mt-1">
                                        {formatCurrency(item.variant.price.amount, item.variant.price.currencyCode)}
                                    </p>

                                    {/* --- NEW: QUANTITY SELECTOR --- */}
                                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 mt-3 w-fit">
                                        <button
                                            onClick={() => updateLineItemQuantity(item.id, item.quantity - 1)}
                                            className="text-gray-600 hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm transition"
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className="w-6 text-center text-sm font-medium text-[#1A2621]">{item.quantity}</span>
                                        <button
                                            onClick={() => updateLineItemQuantity(item.id, item.quantity + 1)}
                                            className="text-gray-600 hover:bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center font-bold text-sm transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {/* ----------------------------- */}
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeLineItem(item.id)}
                                    className="text-xs text-red-500 hover:text-red-700 underline flex-shrink-0 self-start mt-1"
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                <div className="border-t pt-6 mt-4">
                    <div className="flex justify-between text-lg font-bold mb-4 text-gray-900">
                        <span>Subtotal</span>
                        <span>{formatCurrency(cart?.totalPrice?.amount || "0.00", cart?.totalPrice?.currencyCode)}</span>
                    </div>

                    {/* Checkout Button */}
                    <button
                        onClick={() => {
                            if (!cart?.lineItems || cart.lineItems.length === 0) {
                                alert("Cart empty, can't proceed.");
                                return;
                            }
                            if (cart?.webUrl) {
                                beginCheckoutEvent(cart);
                                toggleCart();
                                window.location.href = cart.webUrl;
                            }
                        }}
                        className="block w-full bg-black text-white text-center py-4 rounded-lg hover:bg-gray-800 transition font-medium mb-3"
                    >
                        Proceed to Checkout
                    </button>

                    {/* Clear Cart Button */}
                    {cart?.lineItems?.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="block w-full border border-gray-300 text-gray-500 text-center py-3 rounded-lg hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition text-sm mb-2"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
