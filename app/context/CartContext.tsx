"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from "../lib/shopify";

interface CartContextType {
    cart: any;
    isCartOpen: boolean;
    addToCart: (variantId: string, quantity?: number) => Promise<void>; // Updated type
    toggleCart: () => void;
    removeLineItem: (lineItemId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        async function initializeCart() {
            const checkoutId = localStorage.getItem("shopify_checkout_id");
            if (checkoutId) {
                const existingCart = await client.checkout.fetch(checkoutId);
                if (existingCart?.completedAt) {
                    createNewCart();
                } else {
                    setCart(existingCart);
                }
            } else {
                createNewCart();
            }
        }
        initializeCart();
    }, []);

    async function createNewCart() {
        const newCart = await client.checkout.create();
        localStorage.setItem("shopify_checkout_id", newCart.id as string);
        setCart(newCart);
    }

    // UPDATED FUNCTION: Now accepts 'qty' (defaults to 1 if missing)
    async function addToCart(variantId: string, qty: number = 1) {
        if (!cart) return;
        setIsCartOpen(true);

        const lineItems = [{ variantId, quantity: qty }];

        const updatedCart = await client.checkout.addLineItems(cart.id, lineItems);
        setCart(updatedCart);
    }

    async function removeLineItem(lineItemId: string) {
        if (!cart) return;
        const updatedCart = await client.checkout.removeLineItems(cart.id, [lineItemId]);
        setCart(updatedCart);
    }

    function toggleCart() {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartContext.Provider value={{ cart, isCartOpen, addToCart, toggleCart, removeLineItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
