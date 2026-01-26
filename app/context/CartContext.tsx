// app/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { client, associateCustomerWithCheckout } from "../lib/shopify";
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
    clearCart: () => Promise<void>;
}

import { useCurrency } from "./CurrencyContext";

// ... existing imports

interface CartContextType {
    // ...
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<any>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { customer } = useAuth();
    const { currencyCode } = useCurrency(); // <-- Use currency from context

    useEffect(() => {
        async function initializeCart() {
            const checkoutId = localStorage.getItem("shopify_checkout_id");
            let currentCart;

            if (checkoutId) {
                try {
                    const existingCart = await client.checkout.fetch(checkoutId);
                    // Check if completed OR if currency mismatch (optional but good)
                    if (existingCart?.completedAt || existingCart?.currencyCode !== currencyCode) {
                        // If currency mistmatch, ideally we create a new cart. 
                        // But verifying 'existingCart.currencyCode' requires checking the object structure.
                        // client.checkout.fetch returns a GraphModel.
                        // Let's assume strict currency for now: if user switches currency, they get a fresh cart.
                        /* 
                          NOTE: Checking currencyCode on existingCart might be tricky if the SDK doesn't expose it at top level 
                          without strictly querying it. Usually it does: existingCart.currencyCode.
                          If it mismatches, we call createNewCart().
                        */
                        const cartCurrency = (existingCart as any).currencyCode;
                        if (cartCurrency && cartCurrency !== currencyCode) {
                            currentCart = await createNewCart();
                        } else if (existingCart?.completedAt) {
                            currentCart = await createNewCart();
                        } else {
                            currentCart = existingCart;
                            setCart(existingCart);
                        }
                    } else {
                        currentCart = await createNewCart();
                    }
                } catch (e) {
                    currentCart = await createNewCart();
                }
            } else {
                currentCart = await createNewCart();
            }

            // --- CRITICAL FIX: ASSOCIATE CUSTOMER TO CHECKOUT ---
            // Only associate if we have a token and the cart isn't already associated
            const token = localStorage.getItem("shopify_customer_token");
            if (token && currentCart && !(currentCart as any).customer) {

                // FIX: Replace failing SDK call with robust GraphQL mutation
                const associationResult = await associateCustomerWithCheckout(currentCart.id, token);

                if (associationResult?.checkout?.id) {
                    // Success: The customer is now associated. We must fetch the full object
                    // using the working SDK fetch method to update the context state.
                    const updatedCart = await client.checkout.fetch(currentCart.id);
                    setCart(updatedCart);
                } else if (associationResult?.userErrors?.length) {
                    // Log the error but continue with the unassociated cart
                    console.error("Customer association failed:", associationResult.userErrors[0].message);
                }
            }
        }
        initializeCart();
    }, [customer, currencyCode]); // Add currencyCode dep to re-init if writes change

    async function createNewCart() {
        // Pass presentmentCurrencyCode to create
        const newCart = await client.checkout.create({
            presentmentCurrencyCode: currencyCode
        });
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

    // --- NEW: Clear Cart Function ---
    async function clearCart() {
        if (!cart || !cart.lineItems || cart.lineItems.length === 0) return;

        const lineItemIds = cart.lineItems.map((item: any) => item.id);
        const updatedCart = await client.checkout.removeLineItems(cart.id, lineItemIds);
        setCart(updatedCart);
    }

    function toggleCart() {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartContext.Provider value={{ cart, isCartOpen, addToCart, toggleCart, removeLineItem, updateLineItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
