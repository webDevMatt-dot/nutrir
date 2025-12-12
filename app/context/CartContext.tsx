"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from "../lib/shopify";
import { addToCartEvent } from "../lib/analytics";

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


    // ... inside CartProvider ...

    // UPDATED FUNCTION: Now accepts 'qty' (defaults to 1 if missing)
    async function addToCart(variantId: string, qty: number = 1) {
        if (!cart) return;
        setIsCartOpen(true);

        const lineItems = [{ variantId, quantity: qty }];

        const updatedCart = await client.checkout.addLineItems(cart.id, lineItems);
        setCart(updatedCart);

        // --- TRIGGER GA4 EVENT ---
        // We need to find the product details from the updated cart or fetch them. 
        // For simplicity and performance, we'll try to find it in the cart or use a basic payload.
        // Ideally, pass the full product object to addToCart, but changing signature might break usage.
        // Let's inspect the updatedCart to find the new item.
        const addedItem = updatedCart.lineItems?.find((item: any) => item.variant.id === variantId);

        if (addedItem) {
            const productData = {
                id: addedItem.variant?.product?.id,
                title: addedItem.title,
                variants: [{ price: addedItem.variant?.price }]
            };
            addToCartEvent(productData, qty);
        }
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
