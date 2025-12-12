"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { beginCheckoutEvent } from "../lib/analytics";

export default function CartDrawer() {
    const { cart, isCartOpen, toggleCart, removeLineItem } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.body.style.overflow = isCartOpen ? "hidden" : "unset";
        }
    }, [isCartOpen, mounted]);

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
                            <div key={item.id} className="flex gap-4 items-center">
                                {/* Image */}
                                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden border">
                                    {item.variant.image && (
                                        <img
                                            src={item.variant.image.src}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <h3 className="font-medium text-sm text-gray-900">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">
                                        ${item.variant.price.amount} {item.variant.price.currencyCode}
                                    </p>
                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeLineItem(item.id)}
                                    className="text-xs text-red-500 hover:text-red-700 underline"
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
                        <span>Total</span>
                        <span>${cart?.totalPrice?.amount || "0.00"}</span>
                    </div>



                    // ... inside CartDrawer ...

                    {/* Checkout Button */}
                    {cart?.webUrl ? (
                        <Link
                            href={cart.webUrl}
                            onClick={() => {
                                beginCheckoutEvent(cart);
                                toggleCart();
                            }}
                            className="block w-full bg-black text-white text-center py-4 rounded-lg hover:bg-gray-800 transition font-medium"
                        >
                            Proceed to Checkout
                        </Link>
                    ) : (
                        <button disabled className="block w-full bg-gray-300 text-white text-center py-4 rounded-lg cursor-not-allowed">
                            Proceed to Checkout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
