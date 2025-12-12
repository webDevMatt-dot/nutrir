// app/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from "../lib/shopify";
import { addToCartEvent } from "../lib/analytics";
import { useAuth } from "./AuthContext";

interface CartContextType {
    cart: any;
    isCartOpen: boolean;
    addToCart: (variantId: string, quantity?: number) => Promise<void>;
    toggleCart: () => void;
    removeLineItem: (lineItemId: string) => Promise<void>;
    // --- NEW: Function to update an item's quantity ---
    updateLineItemQuantity: (lineItemId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { customer } = useAuth();

    useEffect(() => {
        async function initializeCart() {
            const checkoutId = localStorage.getItem("shopify_checkout_id");
            let currentCart;

            if (checkoutId) {
                const existingCart = await client.checkout.fetch(checkoutId);
                if (existingCart?.completedAt) {
                    currentCart = await createNewCart();
                } else {
                    currentCart = existingCart;
                    setCart(existingCart);
                }
            } else {
                currentCart = await createNewCart();
            }

            // --- CRITICAL FIX: ASSOCIATE CUSTOMER TO CHECKOUT ---
            // Only associate if we have a token and the cart isn't already associated
            const token = localStorage.getItem("shopify_customer_token");
            if (token && currentCart && !(currentCart as any).customer) {
                // Using 'any' cast for client because associateCustomer might be missing in the strict type definition of the SDK wrapper
                // but it is a valid Storefront API mutation. 
                const updatedCart = await (client.checkout as any).associateCustomer(currentCart.id, token);
                setCart(updatedCart);
            }
        }
        initializeCart();
    }, [customer]);

    async function createNewCart() {
        const newCart = await client.checkout.create();
        localStorage.setItem("shopify_checkout_id", newCart.id as string);
        setCart(newCart);
        return newCart;
    }


    // UPDATED FUNCTION: Now accepts 'qty' (defaults to 1 if missing)
    async function addToCart(variantId: string, qty: number = 1) {
        if (!cart) return;
        setIsCartOpen(true);

        const lineItems = [{ variantId, quantity: qty }];

        const updatedCart = await client.checkout.addLineItems(cart.id, lineItems);
        setCart(updatedCart);

        // --- TRIGGER GA4 EVENT ---
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

    // --- NEW: Update Line Item Quantity ---
    async function updateLineItemQuantity(lineItemId: string, quantity: number) {
        if (!cart || quantity <= 0) {
            // If quantity is 0 or less, we treat it as a remove action
            if (quantity <= 0) await removeLineItem(lineItemId);
            return;
        }

        const lineItemsToUpdate = [{ id: lineItemId, quantity }];
        const updatedCart = await client.checkout.updateLineItems(cart.id, lineItemsToUpdate);
        setCart(updatedCart);
    }

    function toggleCart() {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartContext.Provider value={{ cart, isCartOpen, addToCart, toggleCart, removeLineItem, updateLineItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
